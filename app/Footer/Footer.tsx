"use client";

import React from "react";
import { Row, Col, Badge } from "antd";
import { HomeOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";


interface FooterProps {
    cartItemCount: number;
}

function Footer({ cartItemCount }: FooterProps) {
    const navigate = useRouter();

    return (
        <footer style={{ backgroundColor: "#fff", padding: "10px 0", overflow: "hidden", position: "fixed", width: "100%", bottom: 0, boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.1)" }}>
            <Row justify="space-around" align="middle">
                <Col>
                    <Link href="/" style={{ textAlign: "center", display: "block" }}>
                        <HomeOutlined style={{ fontSize: '24px' }} />
                        <div>Bosh sahifa</div>
                    </Link>
                </Col>
                <Col onClick={() => navigate.push("/catalog")} className={"hover:text-blue-500"}>
                    <div style={{ textAlign: "center" }} className={"hover:text-blue-500"}>
                        <SearchOutlined style={{ fontSize: '24px' }} />
                        <div>Кatalog</div>
                    </div>
                </Col>
                <Col onClick={() => navigate.push("/savat")} className={"hover:text-blue-500"}>
                    <div style={{ textAlign: "center" }}>
                        <Badge count={cartItemCount} style={{ backgroundColor: '#52c41a', marginRight: '10px' }}>
                            <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                        </Badge>
                        <div>Savat</div>
                    </div>
                </Col>
                <Col onClick={() => navigate.push("/profile")} className={"hover:text-blue-500"}>
                    <div style={{ textAlign: "center" }}>
                        <UserOutlined style={{ fontSize: '24px' }} />
                        <div>Profil</div>
                    </div>
                </Col>
            </Row>
        </footer>
    );
}

export default Footer;
