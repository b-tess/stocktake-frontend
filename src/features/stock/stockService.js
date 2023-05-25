import axios from 'axios'

const MEDICATION_URL = '/api/medication'

//Create a new medication stock item as long as user is logged in & an admin
async function createMedicationStockItem(medicationData, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(MEDICATION_URL, medicationData, config)

    return response.data
    // console.log(response.data)
}

//Get all medication stock items as long as user is logged in
async function getMedicationStockItems(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(MEDICATION_URL, config)

    return response.data
}

const stockService = {
    createMedicationStockItem,
    getMedicationStockItems,
}

export default stockService
