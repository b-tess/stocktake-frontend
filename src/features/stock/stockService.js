import axios from 'axios'

// const MEDICATION_URL = '/api/medication'
const STOCKITEMS_URL = '/api/stockitems'

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
async function getAllStockItems(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(STOCKITEMS_URL, config)

    return response.data
}

const stockService = {
    getAllStockItems,
    createStockItem,
}

export default stockService
