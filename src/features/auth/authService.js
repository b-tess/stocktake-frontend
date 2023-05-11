import axios from 'axios'

const API_URL = '/api/users'

async function signup(userData) {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    signup,
}

export default authService
