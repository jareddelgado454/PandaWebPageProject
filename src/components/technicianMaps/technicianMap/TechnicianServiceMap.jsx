'use client';
import React, { useContext, useLayoutEffect, useRef } from 'react';
import { createMap } from 'maplibre-gl-js-amplify';
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css';
import "maplibre-gl-js-amplify/dist/public/amplify-map.css";
import { PlaceTechnicianContext } from '@/contexts/placeTechnician/PlaceTechnicianContext';
import { MapTechnicianContext } from '@/contexts/mapTechnician/MapTechnicianContext';
export default function TechnicianServiceMap() {
  const mapDiv = useRef(null);
  const { technicianLocation, isLoading } = useContext(PlaceTechnicianContext);
  const { setTechnicianMap } = useContext(MapTechnicianContext);

  const geojson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {
          'message': 'Foo',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [-77.02761691395426, -12.04260133525865]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'message': 'Bar',
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [-77.02886488213905, -12.042742305265621]
        }
      },
    ]
  };
  const geojson2 = {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'LineString',
      'coordinates': [
        [-77.02761691395426, -12.04260133525865],
        technicianLocation
      ]
    }
  };
  useLayoutEffect(() => {
    const initializeMap = async () => {
      if (!isLoading) {
        const map = await createMap({
          container: mapDiv.current,
          center: technicianLocation ? technicianLocation : [-123.1187, 49.2819],
          zoom: 14
        });
        setTechnicianMap(map);
        map.on('load', () => {
          map.addSource('LineString', {
            'type': 'geojson',
            'data': geojson2
          });
          map.addLayer({
            'id': 'LineString',
            'type': 'line',
            'source': 'LineString',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#BF93E4',
              'line-width': 5
            }
          });
        })
        if (technicianLocation) {
          map.flyTo({
            center: technicianLocation,
            zoom: 16,
            duration: 2000,
            easing: (t) => t,
          });

          const pulsatingCircle = document.createElement('div');
          pulsatingCircle.className = 'pulsating-circle';

          new maplibregl.Marker(pulsatingCircle)
            .setLngLat(technicianLocation)
            .addTo(map);

          geojson.features.forEach((marker) => {
            const el = document.createElement('img');
            el.src = `https://www.pngkey.com/png/full/60-601527_car-png-top.png`;
            el.style.width = '30px'; 
            el.style.height = '30px';

            el.addEventListener('click', () => {
              window.alert(marker.properties.message);
            });

            // add marker to map
            new maplibregl.Marker({ element: el })
              .setLngLat(marker.geometry.coordinates)
              .addTo(map);
          });

        }

      }

    };
    initializeMap();
  }, [isLoading]);

  return (
    <>
      <div ref={mapDiv} id='map' className='map h-[75%] w-full rounded-t-xl m-0'></div>
    </>
  );
}
