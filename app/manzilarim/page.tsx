"use client";

import React, { useState, useEffect } from 'react';
import Footer from "@/app/Footer/Footer";
import MapComponent from "@/components/map";
import { Riple } from "react-loading-indicators";
import {FaArrowLeft, FaMap} from "react-icons/fa";
import {SiGooglemaps} from "react-icons/si";

const Page = ({ cartItemCount }: { cartItemCount: any }) => {
    const [location, setLocation] = useState<GeolocationPosition | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(position);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLocation(null);
                }
            );
        }
    }, []);

    return (
        <div>
                <header className={"flex justify-between items-center py-5 px-5 shadow "}>
                    <div><FaArrowLeft  onClick={() => window.location.href = "/profile"}/></div>

                    <div>
                        <h1 className={"text-2xl"}>Manzillarim</h1>
                    </div>

                    <div></div>
                </header>
            {!location ? (
                <div className="flex justify-center items-center h-screen">
                    <Riple color="#32cd32" size="large" text="" textColor=""/>
                </div>
            ) : (
                    <MapComponent/>
            )}

            <Footer cartItemCount={cartItemCount}/>
        </div>
    );
};

export default Page;
