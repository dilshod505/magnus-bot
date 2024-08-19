"use client";

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Typography } from "antd";
import { useRouter } from "next/navigation";
import Footer from "@/app/Footer/Footer";
import {usbUsd} from "@/types/varebls";
import {Riple} from "react-loading-indicators";

interface Product {
    id: number;
    nameUz: string;
    price: number;
    image: string;
}

const Savat: React.FC = () => {
    const [cart, setCart] = useState<{ [key: number]: number }>({});
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleOrder = () => {
        const currentOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        const newOrder = {
            id: Date.now(), // Use a unique identifier for the order
            products: products.map(product => ({
                id: product.id,
                name: product.nameUz,
                price: product.price,
                quantity: cart[product.id]
            })),
            total: totalPrice,
            date: new Date().toISOString(),
        };

        localStorage.setItem("orders", JSON.stringify([...currentOrders, newOrder]));

        localStorage.removeItem("cart");
        setCart({});

        // Redirect to the profile page
        router.push('/zakazlar');
    };

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productIds = Object.keys(cart).map(id => parseInt(id));
                if (productIds.length > 0) {
                    const response = await fetch('https://magnus-backend.uz/api/product/find-many', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            where: {
                                id: { in: productIds },
                                status: "Active",
                                balance: { not: 0 },
                                price: { not: 0 },
                            },
                        }),
                    });
                    const data = await response.json();
                    setProducts(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, [cart]);

    const handleQuantityChange = (productId: number, change: number) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            newCart[productId] = (newCart[productId] || 0) + change;
            if (newCart[productId] <= 0) {
                delete newCart[productId];
            }
            localStorage.setItem("cart", JSON.stringify(newCart));
            return newCart;
        });
    };

    const handleContinueShopping = () => {
        router.push('/');
    };

    const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

    const totalPrice = products.reduce((sum, product) => {
        return sum + (product.price * (cart[product.id] || 0));
    }, 0);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Riple color="#32cd32" size="large" text="" textColor="" />
                </div>
            ) : totalItems === 0 ? (
                <div className={"text-center"}>
                    <img src="/cart.webp" alt="" width={350} className="mx-auto" />
                    <h1 className={"text-2xl font-bold mb-2"}>Savatda hozircha <br/> mahsulot yo&apos;q</h1>
                    <span className={"text-gray-500"}>Bosh sahifadagi mahsulotlardan <br/> boshlang yoki kerakli mahsulotni <br/> qidiruv orqali toping</span>
                </div>
            ) : (
                <div>
                    <Row gutter={[16, 16]} className={"p-5"}>
                        {products.map((product) => (
                            <Col key={product.id} span={12}>
                                <Card
                                    className={"shadow-xl"}
                                    cover={
                                        <img
                                            alt={product.nameUz}
                                            src={`https://magnus-backend.uz/${product.image}`}
                                            className={"max-h-[120px]"}
                                        />
                                    }
                                >
                                    <Card.Meta
                                        title={product.nameUz}
                                        description={`${product.price.toLocaleString()} so'm`}
                                    />
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <Button
                                            type="default"
                                            shape="circle"
                                            icon={<span style={{ fontSize: '18px' }}>−</span>}
                                            onClick={() => handleQuantityChange(product.id, -1)}
                                            disabled={cart[product.id] <= 0}
                                            style={{ marginRight: '10px' }}
                                        />
                                        <Typography.Text>{cart[product.id]}</Typography.Text>
                                        <Button
                                            type="default"
                                            shape="circle"
                                            icon={<span style={{ fontSize: '18px' }}>+</span>}
                                            onClick={() => handleQuantityChange(product.id, 1)}
                                            style={{ marginLeft: '10px' }}
                                        />
                                    </div>
                                    <div>
                                        {(product.price * cart[product.id]).toFixed(1)}
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="flex flex-col min-h-screen">
                        {/* Boshqa kontent */}
                        <Footer cartItemCount={totalItems} />
                        <div style={{ position: 'fixed', bottom: '71px', width: '100%', zIndex: '1000' }}
                             className="flex items-center justify-between bg-gray-100 p-5">
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Total Price: {totalPrice.toLocaleString()} $
                            </div>
                            <Button
                                type="primary"
                                onClick={handleOrder}
                                style={{ padding: "22px 30px", borderRadius: "14px", backgroundColor: '#000000' }}
                            >
                                <span className={"px-5 pt-5 pb-5"}>Rasmiylashtirish</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <Footer cartItemCount={totalItems} />
        </div>
    );
};

export default Savat;
