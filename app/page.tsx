"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/Header/header";
import Products from "@/app/mahsulotlar/Products/product";
import Footer from "@/app/Footer/Footer";

export function BoshSahifa() {
    const [cart, setCart] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        // Savatni localStorage'dan yuklash
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const handleCartUpdate = (updatedCart: { [key: number]: number }) => {
        setCart(updatedCart);
    };

    const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

    return (
        <div>
            <Header />
            <Products onCartUpdate={handleCartUpdate} />
            <Footer cartItemCount={totalItems} />
        </div>
    );
}

export default BoshSahifa;