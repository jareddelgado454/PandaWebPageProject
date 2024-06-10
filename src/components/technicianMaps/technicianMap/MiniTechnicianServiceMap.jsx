'use client';
import React, { useContext, useLayoutEffect, useRef, useEffect } from 'react';
import { createMap } from 'maplibre-gl-js-amplify';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'maplibre-gl-js-amplify/dist/public/amplify-map.css';
import { PlaceTechnicianContext } from '@/contexts/placeTechnician/PlaceTechnicianContext';
import { MapTechnicianContext } from '@/contexts/mapTechnician/MapTechnicianContext';

export default function MiniTechnicianServiceMap({ customerLocation }) {
  const mapDiv = useRef(null);
  const { technicianLocation, isLoading } = useContext(PlaceTechnicianContext);
  const { map: technicianMap, setTechnicianMap } = useContext(MapTechnicianContext);
  console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeereeeeeeeeeeeeeeeeee,", technicianLocation, customerLocation)
  const technicianMarkerRef = useRef(null);
  const customerMarkerRef = useRef(null);

  useLayoutEffect(() => {
    const initializeMap = async () => {
      if (!technicianMap) {
        const map = await createMap({
          container: mapDiv.current,
          center: [customerLocation.lon, customerLocation.lat],
          zoom: 14,
        });

        if (customerLocation) {
          customerMarkerRef.current = new maplibregl.Marker()
            .setLngLat([customerLocation.lon, customerLocation.lat])
            .addTo(map);
        }

        if (technicianLocation) {
          technicianMarkerRef.current = new maplibregl.Marker()
            .setLngLat(technicianLocation)
            .addTo(map);
        }

        if (customerLocation && technicianLocation) {
          const bounds = new maplibregl.LngLatBounds();
          bounds.extend([customerLocation.lon, customerLocation.lat]);
          bounds.extend(technicianLocation);
          map.fitBounds(bounds, { padding: 50 });
        } else if (technicianLocation) {
          map.flyTo({
            center: technicianLocation,
            zoom: 14,
            duration: 2000,
            easing: (t) => t,
          });
        }

        setTechnicianMap(map);
      }
    };

    if (!isLoading) {
      initializeMap();
    }
  }, [isLoading, setTechnicianMap, technicianLocation, customerLocation, technicianMap]);

  useEffect(() => {
    if (technicianLocation && technicianMap) {
      if (customerLocation) {
        const bounds = new maplibregl.LngLatBounds();
        bounds.extend([customerLocation.lon, customerLocation.lat]);
        bounds.extend(technicianLocation);
        technicianMap.fitBounds(bounds, { padding: 50 });
      } else {
        technicianMap.flyTo({
          center: technicianLocation,
          zoom: 14,
          duration: 2000,
          easing: (t) => t,
        });
      }

      if (technicianMarkerRef.current) {
        technicianMarkerRef.current.setLngLat(technicianLocation);
      } else {
        technicianMarkerRef.current = new maplibregl.Marker()
          .setLngLat(technicianLocation)
          .addTo(technicianMap);
      }
    }
  }, [technicianLocation, technicianMap, customerLocation]);

  return (
    <div ref={mapDiv} id='map' className='map h-[100%] w-full rounded-t-xl m-0'></div>
  );
}