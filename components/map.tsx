import React, {useState} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {FaFacebook, FaInstagram, FaLinkedinIn, FaPhone, FaTelegram, FaTwitter} from "react-icons/fa";
import {Col} from "antd";

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 41.2995,
    lng: 69.2401
};

const MapComponent: React.FC = () => {
    const [markerPosition, setMarkerPosition] = useState(center);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setMarkerPosition({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            });
        }
    };

    const shareLocationTelegram = () => {
        const {lat, lng} = markerPosition;
        const url = `https://maps.google.com/?q=${lat},${lng}`;
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=Joylashuv`;
        window.open(telegramUrl, '_blank');
    };

    const shareLocationFacebook = () => {
        const {lat, lng} = markerPosition;
        const url = `https://maps.google.com/?q=${lat},${lng}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank');
    };

    const shareLocationInstagram = () => {
        const {lat, lng} = markerPosition;
        const url = `https://maps.google.com/?q=${lat},${lng}`;
        const instagramUrl = `https://www.instagram.com/share?url=${encodeURIComponent(url)}`;
        window.open(instagramUrl, '_blank');
    };


    return (
        <div>
            <div className={"text-center mt-5 flex items-center justify-center"}>
                <img src="/maps.png" alt="map" width={240}/>
            </div>
            <LoadScript googleMapsApiKey="AIzaSyBNf_aEehgHQeMiACN5L5LbOme8azNyJAA">
                <div className={"flex items-center justify-center w-[100%] h-[100%]"}>
                    <GoogleMap
                        mapContainerClassName={"mt-5"}
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={13}
                        onClick={handleMapClick}
                    >
                        <Marker position={markerPosition}/>
                    </GoogleMap>
                </div>
            </LoadScript>
            <footer className="bg-gray-900 text-white py-10 mb-10">
                <div className="max-w-6xl mx-auto px-4">
                    <Col span={24} className="flex items-center justify-center gap-[70px]">
                        <div className="flex flex-col items-start">
                            <h3 className="text-[18px] mb-4">Bog&apos;lanish</h3>
                            <ul>
                                <li className="mb-2 flex items-center">
                                    <FaPhone className="mr-2"/>
                                    <a href="#">+998 97 888 10 27</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[18px]  mb-4">Joylashuvni jonatish</h3>
                            <ul className={"flex items-center gap-[10px]"}>
                                <li className={"text-2xl"}>
                                    <button onClick={shareLocationTelegram} className="text-blue-500 bg-white rounded-[50%] btn btn-primary">
                                    <FaTelegram/>
                                </button>
                                </li>
                                <li  className={"text-2xl"}>
                                <button onClick={shareLocationInstagram} className="text-red-500 bg-white rounded-[100%] btn btn-primary">
                                    <FaInstagram/>
                                </button>
                                </li>
                                <li  className={"text-2xl"}>
                                <button onClick={shareLocationFacebook} className="text-blue-500 bg-white rounded-[100%] btn btn-primary">
                                    <FaFacebook/>
                                </button>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </div>
            </footer>
        </div>
    );
};

export default MapComponent;
