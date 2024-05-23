'use client';
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createMap } from 'maplibre-gl-js-amplify';
import maplibregl from 'maplibre-gl';
import { useDisclosure } from "@nextui-org/react";
import { PlaceContext } from '@/contexts/place/PlaceContext';
import { MapContext } from '@/contexts/map/MapContext';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import 'maplibre-gl/dist/maplibre-gl.css';
import "maplibre-gl-js-amplify/dist/public/amplify-map.css";
import { TechnicianInformationModal } from './customer';
import { onUpdateServiceCoordinates } from '@/graphql/users/customer/subscription';
import { client } from '@/contexts/AmplifyContext';
import { CalculateAngleFromLocation } from '@/utils/service/CalculateAngle';
export default function Map() {
  const mapDiv = useRef(null);
  const technicianMarkerRef = useRef(null);
  const { userLocation, isLoading } = useContext(PlaceContext);
  const { map, setMap, isMapReady } = useContext(MapContext);
  const [technicianSelected, setTechnicianSelected] = useState(null);
  const { serviceRequest, setServiceRequest, setServiceCoordinates } = useContext(ServiceContext);
  const interpolate = (start, end, t) => start + (end - start) * t;

  const animateMarker = (marker, startCoords, endCoords, duration) => {
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1); // Normalized time value between 0 and 1

      const newLng = interpolate(startCoords[0], endCoords[0], t);
      const newLat = interpolate(startCoords[1], endCoords[1], t);

      marker.setLngLat([newLng, newLat]);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };
  const {
    isOpen: isTechnicianModalOpen,
    onOpen: onTechnicianModalOpen,
    onOpenChange: onTechnicianModalChange,
  } = useDisclosure();
  useLayoutEffect(() => {
    const initializeMap = async () => {
      if (!isLoading) {
        const map = await createMap({
          container: mapDiv.current,
          center: userLocation ? userLocation : [-123.1187, 49.2819],
          zoom: 14
        });
        setMap(map);
        if (userLocation) {
          map.flyTo({
            center: userLocation,
            zoom: 16,
            duration: 2000,
            easing: (t) => t,
          });

          const pulsatingCircle = document.createElement('div');
          pulsatingCircle.className = 'pulsating-circle';

          new maplibregl.Marker(pulsatingCircle)
            .setLngLat(userLocation)
            .addTo(map);
        }

      }

    };
    initializeMap();
  }, [isLoading]);
  const handleModalInformation = (technician) => {
    setTechnicianSelected(technician);
    onTechnicianModalOpen();
  }
  useEffect(() => {
    if (isMapReady && serviceRequest && serviceRequest.destLatitude && serviceRequest.destLongitude) {
      const { destLatitude, destLongitude } = serviceRequest;
      if (!technicianMarkerRef.current) {
        const technicianMarker = document.createElement('img');
        technicianMarker.src = `https://www.pngkey.com/png/full/60-601527_car-png-top.png`;
        technicianMarker.style.width = '30px';
        technicianMarker.style.height = '20px';
        technicianMarker.addEventListener('click', () => {
          console.log('Marcador de técnico clicado');
          console.log(serviceRequest.technicianSelected);
          handleModalInformation(serviceRequest.technicianSelected);
        });

        technicianMarkerRef.current = new maplibregl.Marker({ element: technicianMarker })
          .setLngLat([destLongitude, destLatitude])
          .addTo(map);
      } else {
        const startCoords = technicianMarkerRef.current.getLngLat().toArray();
        const endCoords = [destLongitude, destLatitude];
        animateMarker(technicianMarkerRef.current, startCoords, endCoords, 2000);

        const angleDegrees = CalculateAngleFromLocation(startCoords, endCoords);

        technicianMarkerRef.current.setLngLat([destLongitude, destLatitude]);
        technicianMarkerRef.current.setRotation(angleDegrees);
      }

    }
  }, [setServiceRequest, serviceRequest, isMapReady, setServiceCoordinates]);
  useEffect(() => {
    const subscription = client
      .graphql({ query: onUpdateServiceCoordinates, variables: { serviceId: serviceRequest && serviceRequest.id, customerId: serviceRequest && serviceRequest.serviceCustomerId } })
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
      <TechnicianInformationModal isOpen={isTechnicianModalOpen} onOpenChange={onTechnicianModalChange} technician={technicianSelected} />
      <div ref={mapDiv} id='map' className='map h-full lg:h-[100%] w-[100%] rounded-lg'></div>
    </>
  );
}
