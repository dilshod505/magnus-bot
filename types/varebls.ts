import axios from 'axios'

export const fetchCategories = async () => {
    return await axios.post('https://magnus-backend.uz/api/category/find-many', {})
}

export const usbUsd = async () => {
    return await axios.get('https://cbu.uz/uz/arkhiv-kursov-valyut/json/')
}

export const fetchProducts = async (id: number) => {
    return await axios.post('https://magnus-backend.uz/api/product/find-many', {
        where: {
            categoryId: id,
            status: 'Active',
            balance: {
                not: 0,
            },
            price: {
                not: 0,
            },
        },
        include: {
            category: true,
        },
    })
}


export const fetchCurrency = async () => {
    return await axios.get('https://cbu.uz/uz/arkhiv-kursov-valyut/json/')
}
