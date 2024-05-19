'use client';
import React, { useContext, useLayoutEffect, useRef, useEffect } from 'react';
import { createMap } from 'maplibre-gl-js-amplify';
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css';
import "maplibre-gl-js-amplify/dist/public/amplify-map.css";
import { PlaceTechnicianContext } from '@/contexts/placeTechnician/PlaceTechnicianContext';
import { MapTechnicianContext } from '@/contexts/mapTechnician/MapTechnicianContext';
export default function TechnicianServiceMap({ customerLocation }) {
  const mapDiv = useRef(null);
  const { technicianLocation, isLoading } = useContext(PlaceTechnicianContext);
  const { map: technicianMap, setTechnicianMap } = useContext(MapTechnicianContext);

  console.log("coordenadas",technicianLocation);
  useLayoutEffect(() => {
    const initializeMap = async () => {
      if (!isLoading) {
        console.log(technicianLocation);
        const map = await createMap({
          container: mapDiv.current,
          center: technicianLocation ? technicianLocation : [-123.1187, 49.2819],
          zoom: 14
        });

        if (technicianLocation) {
          map.flyTo({
            center: technicianLocation,
            zoom: 14,
            duration: 2000,
            easing: (t) => t,
          });

          // const markerTechnician = document.createElement('div');
          // markerTechnician.className = 'markerTechnician';
          // const imagen = document.createElement('img');
          // imagen.src = './image/defaultProfilePicture.jpg'; 
          // imagen.alt = 'Perfil'; 
          // imagen.className = "profilePictureMap"
          // imagen.style.width = '38px'; 
          // imagen.style.height = '38px';
          // markerTechnician.appendChild(imagen);

          // new maplibregl.Marker({element : markerTechnician})
          //   .setLngLat(technicianLocation)
          //   .addTo(map);

          new maplibregl.Marker()
            .setLngLat(technicianLocation)
            .addTo(map);
        }
  
        const destinationCoords = [-71.54762650927478, -16.447128594951618]; 
        if (destinationCoords) {
          new maplibregl.Marker()
            .setLngLat(destinationCoords)
            .addTo(map);
        }
        setTechnicianMap(map);
      }
    };
    initializeMap();
  }, [isLoading]);

  useEffect(() => {
    if (technicianLocation && technicianMap) {
      technicianMap.flyTo({
        center: technicianLocation,
        zoom: 14,
        duration: 2000,
        easing: (t) => t,
      });

      const existingMarkers = document.querySelectorAll('.maplibregl-marker');
      existingMarkers.forEach(marker => marker.remove());

      new maplibregl.Marker()
        .setLngLat(technicianLocation)
        .addTo(technicianMap);
    }
  }, [technicianLocation, technicianMap]);

  return (
    <>
      <div ref={mapDiv} id='map' className='map h-[75%] w-full rounded-t-xl m-0'></div>
    </>
  );
}
