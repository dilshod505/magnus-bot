"use client";

import React, { useState, useEffect } from 'react';
import { Col, Row } from "antd";
import Footer from "@/app/Footer/Footer";
import { useRouter } from "next/navigation";
import "./profile.css";
import { Riple } from "react-loading-indicators";
import {FaBagShopping, FaLocationDot, FaRightLeft, FaRightToBracket} from "react-icons/fa6";
import {AiFillShopping} from "react-icons/ai";
import {FaCentercode, FaChevronRight, FaUser} from "react-icons/fa";
import {MdOutlineShoppingCart} from "react-icons/md";

const Profil: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const orderClick = (section: string) => {
        if (section === "buyurtmalarim") {
            router.push("/buyurtmalarim");
        }
    };

    const locationClick = () => {
        router.push("/manzilarim");
    };

    const userClick = () => {
        router.push("/user");
    };

    const promaCodeClick = () => {
        router.push("/proma-kodlarim");
    };

    return (
        <div>
            <header className={"flex items-center py-5 px-5 gap-8"}>
                <div className={"bg-white px-5 py-4 shadow border-[50%] rounded-[16px]"}>
                    <h3 className={"text-[20px] font-bold"}>C</h3>
                </div>
                <div onClick={() => window.location.href="/user"} className={"cursor-pointer flex items-center gap-4"}>
                    <h1>Chat #1458</h1>
                     <span className={"text-gray-400"}><FaChevronRight/></span>
                </div>
            </header>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Riple color="#32cd32" size="large" text="" textColor="" />
                </div>
            ) : (
                <Row gutter={[16, 16]} className={"p-5"}>
                    <Col span={12}>
                        <div className="hover-item text-start" onClick={() => orderClick("buyurtmalarim")}>
                            <MdOutlineShoppingCart className="text-[36px] bg-orange-400 text-white rounded-full p-2" />
                           <h3 className=" text text-[16px] pt-2">Buyurtmalarim</h3>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="hover-item">
                            <FaBagShopping  className="text-[36px] bg-orange-400 text-white rounded-full p-2" />
                         <h3 className="text text-[16px] pt-2">Oldindan buyurtmalar</h3>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="hover-item" onClick={() => userClick()}>
                            <FaUser className="text-[36px] bg-orange-400 text-white rounded-full p-2" />
                            <h3 className="text text-[16px] pt-2">Profilim</h3>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="hover-item" onClick={locationClick}>
                            <FaLocationDot className="text-[36px] bg-orange-400 text-white rounded-full p-2" />
                            <h3 className="text text-[16px] pt-2">Manzillarim</h3>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={"hover-item"} onClick={promaCodeClick}>
                            <FaCentercode  className="text-[36px] bg-orange-400 text-white rounded-full p-2"/>
                            <h3 className="text text-[16px] pt-2">Proma kodlarim</h3>
                        </div>
                    </Col>
                </Row>
            )}
            <Footer cartItemCount={0} />
        </div>
    );
};

export default Profil;
