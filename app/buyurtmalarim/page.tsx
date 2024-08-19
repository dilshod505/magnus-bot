"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button } from "antd";
import Footer from "@/app/Footer/Footer";
import { FaArrowLeftLong } from "react-icons/fa6";
import {FaArrowLeft} from "react-icons/fa";

    interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: { photo: string };
}

interface Order {
    id: number;
    date: string;
    total: number;
    products: Product[];
    status: string;
}

const Buyurtmalarim = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [activeTab, setActiveTab] = useState<string>("Hammasi");

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        setOrders(storedOrders);
        setFilteredOrders(storedOrders);
    }, []);

    const filterOrders = (status: string) => {
        setActiveTab(status);
        if (status === "Hammasi") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order => order.status === status));
        }
    };

    return (
        <header>
            <div className={"flex items-center justify-between   py-5 px-5 shadow"}>
                <div>
                <FaArrowLeft onClick={() => window.location.href = "/profile"} />
                </div>
                <div>
                    <h1 className={"text-2xl"}>Buyurtmalarim</h1>
                </div>
                <div></div>
            </div>
            <div className={"flex items-center justify-between py-5 px-5"}>
                <h2 className={`rounded-[12px] p-2 ${activeTab === "Hammasi" ? "bg-black text-white" : ""}`}
                    onClick={() => filterOrders("Hammasi")}>Hammasi</h2>
                <h2 className={`rounded-[12px] p-2 ${activeTab === "Yangi" ? "bg-black text-white" : ""}`}
                    onClick={() => filterOrders("Yangi")}>Yangi</h2>
                <h2 className={`rounded-[12px] p-2 ${activeTab === "Qabul qilingan" ? "bg-black text-white" : ""}`}
                    onClick={() => filterOrders("Qabul qilingan")}>Qabul qilingan</h2>
                <h2 className={`rounded-[12px] p-2 ${activeTab === "Qayta ishlangan" ? "bg-black text-white" : ""}`}
                    onClick={() => filterOrders("Qayta ishlangan")}>Qayta ishlangan</h2>
            </div>
            <div>
                {filteredOrders.length === 0 ? (
                    <div>
                        <img src="/box.svg" alt="buyurtmalar yo'q" className={"w-[130px] ms-[170px] mt-[150px]"} />
                        <h1 className={"text-center text-3xl"}>Sizda buyurtmalar yoq</h1>
                        <p className={"text-center text-gray-300"}>Bu erda sizning buyurtmalaringiz paydo boladi.</p>
                    </div>
                ) : (
                    filteredOrders?.map((order) => (
                        <Card key={order.id} className="mb-5">
                            <h2>Buyurtma ID: {order.id}</h2>
                            <p>Sana: {new Date(order.date).toLocaleString()}</p>
                            <p>Umumiy narx: {(order.total || 0).toLocaleString()} $</p>
                            <ul className={"mb-10"}>
                                {order.products?.map((product) => (
                                    <li key={product.id} className="flex gap-10 justify-between items-center">
                                        <img
                                            src={`https://magnus-backend.uz/${product.image}`}
                                            alt={product.name}
                                        />
                                        <span>{product.name} - {product.quantity} dona, {(product.price || 0).toLocaleString()}$</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))
                )}
            </div>
            <Footer cartItemCount={0} />
        </header>
    );
};

export default Buyurtmalarim;
