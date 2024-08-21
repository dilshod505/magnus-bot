"use client";

import React, {useEffect, useState} from 'react';
import {Riple} from "react-loading-indicators";
import {FaArrowLeft} from "react-icons/fa";


function PromaKod() {

    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const returnProfile = () => {
        window.location.href = "/profile";
    };

    return (
        <div>
            <header className="fixed gap-[126px] flex justify-between items-center py-5 px-5 shadow">
                <div>
                    <FaArrowLeft onClick={returnProfile}/>
                </div>

                <div>
                    <h1 className="text-2xl">Proma kodlarim</h1>
                </div>

                <div></div>
            </header>
            {loading ? (
                <div className={"flex justify-center items-center h-screen"}>
                    <Riple color={"#32cd32"} size={"large"}/>
                </div>
            ) : (
                <div>
                    <div className={"flex justify-center items-center h-screen"}>
                        <div className={"text-center mt-[-150px]"}>
                            <img src="/empty.webp" alt="empty" width={"300px"}/>
                            <h3 className={"text-2xl"}>Proma kodlar yo&apos;q</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PromaKod;