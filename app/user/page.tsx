"use client";

import React, { useEffect, useState } from 'react';
import {Button, Card, Checkbox, Form, Input, Select} from 'antd';
import { useRouter } from "next/navigation";
import Footer from "@/app/Footer/Footer";
import {FaArrowLeft, FaRegCreditCard} from "react-icons/fa";
import {AiOutlineFileProtect} from "react-icons/ai";
import {FaArrowLeftLong} from "react-icons/fa6";

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
    const [cart, setCart] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const onFinish = (values: any) => {
        const currentOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 76 }}>
                <Option value="998">+998</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div className={'flex flex-col items-center justify-between w-full h-screen'}>
            <header className={'flex items-center justify-between w-full bg-white px-3 py-3 shadow-lg'}>
                <div>
                    <FaArrowLeft onClick={() => window.location.href = "/profile"}/>
                </div>

                <h1 className={"text-2xl"}>Profilim</h1>

                <div></div>
            </header>
                <div className={'w-[100px] h-[100px] flex items-center justify-center bg-white shadow-lg rounded-[50%]'}>
                <img src="/sunglass-emoji.webp" alt="smile"
                     className={"w-[50px] h-[50px]"}/>
                </div>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '998'}}
                className={"py-5 px-5"}
                style={{maxWidth: 600}}
                scrollToFirstError
            >
                <Card className={"w-[440px] bg-gray-100 mb-5"}>
                    <div className={"mb-2 flex gap-5"}>
                        <AiOutlineFileProtect className={"text-[80px]"}/>
                        <h2 className={"text-2xl"}>Ma&apos;lumotlarni hiyoma qilish kafolati</h2>
                    </div>
                    <p>Sizning shaxsingiz ma&apos;lumotlaringiz himoyalangan serverlarda saqlanadi</p>
                </Card>

                <Form.Item
                    name="phone"
                    rules={[{required: true, message: 'Iltimos telefon raqamingizni kiriting'}]}
                >
                    <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item>
                    <Select placeholder={"Jinsingizni aniqlang"}>
                        <Select.Option value="erkak">Erkak</Select.Option>
                        <Select.Option value="ayol">Ayol</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <button type={"submit"} className={'w-full bg-black text-white h-[50px] mb-10 rounded-[16px]'}>
                        Saqlash
                    </button>
                </Form.Item>
            </Form>
            <Footer cartItemCount={0}/>
        </div>
    );
};

export default Page;
