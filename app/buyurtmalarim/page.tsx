"use client";

import React, {useState, useEffect} from 'react';
import {Card, Button} from "antd";
import Footer from "@/app/Footer/Footer";
import {FaTrash} from "react-icons/fa";
import {FaArrowLeftLong} from "react-icons/fa6";
import product from "@/app/mahsulotlar/Products/product";

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
}

const Buyurtmalarim = () => {
    const [orders, setOrders] = useState<Order[]>([]);


    const deleteProducts = (orderId: number, productId: number) => {
        const updatedOrders = orders.map((order) => {
            if (order.id === orderId) {
                const updatedProducts = order.products.filter((product) => product.id !== productId);
                return {...order, products: updatedProducts};
            }
            return order;
        }).filter((order) => order.products.length > 0);

        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
    };

    console.log(product)

    return (
        <header>
            <div className={"flex items-center justify-center py-5 px-5"}>
                <FaArrowLeftLong className={"text-[26px] ms-[-165px]"}
                                 onClick={() => window.location.href = "/profile"}/>
                <div className={"ms-20"}>
                    <h1 className={"text-2xl"}>Buyurtmalarim</h1>
                </div>
            </div>
            <div className={"flex items-center justify-between py-5 px-5"}>
                <h2 className={"bg-gray-200 rounded-[12px] p-2"}>Hammasi</h2>
                <h2 className={"bg-gray-200 rounded-[12px] p-2"}>Yangi</h2>
                <h2 className={"bg-gray-200 rounded-[12px] p-2"}>Qabul qilingan</h2>
                <h2 className={"bg-gray-200 rounded-[12px] p-2"}>Qayta ishlangan</h2>
            </div>
            <div>
                {orders.length === 0 ? (
                    <div>
                        <img src="/box.svg" alt="buyurtmalar yo'q" className={"w-[130px] ms-[170px] mt-[150px]"}/>
                        <h1 className={"text-center text-3xl"}>Sizda buyurtmalar yoq</h1>
                        <p className={"text-center text-gray-300"}>Bu erda sizning buyurtmalaringiz paydo boladi.</p>
                    </div>
                ) : (
                    orders?.map((order) => (
                        <Card key={order.id} className="mb-5 ">
                            <h2>Buyurtma ID: {order.id}</h2>
                            <p>Sana: {new Date(order.date).toLocaleString()}</p>
                            <p>Umumiy narx: {(order.total || 0).toLocaleString()} $</p>
                            <ul className={"mb-10"}>
                                {order.products?.map((product) => (
                                    <li key={product.id} className="flex gap-10 justify-between items-center">
                                        <img
                                            src={`https://magnus-backend.uz/${product.category ? product.category.photo : ""}`}
                                            alt={product.name}
                                        />


                                        <span>{product.name} - {product.quantity} dona, {(product.price || 0).toLocaleString()}$</span>
                                        <Button
                                            className={"bg-red-600 text-white mt-5"}
                                            onClick={() => deleteProducts(order.id, product.id)}
                                        >
                                            Bekor qilish
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))
                )}
            </div>
            <Footer cartItemCount={0}/>
        </header>
    );
};

export default Buyurtmalarim;
