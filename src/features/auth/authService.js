import axios from 'axios'

const API_URL = '/api/users'

//Create a new user
async function signup(userData) {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Log in a user
async function login(userData) {
    const response = await axios.post(API_URL + '/login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Log out a user
export function logout() {
    localStorage.removeItem('user')
}

const authService = {
    signup,
    login,
    logout,
}

export default authService
