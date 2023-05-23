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

    // return response.data
    console.log(response.data)
}

const stockService = {
    createMedicationStockItem,
}

export default stockService
