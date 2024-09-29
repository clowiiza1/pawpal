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

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

export const getAnimals = async () => {
    try {
        const response = await api.get('/animals');
        return response.data; // Assuming your API returns the animal list in response.data
    } catch (error) {
        console.error('Error fetching animals:', error);
        return [];
    }
};

// Fetch a specific animal by its ID
export const getAnimalById = async (id) => {
    try {
        const response = await api.get(`/animals/${id}`);
        return response.data; // Assuming your API returns the animal data in response.data
    } catch (error) {
        console.error(`Error fetching animal with ID ${id}:`, error);
        return null; // Return null on error
    }
};

export const getCategoriesBySpecies = async (species) => {
  try {
      const response = await api.get(`/categories/species/${species}`);
      return response.data; // Assuming your API returns the list of CategoryDto objects in response.data
  } catch (error) {
      console.error(`Error fetching categories for species ${species}:`, error);
      return []; // Return an empty array on error
  }
};
// Other API functions...

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

export const setAdopterInfo = async (adopterInfo) => {
    try {
        const response = await api.post('/adopter-suitability', adopterInfo);
        return response.data; 
    } catch (error) {
        console.error('Error submitting adoupter:', error);
        return [];
    }
};

export const getBookings = async () => {
  try {
      const response = await api.get('/bookings'); // Make sure this endpoint returns the status field
      return response.data; // Assuming your API returns the booking list including status in response.data
  } catch (error) {
      console.error('Error fetching bookings:', error);
      return []; // Return an empty array on error
  }
};



// Fetch user by ID
export const getUserById = async (userId) => {
  try {
      const response = await api.get(`/users/${userId}`);
      return response.data; // Assuming your API returns the user data in response.data
  } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      return null; // Return null on error
  }
};

export const getCategories = async () => {
  try {
      const response = await api.get('/categories');
      return response.data; // Assuming your API returns the category list in response.data
  } catch (error) {
      console.error('Error fetching categories:', error);
      return []; // Return an empty array on error
  }
};

export const deleteCategory = async (categoryId) => {
  try {
      const response = await api.delete(`/categories/${categoryId}`);
      return response.data; // Assuming the API returns a success message or deleted ID in response.data
  } catch (error) {
      console.error(`Error deleting category with ID ${categoryId}:`, error);
      return null; // Return null on error
  }
};

export const updateCategory = async (category) => {
  try {
      if (Array.isArray(category.animalType)) {
          category.animalType = category.animalType.join(',');
      }
      const response = await api.put('/categories', category);
      return response.data; // Assuming the updated category is returned in response.data
  } catch (error) {
      console.error('Error updating category:', error);
      return null; // Return null on error
  }
};

export const addCategory = async (category) => {
  try {
      // Send animalType as "Dog,Cat" if both are selected
      if (Array.isArray(category.animalType)) {
          category.animalType = category.animalType.join(',');
      }
      const response = await api.post('/categories', category);
      return response.data; // Assuming the added category is returned in response.data
  } catch (error) {
      console.error('Error adding category:', error);
      return null; // Return null on error
  }
};

// Add booking (if needed)
export const addBooking = async (booking) => {
  try {
      const response = await api.post('/bookings', booking);
      return response.data; // Assuming the added booking is returned in response.data
  } catch (error) {
      console.error('Error adding booking:', error);
      return null; // Return null on error
  }
};

// Update booking (if needed)
export const updateBooking = async (booking) => {
  try {
      const response = await api.put(`/bookings/${booking.id}`, booking);
      return response.data; // Assuming the updated booking is returned in response.data
  } catch (error) {
      console.error('Error updating booking:', error);
      return null; // Return null on error
  }
};

// Delete booking
export const deleteBooking = async (bookingId) => {
  try {
      const response = await api.delete(`/bookings/${bookingId}`);
      return response.data; // Assuming the API returns a success message or deleted ID in response.data
  } catch (error) {
      console.error(`Error deleting booking with ID ${bookingId}:`, error);
      return null; // Return null on error
  }
};
