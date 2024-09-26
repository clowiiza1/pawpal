import axios from 'axios';

// Base URL for your backend API
const API_URL = 'http://localhost:8080/api/';

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAnimals = async () => {
    try {
        const response = await api.get('/animals');
        return response.data; // Assuming your API returns the animal list in response.data
    } catch (error) {
        console.error('Error fetching animals:', error);
        return [];
    }
};

// Login function
export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        // Store the JWT token after successful login
        localStorage.setItem('token', response.data.token);
        console.log('Token stored:', localStorage.getItem('token'));
    }
    return response;
};

// Register function
export const register = async (userData) => {
    return await api.post('/auth/register', userData);
};

// Example of a protected API call that requires authentication
export const getProtectedData = async () => {
    return await api.get('/protected-data');
};

