import React from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 41.2995,
    lng: 69.2401
};

const MapComponent: React.FC = () => {
    return (
        <LoadScript googleMapsApiKey="AIzaSyBNf_aEehgHQeMiACN5L5LbOme8azNyJAA">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
            >
                <Marker position={center}/>
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
