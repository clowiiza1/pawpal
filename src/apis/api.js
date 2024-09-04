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

// Add a request interceptor to include the JWT token in all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage (or sessionStorage)
        console.log('Interceptor token:', token); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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
