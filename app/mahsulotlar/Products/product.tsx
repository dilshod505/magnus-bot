"use client";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Col, Row, Button, Image } from 'antd';
import { FaBagShopping } from "react-icons/fa6";


interface Category {
    id: number;
    nameUz: string;
    photo: string;
}

interface IProduct {
    id: number;
    nameUz: string;
    price: number;
    image: string;
}

const fetchCategories = async (): Promise<Category[]> => {
    const response = await axios.post('https://magnus-backend.uz/api/category/find-many', {});
    return response.data.data;
};

const fetchProductsByCategory = async (categoryId: number): Promise<IProduct[]> => {
    const response = await axios.post("https://magnus-backend.uz/api/product/find-many", {
        where: {
            categoryId,
            status: "Active",
            balance: { not: 0 },
            price: { not: 0 },
        },
        include: { category: true }
    });
    return response.data.data;
};

const Products: React.FC<{ onCartUpdate: (cart: { [key: number]: number }) => void }> = ({ onCartUpdate }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [cart, setCart] = useState<{ [key: number]: number }>({});
    const [showQuantity, setShowQuantity] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadCategories();
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        onCartUpdate(cart);
    }, [cart, onCartUpdate]);

    const categoryClick = async (categoryId: number) => {
        setSelectedCategory(categoryId);
        try {
            const data = await fetchProductsByCategory(categoryId);
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const addProduct = (productId: number) => {
        setCart((prevCart) => {
            const newCart = {
                ...prevCart,
                [productId]: (prevCart[productId] || 0) + 1,
            }
            console.log(newCart)
            localStorage.setItem("cart", JSON.stringify(newCart));
            onCartUpdate(newCart);
            return newCart;
        });
        setShowQuantity((prev) => ({ ...prev, [productId]: true }));
    };

    const removeProduct = (productId: number) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            if (newCart[productId]) {
                newCart[productId]--;
                if (newCart[productId] <= 0) {
                    delete newCart[productId];
                    setShowQuantity((prev) => ({ ...prev, [productId]: false }));
                }
            }
            localStorage.setItem("cart", JSON.stringify(newCart));
            onCartUpdate(newCart);
            return newCart;
        });
    };

    return (
        <div className="w-full p-5 max-h-[120px]">
            <Row gutter={[16, 16]}>
                {categories.map((category) => (
                    <Col
                        key={category.id}
                        span={8}
                        onClick={() => categoryClick(category.id)}
                    >
                        <div className="cursor-pointer bg-white rounded-lg overflow-hidden duration-300">
                            <img
                                src={`https://magnus-backend.uz/${category.photo}`}
                                alt={category.nameUz}
                                className="w-full max-h-[150px] object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">{category.nameUz}</h2>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>


            {selectedCategory && products.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>
                    <Row gutter={[16, 16]}>
                        {products.map((product) => (
                            <Col key={product.id} span={12}>
                                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                                    <Image
                                        src={`https://magnus-backend.uz/${product.image}`}
                                        alt={product.nameUz}
                                        className="w-full max-h-[130px] rounded object-contain p-4"
                                            preview={false}
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
                </div>
            )}
        </div>
    );
};

export default Products;
