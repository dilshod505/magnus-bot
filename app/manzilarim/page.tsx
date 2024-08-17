"use client";

import React, {useState, useEffect} from 'react';
import Footer from "@/app/Footer/Footer";
import MapComponent from "@/components/map";

const Page = ({cartItemCount}: { cartItemCount: number }) => {
    return (
        <div>
            <h1>Manzillarim</h1>
            {location ? (
                <div>
                    <h2>Sizning joylashuvingiz:</h2>
                    <div className="w-[400px] h-[400px] overflow-hidden">
                        <MapComponent/>
                    </div>
                </div>
            ) : (
                <p>Joylashuvni yuklamoqda...</p>
            )}
            <Footer cartItemCount={cartItemCount}/>
        </div>
    );
};

export default Page;
