'use client';
import React, { useEffect } from 'react';
import { createMap, drawPoints } from 'maplibre-gl-js-amplify';
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css';
import "maplibre-gl-js-amplify/dist/public/amplify-map.css";

export default function Map({ myLocation }) {
  const geojson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {
          'message': 'Foo',
          'iconSize': [60, 60]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [-66.324462890625, -16.024695711685304]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'message': 'Bar',
          'iconSize': [50, 50]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [-61.2158203125, -15.97189158092897]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'message': 'Baz',
          'iconSize': [40, 40]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [-63.29223632812499, -18.28151823530889]
        }
      }
    ]
  };
  useEffect(() => {
    const initializeMap = async () => {
      const map = await createMap({
        container: 'map',
        center: myLocation ? myLocation : [-123.1187, 49.2819],
        zoom: 16
      });
      geojson.features.forEach((marker) => {
        // create a DOM element for the marker
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage =
          `url(https://picsum.photos/${marker.properties.iconSize.join('/')
          }/)`;
        el.style.width = `${marker.properties.iconSize[0]}px`;
        el.style.height = `${marker.properties.iconSize[1]}px`;

        el.addEventListener('click', () => {
          window.alert(marker.properties.message);
        });

        // add marker to map
        new maplibregl.Marker({ element: el })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      });
    };
    initializeMap();
  }, [myLocation]);

  return (
    <>
      <div id='map' className='map h-[100%] w-[100%] rounded-lg'></div>
    </>
  );
}
