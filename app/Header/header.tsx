"use client";

import React, { useState } from 'react';
import {Menu, Modal, Row, Col, Checkbox, Button, ConfigProvider, message} from 'antd';
import { createStyles, useTheme } from 'antd-style';
import Image from 'next/image';
import { Input } from 'antd';
import {IoSearchSharp} from "react-icons/io5";

const useStyle = createStyles(({ token }) => ({
    'my-modal-body': {
        background: token.blue1,
        padding: token.paddingSM,
    },
    'my-modal-mask': {
        boxShadow: `inset 0 0 15px #fff`,
    },
    'my-modal-header': {
        borderBottom: `1px dotted ${token.colorPrimary}`,
    },
    'my-modal-footer': {
        color: token.colorPrimary,
    },
    'my-modal-content': {
        border: '1px solid #333',
    },
}));

const Header = () => {
    const [selectedLanguage, setSelectedLanguage] = useState({
        key: "O'zbekcha",
        flag: '/uzb.png'
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [checkedValues, setCheckedValues] = useState({
        "O'zbekcha": true,
        "Русский": false
    });


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCheckboxChange = (i: string) => {
        const updatedValues: Record<string, boolean> = {
            "O'zbekcha": false,
            "Русский": false
        };
        updatedValues[i] = true;
        setCheckedValues(updatedValues);

        if (i === "O'zbekcha") {
            setSelectedLanguage({ key: "O'zbekcha", flag: '/uzb.png' });
        } else if (i === "Русский") {
            setSelectedLanguage({ key: "Русский", flag: '/russian.png' });
        }
    };

    const { styles } = useStyle();
    const token = useTheme();

    const classNames = {
        body: styles['my-modal-body'],
        mask: styles['my-modal-mask'],
        header: styles['my-modal-header'],
        footer: styles['my-modal-footer'],
        content: styles['my-modal-content'],
    };

    const modalStyles = {
        header: {
            borderLeft: `5px solid ${token.colorPrimary}`,
            borderRadius: 0,
            paddingInlineStart: 5,
        },
        body: {
            boxShadow: 'inset 0 0 5px #999',
            borderRadius: 5,
        },
        mask: {
            backdropFilter: 'blur(10px)',
        },
        footer: {
            borderTop: '1px solid #333',
        },
        content: {
            boxShadow: '0 0 30px #999',
        },
    };



    return (
        <header className={`shadow-lg bg-blue-100 px-10 py-5 text-black`}>
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
                <Col xs={24} sm={8} md={6} lg={4} style={{ textAlign: "left", paddingLeft: "20px" }}>
                    <h1 className={"text-3xl"}>Qurilish mahsulotlari</h1>
                </Col>
                <Col xs={24} sm={16} md={12} lg={10}>
                    <Input
                        prefix={<IoSearchSharp />
                        }
                        placeholder="Mahsulotlarni qidirish"
                        style={{
                            width: "100%",
                            maxWidth: "600px",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                        }}
                    />
                </Col>
                <Col xs={24} sm={4} md={3} lg={2} style={{ textAlign: "right", paddingRight: "20px" }}>
                    <div onClick={showModal} style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                        <Image src={selectedLanguage.flag} alt={selectedLanguage.key} width={30} height={20} />
                    </div>
                </Col>
            </Row>

            <ConfigProvider
                modal={{
                    classNames,
                    styles: modalStyles,
                }}
            >
                <Modal
                    title="Tilni tanlang"
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Menu selectable defaultSelectedKeys={[selectedLanguage.key]}>
                        <Menu.Item key="O'zbekcha">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Image src="/uzb.png" alt="O'zbekcha" width={20} height={20} />
                                    <span style={{ marginLeft: '8px' }}>Ozbekcha</span>
                                </div>
                                <Checkbox
                                    checked={checkedValues["O'zbekcha"]}
                                    onChange={() => handleCheckboxChange("O'zbekcha")}
                                />
                            </div>
                        </Menu.Item>
                        <Menu.Item key="Русский">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Image src="/russian.png" alt="Русский" width={20} height={20} />
                                    <span style={{ marginLeft: '8px' }}>Русский</span>
                                </div>
                                <Checkbox
                                    checked={checkedValues["Русский"]}
                                    onChange={() => handleCheckboxChange("Русский")}
                                />
                            </div>
                        </Menu.Item>
                        <div style={{ width: '100%', marginTop: '16px' }}>
                            <Button type="primary" onClick={handleOk} style={{ width: '100%' }}>
                                Tanlang
                            </Button>
                        </div>
                    </Menu>
                </Modal>
            </ConfigProvider>
        </header>
    );
};

export default Header;