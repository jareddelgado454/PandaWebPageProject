'use client';
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { createMap } from 'maplibre-gl-js-amplify';
import maplibregl, { Marker } from 'maplibre-gl';
import { PlaceContext } from '@/contexts/place/PlaceContext';
import { MapContext } from '@/contexts/map/MapContext';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import { onUpdateServiceCoordinates } from '@/graphql/users/customer/subscription';
import { client } from '@/contexts/AmplifyContext';
import { CalculateAngleFromLocation } from '@/utils/service/CalculateAngle';
import { getNearbyTechnicians, getServiceById } from '@/graphql/services/queries/query';
import 'maplibre-gl/dist/maplibre-gl.css';
import "maplibre-gl-js-amplify/dist/public/amplify-map.css";
export default function Map({ userMarkerRef }) {
  const mapDiv = useRef(null);
  const technicianMarkerRef = useRef(null);
  const technicianMarkers = useRef({});
  const { userLocation, isLoading } = useContext(PlaceContext);
  const { map, setMap, isMapReady } = useContext(MapContext);
  const { serviceRequest, setServiceRequest, setServiceCoordinates } = useContext(ServiceContext);
  const interpolate = (start, end, t) => start + (end - start) * t;
  const animateMarker = (marker, startCoords, endCoords, duration) => {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);

      const newLng = interpolate(startCoords[0], endCoords[0], t);
      const newLat = interpolate(startCoords[1], endCoords[1], t);

      marker.setLngLat([newLng, newLat]);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };
  const retrieveService = async () => {
    try {
      if (!serviceRequest) return;
      const { data } = await client.graphql({
        query: getServiceById,
        variables: {
          serviceId: serviceRequest.id
        }
      });
      setServiceRequest(data.getService);
    } catch (error) {
      console.error(error);
    }
  }
  useLayoutEffect(() => {
    const initializeMap = async () => {
      if (!isLoading) {
        const mapC = await createMap({
          container: mapDiv.current,
          center: userLocation ? userLocation : [-123.1187, 49.2819],
          zoom: 12
        });
        setMap(mapC);
        if (serviceRequest) {
          displayTechnicianMarker(mapC, serviceRequest.serviceTechnicianSelectedId,serviceRequest.destLatitude, serviceRequest.destLongitude);
        }
        if (userLocation) {
          mapC.flyTo({
            center: userLocation,
            zoom: 16,
            duration: 2000,
            easing: (t) => t,
          });

          userMarkerRef.current = new Marker()
            .setLngLat(userLocation)
            .addTo(mapC);

        }
        retrieveService();
      }

    };
    initializeMap();
  }, [isLoading]);
  const displayTechnicianMarker = (mapC, id, destLatitude = 0, destLongitude = 0) => {
    if (technicianMarkers.current[id]) {
      const startCoords = technicianMarkers.current[id].getLngLat().toArray();
      const endCoords = [destLongitude, destLatitude];
      animateMarker(technicianMarkers.current[id], startCoords, endCoords, 1500);
      technicianMarkers.current[id].setLngLat(endCoords);
      const angleDegrees = CalculateAngleFromLocation(startCoords, endCoords);
      technicianMarkers.current[id].setRotation(angleDegrees);
    } else {
      const technicianMarker = document.createElement('div');
      technicianMarker.className = 'technician-marker';
      const newMarker = new maplibregl.Marker({ element: technicianMarker })
        .setLngLat([destLongitude, destLatitude])
        .addTo(mapC);
      technicianMarkers.current[id] = newMarker;
    }
  };

  useEffect(() => {
    if ((isMapReady && map) && serviceRequest) {
      const { destLatitude, destLongitude, serviceTechnicianSelectedId } = serviceRequest;

      if (!technicianMarkerRef.current) {
        displayTechnicianMarker(map, serviceTechnicianSelectedId,destLatitude || 0, destLongitude || 0);
      } else {
        const startCoords = technicianMarkerRef.current.getLngLat().toArray();
        const endCoords = [destLongitude || 0, destLatitude || 0];

        animateMarker(technicianMarkerRef.current, startCoords, endCoords, 1500);
        technicianMarkerRef.current.setLngLat(endCoords); // Update position directly

        const angleDegrees = CalculateAngleFromLocation(startCoords, endCoords);
        technicianMarkerRef.current.setRotation(angleDegrees);
        technicianMarkerRef.current.setLngLat(endCoords);
      }
    }
  }, [setServiceCoordinates]);
  useEffect(() => {
    if (!serviceRequest) return;
    const subscription = client
      .graphql({ query: onUpdateServiceCoordinates, variables: { serviceId: serviceRequest && serviceRequest.id, customerId: serviceRequest && serviceRequest.customer.id } })
      .subscribe({
        next: ({ data }) => {
          setServiceCoordinates({
            destLatitude: data.onUpdateService.destLatitude,
            destLongitude: data.onUpdateService.destLongitude,
          });
        },
        error: (error) => console.warn(error)
      });

    return () => {
      // Cancel the subscription when this component's life cycle ends
      subscription.unsubscribe();
    };
  }, [serviceRequest, setServiceCoordinates]);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        if(!serviceRequest && map){
          const { data } = await client.graphql({
            query: getNearbyTechnicians,
            variables: {
              lat: userLocation[1],
              lon: userLocation[0]
            }
          });
          // console.log(data);
          const arrayTechnicians = data.getNearbyTechnicians;
          arrayTechnicians.map((technician) => {
            displayTechnicianMarker(map, technician.id, technician.loLatitude, technician.loLongitude);
          });
        }
      } catch (error) {
        console.error(error);
      }
    }, 20000);

    return () => clearInterval(intervalId);
  }, [serviceRequest, userLocation, map]);
  
  return (
    <>
      <div ref={mapDiv} id='map' className='map h-full lg:h-[100%] w-[100%] rounded-lg'></div>
    </>
  );
}
