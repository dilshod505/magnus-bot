import React, {useState} from 'react';
import {Menu, Modal, Row, Col, Checkbox, Button, ConfigProvider} from 'antd';
import {createStyles, useTheme} from 'antd-style';
import Image from 'next/image';
import {Input} from 'antd';
import Search from 'antd/es/input/Search';

const useStyle = createStyles(({token}) => ({
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

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    nameUz: string;
}

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
    const [search, setSearch] = useState<string>(''); // State for search input
    const [products, setProducts] = useState<Product[]>([]);

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
            setSelectedLanguage({key: "O'zbekcha", flag: '/uzb.png'});
        } else if (i === "Русский") {
            setSelectedLanguage({key: "Русский", flag: '/russian.png'});
        }
    };

    const {styles} = useStyle();
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    const filteredProducts = products.filter((product) =>
        product.nameUz.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <header className={`shadow bg-gary-150 px-10 py-5 text-black`}>
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
                <Col xs={24} sm={8} md={6} lg={4} className={"flex items-center justify-between"}>
                    <div>
                        <h1 className={"text-3xl"}>Qurilish mahsulotlari</h1>
                    </div>
                    <div onClick={showModal} style={{
                        cursor: 'pointer',
                        gap: "10px",
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: "white",
                    }}>
                        <Image src={selectedLanguage.flag} alt={selectedLanguage.key} width={30} height={20}/>
                    </div>
                </Col>
                <Col xs={24} sm={16} md={12} lg={10}>
                    <div>
                        <Search
                            placeholder="Mahsulotlarni qidirish"
                            enterButton
                            value={search}
                            onChange={handleSearchChange}
                            onSearch={handleSearch}
                        />
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
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Image src="/uzb.png" alt="O'zbekcha" width={20} height={20}/>
                                    <span style={{marginLeft: '8px'}}>Ozbekcha</span>
                                </div>
                                <Checkbox
                                    checked={checkedValues["O'zbekcha"]}
                                    onChange={() => handleCheckboxChange("O'zbekcha")}
                                />
                            </div>
                        </Menu.Item>
                        <Menu.Item key="Русский">
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Image src="/russian.png" alt="Русский" width={20} height={20}/>
                                    <span style={{marginLeft: '8px'}}>Русский</span>
                                </div>
                                <Checkbox
                                    checked={checkedValues["Русский"]}
                                    onChange={() => handleCheckboxChange("Русский")}
                                />
                            </div>
                        </Menu.Item>
                        <div style={{width: '100%', marginTop: '16px'}}>
                            <Button type="primary" onClick={handleOk} style={{width: '100%'}}>
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
