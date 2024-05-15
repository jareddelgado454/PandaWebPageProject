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
export default function Map() {
  const mapDiv = useRef(null);
  const { userLocation, isLoading } = useContext(PlaceContext);
  const { map, setMap, isMapReady } = useContext(MapContext);
  const [technicianSelected, setTechnicianSelected] = useState(null);
  const { serviceRequest, setServiceRequest } = useContext(ServiceContext);
  const {
    isOpen: isTechnicianModalOpen,
    onOpen: onTechnicianModalOpen,
    onOpenChange: onTechnicianModalChange,
  } = useDisclosure();
  // const geojson = {
  //   'type': 'FeatureCollection',
  //   'features': [
  //     {
  //       'type': 'Feature',
  //       'properties': {
  //         'message': 'Foo',
  //       },
  //       'geometry': {
  //         'type': 'Point',
  //         'coordinates': [-77.02761691395426, -12.04260133525865]
  //       }
  //     },
  //   ]
  // };
  // const geojson2 = {
  //   'type': 'Feature',
  //   'properties': {},
  //   'geometry': {
  //     'type': 'LineString',
  //     'coordinates': [
  //       [-77.02761691395426, -12.04260133525865],
  //       userLocation
  //     ]
  //   }
  // };
  useLayoutEffect(() => {
    const initializeMap = async () => {
      if (!isLoading) {
        const map = await createMap({
          container: mapDiv.current,
          center: userLocation ? userLocation : [-123.1187, 49.2819],
          zoom: 14
        });
        setMap(map);
        // map.on('load', () => {
        //   map.addSource('LineString', {
        //     'type': 'geojson',
        //     'data': geojson2
        //   });
        //   map.addLayer({
        //     'id': 'LineString',
        //     'type': 'line',
        //     'source': 'LineString',
        //     'layout': {
        //       'line-join': 'round',
        //       'line-cap': 'round'
        //     },
        //     'paint': {
        //       'line-color': '#BF93E4',
        //       'line-width': 5
        //     }
        //   });
        // })
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

          // geojson.features.forEach((marker) => {
          //   // create a DOM element for the marker
          //   const el = document.createElement('img');
          //   el.src = `https://www.pngkey.com/png/full/60-601527_car-png-top.png`;
          //   el.style.width = '30px'; // Set fixed width
          //   el.style.height = '30px';

          //   el.addEventListener('click', () => {
          //     window.alert(marker.properties.message);
          //   });

          //   // add marker to map
          //   new maplibregl.Marker({ element: el })
          //     .setLngLat(marker.geometry.coordinates)
          //     .addTo(map);
          // });

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
      const technicianMarker = document.createElement('img');
      technicianMarker.src = `https://www.pngkey.com/png/full/60-601527_car-png-top.png`;
      technicianMarker.style.width = '30px';
      technicianMarker.style.height = '20px';

      technicianMarker.addEventListener('click', () => {
        console.log('Marcador de técnico clicado');
        console.log(serviceRequest.technicianSelected);
        handleModalInformation(serviceRequest.technicianSelected);
      });

      new maplibregl.Marker({ element: technicianMarker })
        .setLngLat([destLatitude, destLongitude])
        .addTo(map);

    }
  }, [setServiceRequest, isMapReady, serviceRequest, map]);
  return (
    <>
      <TechnicianInformationModal isOpen={isTechnicianModalOpen} onOpenChange={onTechnicianModalChange} technician={technicianSelected} />
      <div ref={mapDiv} id='map' className='map h-full lg:h-[100%] w-[100%] rounded-lg'></div>
    </>
  );
}
