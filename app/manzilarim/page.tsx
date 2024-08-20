"use client";

import React, { useState, useEffect } from 'react';
import Footer from "@/app/Footer/Footer";
import MapComponent from "@/components/map";
import { Riple } from "react-loading-indicators";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface PageProps {
    cartItemCount: number;
}

const Page: React.FC<PageProps> = ({ cartItemCount }) => {
    const [location, setLocation] = useState<GeolocationPosition | null>(null);
    const navigate = useNavigate(); // React Router hook

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(position);
                },
                (error) => {
                    console.error("Location olishda xatolik:", error);
                    setLocation(null);
                }
            );
        }
    }, []);

    return (
        <div>
            <header className="flex justify-between items-center py-5 px-5 shadow">
                <div>
                    <FaArrowLeft onClick={() => navigate("/profile")} /> {/* React Router-dan foydalanish */}
                </div>

                <div>
                    <h1 className="text-2xl">Manzillarim</h1>
                </div>

                <div></div>
            </header>

            {!location ? (
                <div className="flex justify-center items-center h-screen">
                    <Riple color="#32cd32" size="large" text="" textColor="" />
                </div>
            ) : (
                <MapComponent />
                )}

            <Footer cartItemCount={cartItemCount} />
        </div>
    );
};

export default Page;
