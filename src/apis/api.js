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

// api to fetch user information for Profile page
export const getUserProfile = async (username) => {
  try {
      const response = await api.get(`/users/${username}`); // Adjust endpoint as needed
      return response.data; // Assuming your API returns user data in response.data
  } catch (error) {
      console.error('Error fetching user profile:', error);
      return null; // Return null on error
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

export const checkIfAdopterSuitabilityExists = async (username) => {
    try {
      const response = await api.get(`/adopter-suitability/user/${username}/exists`);
      return response.data; // Should return true or false
    } catch (error) {
      console.error('Error checking adopter suitability:', error);
      return false; // Return false on error
    }
  };

export const filterAnimals = async (filterData) => {
    try {
      const response = await api.post('/animals/filter', filterData);
      return response.data; // Assuming the filtered animals are returned in response.data
    } catch (error) {
      console.error('Error filtering animals:', error);
      return [];
    }
  };


