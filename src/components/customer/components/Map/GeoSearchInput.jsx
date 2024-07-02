'use client';
import React, { useContext, useEffect } from 'react';
import { createAmplifyGeocoder } from 'maplibre-gl-js-amplify';
import { MapContext } from '@/contexts/map/MapContext';
import { PlaceContext } from '@/contexts/place/PlaceContext';
import maplibregl, { Marker } from 'maplibre-gl';
import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import 'maplibre-gl-js-amplify/dist/public/amplify-geocoder.css';

export default function GeoSearchInput({ userMarkerRef }) {
    const { map, isMapReady } = useContext(MapContext);
    const { updateUserLocation } = useContext(PlaceContext);

    useEffect(() => {
        let geocoder = null;

        const initializeGeocoder = () => {
            geocoder = createAmplifyGeocoder({ showResultMarkers: false, placeholder: '¿Where are you?...' });

            // Add the geocoder control to the map
            map.addControl(geocoder, 'top-left');

            // Apply custom styles
            const geocoderEl = document.querySelector('.maplibregl-ctrl-geocoder');
            if (geocoderEl) {
                geocoderEl.classList.add('my-geocoder');
                geocoderEl.classList.add('service-form-item-selector3');
            }

            // Listen for the result event to update the user location
            geocoder.on('result', handleResult);

            function handleResult(event) {
                const { result } = event;
                const [longitude, latitude] = result.geometry.coordinates;
                //console.log(result);
                // Dispatch action to update user location
                updateUserLocation([longitude, latitude]);

                // Fly to the new location
                map.flyTo({
                    center: [longitude, latitude],
                    zoom: 16,
                    duration: 3000,
                    easing: (t) => t,
                });

                // Update or add custom marker
                if (userMarkerRef.current) {
                    userMarkerRef.current.setLngLat([longitude, latitude]);
                } else {
                    userMarkerRef.current = new Marker()
                        .setLngLat(userLocation)
                        .addTo(map);

                    // const markerElement = document.createElement('div');
                    // markerElement.className = 'customer-pulsating-circle';

                    // userMarkerRef.current = new maplibregl.Marker(markerElement)
                    //     .setLngLat([longitude, latitude])
                    //     .addTo(map);
                }
            }
        };

        if (isMapReady && map) {
            initializeGeocoder();
        }

        return () => {
            // Clean up: Remove event listener and destroy geocoder
            if (geocoder) {
                map.removeControl(geocoder);
                geocoder = null;
            }
        };
    }, [isMapReady, map, updateUserLocation, userMarkerRef]);

    return null;
}
