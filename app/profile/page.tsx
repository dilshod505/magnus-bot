"use client";

import React, { useState, useEffect } from 'react';
import { Col, Row } from "antd";
import { HomeOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import Footer from "@/app/Footer/Footer";
import { useRouter } from "next/navigation";
import "./profile.css";
import { Riple } from "react-loading-indicators";

const Profil: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after a delay
        }, 500); // Adjust delay as needed (1000ms = 1s)

        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, []);

    const handleSectionClick = (section: string) => {
        if (section === "buyurtmalarim") {
            router.push("/buyurtmalarim");
        }
        // Add other sections if needed
    };

    const handleLocationClick = () => {
        router.push("/manzilarim");
    };

    const userClick = () => {
        router.push("/user");
    };

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Riple color="#32cd32" size="large" text="" textColor="" />
                </div>
            ) : (
                <Row gutter={[16, 16]} className={"p-5"}>
                    <Col span={12}>
                        <div className="hover-item text-start" onClick={() => handleSectionClick("buyurtmalarim")}>
                            <ShoppingCartOutlined className="text-[24px] bg-orange-400 text-white rounded-full p-2" />
                            <div className="text"><h3 className="text-[16px]">Buyurtmalarim</h3></div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="hover-item">
                            <ShoppingCartOutlined className="text-[24px] bg-orange-400 text-white rounded-full p-2" />
                            <div className="text"><h3 className="text-[16px]">Oldindan buyurtmalar</h3></div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="hover-item" onClick={() => userClick()}>
                            <UserOutlined className="text-[24px] bg-orange-400 text-white rounded-full p-2" />
                            <div className="text"><h3 className="text-[16px]">Profilim</h3></div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="hover-item" onClick={handleLocationClick}>
                            <HomeOutlined className="text-[24px] bg-orange-400 text-white rounded-full p-2" />
                            <div className="text"><h3 className="text-[16px]">Manzillarim</h3></div>
                        </div>
                    </Col>
                </Row>
            )}
            <Footer cartItemCount={0} />
        </div>
    );
};

export default Profil;
