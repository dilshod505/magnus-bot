"use client";

import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { useRouter } from "next/navigation";
import Footer from "@/app/Footer/Footer";
import {FaRegCreditCard} from "react-icons/fa";

const { Option } = Select;

interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
    name: string;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Page: React.FC = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [cart, setCart] = useState<{ [key: number]: number }>({});
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [products, setProducts] = useState<any[]>([]); // Define your products type

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        const calculateTotal = () => {
            let total = 0;
            products.forEach(product => {
                if (cart[product.id]) {
                    total += product.price * cart[product.id];
                }
            });
            setTotalPrice(total);
        };
        calculateTotal();
    }, [cart, products]);

    const onFinish = (values: any) => {
        const currentOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        const newOrder = {
            id: Date.now(),
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

        router.push("/buyurtmalarim");
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 76 }}>
                <Option value="998">+998</Option>
                <Option value="+78">+78</Option>
                <Option value="+54">+54</Option>
                <Option value="1">+1</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div>


            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '998' }}
                style={{ maxWidth: 600 }}
                className={"py-5 px-5"}
                scrollToFirstError
            >
                <h2 className={"text-center text-2xl mb-3"}>Buyurtma qabul qilish</h2>
                <Form.Item<DataNodeType>
                    rules={[{ required: true, message: 'Iltimos ismingizni kiriting' }]}
                >
                    <Input placeholder="Ismingizni kiriting" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Iltimos telefon raqamingizni kiriting' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item>
                    <h2>Tolov turi</h2>
                    <Select placeholder={"Tolov turini tanlang"}>
                        <Select.Option value="humo">
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <FaRegCreditCard style={{ marginRight: 8 }} /> Humo
            </span>
                        </Select.Option>
                        <Select.Option value="visa">
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <FaRegCreditCard style={{ marginRight: 8 }} /> Visa
            </span>
                        </Select.Option>
                        <Select.Option value="xaql banki">
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <FaRegCreditCard style={{ marginRight: 8 }} /> Xalq Banki
            </span>
                        </Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        Hammasiga ruxsat berish<a href=""></a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Xarid qilish
                    </Button>
                </Form.Item>
            </Form>
            <Footer cartItemCount={0}/>
        </div>
    );
};

export default Page;

