"use client";

import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Image, Button } from 'antd';
import Footer from "@/app/Footer/Footer";
import { Riple } from "react-loading-indicators";
import Search from "antd/es/input/Search";
import { FaBagShopping } from "react-icons/fa6";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    nameUz: string;
}

function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cart, setCart] = useState<{ [key: number]: number }>({});
    const [showQuantity, setShowQuantity] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://magnus-backend.uz/api/product/find-many', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        where: {
                            status: "Active",
                            balance: { not: 0 },
                            price: { not: 0 },
                        },
                    }),
                });
                if (!response.ok) {
                    console.log("xatolik");
                }
                const data = await response.json();
                setProducts(data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addProduct = (id: number) => {
        setCart((prevCart) => {
            const newQuantity = (prevCart[id] || 0) + 1;
            setShowQuantity((prevShow) => ({ ...prevShow, [id]: true }));
            return { ...prevCart, [id]: newQuantity };
        });
    };

    const removeProduct = (id: number) => {
        setCart((prevCart) => {
            const newQuantity = (prevCart[id] || 0) - 1;
            if (newQuantity <= 0) {
                const { [id]: _, ...rest } = prevCart; // Remove the product from cart
                setShowQuantity((prevShow) => ({ ...prevShow, [id]: false }));
                return rest;
            }
            return { ...prevCart, [id]: newQuantity };
        });
    };

    const cartItemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

    return (
        <div>
            <div className="px-5 py-5 flex items-center justify-between shadow-xl mb-3">
                <h1 className="text-center text-[12px]]">Barcha mahsulotlar</h1>
                <div>
                    <Search placeholder="Mahsulotlarni qidirish" enterButton />
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Riple color="#32cd32" size="large" text="" textColor="" />
                </div>
            ) : error ? (
                <p>Xatolik: {error}</p>
            ) : (
                <Row gutter={[16, 16]}>
                    {products.map((product) => (
                        <Col key={product.id} span={12}>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                                <Image
                                    src={`https://magnus-backend.uz/${product.image}`}
                                    alt={product.nameUz}
                                    className="w-full max-h-[130px] rounded object-contain p-4"
                                    preview={true}
                                />
                                <div className="p-4 flex flex-col flex-grow text-center">
                                    <h3 className="text-md font-medium text-gray-700">{product.nameUz}</h3>
                                    <div className="mt-2">
                                        <p className="text-lg font-bold text-red-500">
                                            {product.price.toLocaleString()} $
                                        </p>
                                        <p className="text-sm text-gray-500 line-through">
                                            {(product.price * 1.25).toLocaleString()} $
                                        </p>
                                    </div>
                                    <div className="flex items-center mt-auto">
                                        {!showQuantity[product.id] ? (
                                            <Button
                                                type="primary"
                                                className="bg-red-600 border-none w-[100%] mt-2 hover:bg-green-600 flex items-center justify-center"
                                                icon={<FaBagShopping className="mr-2" />}
                                                onClick={() => addProduct(product.id)}
                                            >
                                                Savatga
                                            </Button>
                                        ) : (
                                            <div className="flex items-center">
                                                <Button onClick={() => removeProduct(product.id)}>-</Button>
                                                <span className="mx-2">{cart[product.id] || 0}</span>
                                                <Button onClick={() => addProduct(product.id)}>+</Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
            <Footer cartItemCount={cartItemCount} />
        </div>
    );
}

export default Catalog;
