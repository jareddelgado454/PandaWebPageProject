'use client';
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { createMap } from 'maplibre-gl-js-amplify';
import maplibregl from 'maplibre-gl';
import { PlaceContext } from '@/contexts/place/PlaceContext';
import { MapContext } from '@/contexts/map/MapContext';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import { onUpdateServiceCoordinates } from '@/graphql/users/customer/subscription';
import { client } from '@/contexts/AmplifyContext';
import { CalculateAngleFromLocation } from '@/utils/service/CalculateAngle';
import { getServiceById } from '@/graphql/services/queries/query';
import 'maplibre-gl/dist/maplibre-gl.css';
import "maplibre-gl-js-amplify/dist/public/amplify-map.css";
export default function Map() {
  const mapDiv = useRef(null);
  const technicianMarkerRef = useRef(null);
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
          zoom: 14
        });
        setMap(mapC);
        if (serviceRequest) {
          displayTechnicianMarker(mapC, serviceRequest.destLatitude, serviceRequest.destLongitude);
        }
        if (userLocation) {
          mapC.flyTo({
            center: userLocation,
            zoom: 16,
            duration: 2000,
            easing: (t) => t,
          });

          const pulsatingCircle = document.createElement('div');
          pulsatingCircle.className = 'customer-pulsating-circle';

          new maplibregl.Marker(pulsatingCircle)
            .setLngLat(userLocation)
            .addTo(mapC);


        }
        retrieveService();
      }

    };
    initializeMap();
  }, [isLoading]);
  const displayTechnicianMarker = (mapC, destLatitude = 0, destLongitude = 0) => {
    const technicianMarker = document.createElement('div');
    technicianMarker.className = 'technician-marker';

    technicianMarkerRef.current = new maplibregl.Marker({ element: technicianMarker })
      .setLngLat([destLongitude, destLatitude])
      .addTo(mapC);
  };
  // useEffect(() => {
  //   if (map) {
  //     techniciansList.map((technician, i) => {
  //       const technicianMarker = document.createElement('div');
  //       technicianMarker.className = 'technician-marker';

  //       new maplibregl.Marker({ element: technicianMarker })
  //         .setLngLat([technician.loLongitude, technician.loLatitude])
  //         .addTo(map);
  //     });
  //   }
  // }, [isMapReady, map]);

  useEffect(() => {
    if ((isMapReady && map) && serviceRequest) {
      const { destLatitude, destLongitude } = serviceRequest;

      if (!technicianMarkerRef.current) {
        displayTechnicianMarker(map, destLatitude || 0, destLongitude || 0);
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
  return (
    <>
      <div ref={mapDiv} id='map' className='map h-full lg:h-[100%] w-[100%] rounded-lg'></div>
    </>
  );
}
