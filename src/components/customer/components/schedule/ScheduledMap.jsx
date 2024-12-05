'use client';
import React, { useRef, useContext, useLayoutEffect } from 'react';
import { PlaceContext } from '@/contexts/place/PlaceContext';
import { createMap } from 'maplibre-gl-js-amplify';
import maplibregl, { Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import "maplibre-gl-js-amplify/dist/public/amplify-map.css";
import { MapContext } from '@/contexts/map/MapContext';
export const ScheduledMap = ({ userMarkerRef }) => {
    const mapDiv = useRef(null);
    const { userLocation, isLoading } = useContext(PlaceContext);
    const { map, setMap, isMapReady } = useContext(MapContext);
    useLayoutEffect(() => {
        const initializeMap = async () => {
          if (!isLoading) {
            const mapC = await createMap({
              container: mapDiv.current,
              center: userLocation ? userLocation : [-123.1187, 49.2819],
              zoom: 12
            });
            setMap(mapC);

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
          }
    
        };
        initializeMap();
      }, [isLoading]);
    return (
        <>
            <div ref={mapDiv} id='map' className='map h-full lg:h-[100%] w-[100%] rounded-lg'></div>
        </>
    )
}