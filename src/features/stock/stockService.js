import axios from 'axios'

// const MEDICATION_URL = '/api/medication'
const STOCKITEMS_URL = '/api/stockitems'
const STOCKITEM_URL = '/api/stockitem'

//Create a new stock item as long as user is logged in & an admin
async function createStockItem(stockData, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(STOCKITEMS_URL, stockData, config)

    return response.data
    // console.log(response.data)
}

//Get all stock items, regardless of the item type,
//as long as user is logged in
async function getAllStockItems(page, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(STOCKITEMS_URL + `/${page}`, config)
    console.log(response.data)

    return response.data
}

//Get one stock item, regardless of the item type,
//as long as user is logged in and is an admin
async function getOneStockItem(stockItemId, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    console.log(stockItemId)
    const response = await axios.get(STOCKITEM_URL + `/${stockItemId}`, config)

    return response.data
}

async function updateStockItem(stockItemId, updateData, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(
        STOCKITEM_URL + `/${stockItemId}`,
        updateData,
        config
    )

    return response.data
}

async function deleteStockItem(stockItemId, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(
        STOCKITEM_URL + `/${stockItemId}`,
        config
    )

    return response.data
}

const stockService = {
    createStockItem,
    getAllStockItems,
    getOneStockItem,
    updateStockItem,
    deleteStockItem,
}

export default stockService
