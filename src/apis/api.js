import axios from 'axios';


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
        return response.data; 
    } catch (error) {
        console.error('Error fetching animals:', error);
        return [];
    }
};

// Fetch a specific animal by its ID
export const getAnimalById = async (id) => {
    try {
        const response = await api.get(`/animals/${id}`);
        return response.data; 
    } catch (error) {
        console.error(`Error fetching animal with ID ${id}:`, error);
        return null; // Return null on error
    }
};

export const getCategoriesBySpecies = async (species) => {
  try {
      const response = await api.get(`/categories/species/${species}`);
      return response.data; 
  } catch (error) {
      console.error(`Error fetching categories for species ${species}:`, error);
      return []; // Return an empty array on error
  }
};

export const getUserProfile = async (username) => {
    try {
        const response = await api.get(`/users/${username}`); // Adjust endpoint as needed
        return response.data; 
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
        return response.data; 
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
      const response = await api.get('/bookings'); 
      return response.data; 
  } catch (error) {
      console.error('Error fetching bookings:', error);
      return []; // Return an empty array on error
  }
};



// Fetch user by ID
export const getUserById = async (userId) => {
  try {
      const response = await api.get(`/users/${userId}`);
      return response.data; 
  } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      return null; // Return null on error
  }
};
export const getUserByUsername = async (username) => {
    try {
      const response = await api.get(`/users/username/${username}`);
      return response.data; 
    } catch (error) {
      console.error(`Error fetching user with username ${username}:`, error);
      return null; // Return null on error
    }
  };

export const getCategories = async () => {
  try {
      const response = await api.get('/categories');
      return response.data; 
  } catch (error) {
      console.error('Error fetching categories:', error);
      return []; // Return an empty array on error
  }
};

export const getCategoriesByAnimalId = async (animalId) => {
    try {
        const response = await api.get(`/animals/categories/${animalId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return []; // Return an empty array on error
    }
  };

export const deleteCategory = async (categoryId) => {
  try {
      const response = await api.delete(`/categories/${categoryId}`);
      return response.data; 
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
      return response.data; 
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
      return response.data; 
  } catch (error) {
      console.error('Error adding category:', error);
      return null; // Return null on error
  }
};

export const setVolunteerInformation = async (adopterInfo) => {
    try {
        const response = await api.post('/volunteer-info', adopterInfo);
        return response.data;
    } catch (error) {
        console.error('Error submitting adoupter:', error);
        return [];
    }
};




export const addBooking = async (bookingDate, animalId) => {
    try {
      const response = await api.post('/booking/adopter', {
        bookingDate,  // The selected booking date
        animalId,     // The ID of the selected animal
      });
      return response.data;  
    } catch (error) {
      console.error('Error adding adopter booking:', error);
      return null;  // Return null on error
    }
  };
  


export const updateBooking = async (booking) => {
  try {
      const response = await api.put(`/bookings/${booking.id}`, booking);
      return response.data; 
  } catch (error) {
      console.error('Error updating booking:', error);
      return null; // Return null on error
  }
};

// Delete booking
export const deleteBooking = async (bookingId) => {
  try {
      const response = await api.delete(`/bookings/${bookingId}`);
      return response.data; 
  } catch (error) {
      console.error(`Error deleting booking with ID ${bookingId}:`, error);
      return null; // Return null on error
  }
};

export const getVolunteerValid = async () => {
    try {
        const response = await api.get('/volunteer-valid');
        return response.data;
    } catch (error) {
        console.error('Error getting valid check', error);
        return [];
    }
};

export const bookVolunteer = async (date) => {
    try {
      const response = await api.post('/booking/volunteer', date, {
        headers: {
          'Content-Type': 'text/plain', 
        },
      });
      return response.data; // Return the booking data or success message
    } catch (error) {
      console.error('Error booking volunteer date:', error);
      return null; // Handle the error
    }
  };

  


export const getUserRoles = async () => {
  try {
      const response = await api.get('/users/role');
      return response.data; 
  } catch (error) {
      console.error('Error fetching user roles:', error);
      return []; // Return an empty array on error
  }
};

export const getAllUsers = async () => {
  try {
      const response = await api.get('/users');
      return response.data; 
  } catch (error) {
      console.error('Error fetching users:', error);
      return []; // Return an empty array on error
  }
};

export const updateAnimalCategories = async (animalId, categoryIds) => {
    try {
      const response = await api.put(`/animals/${animalId}/categories`, categoryIds);
      return response.data;
    } catch (error) {
      console.error('Error updating animal categories:', error);
      throw error;
    }
  };

  export const updateAnimal = async (animal) => {
    try {
      const response = await api.put('/animals', animal);
      return response.data; // Return the updated animal
    } catch (error) {
      console.error('Error updating animal:', error);
      throw error;
    }
  };

  export const deleteAnimal = async (animalId) => {
    try {
      const response = await api.delete(`/animals/${animalId}`);
      return response.data; 
    } catch (error) {
      console.error(`Error deleting animal with ID ${animalId}:`, error);
      throw error;
    }
  };
  export const addAnimal = async (animal) => {
  try {
    const response = await api.post('/animals', animal);
    return response.data; // Return the added animal
  } catch (error) {
    console.error('Error adding animal:', error);
    throw error;
  }
};

export const updateBookingStatus = async (bookingId, status) => {
    try {
      const response = await api.put(`/bookings/${bookingId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      return null;
    }
  };

  export const deleteUser = async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response.data; 
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      return null; // Return null on error
    }
  };

  export const updateUser = async (user) => {
    try {
      const response = await api.put('/users', user);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      return null; // Return null on error
    }
  };
  
  export const getBookingsByUserId = async () => {
    try {
      const response = await api.get(`/bookings/user`); // No need for userId parameter
      return response.data;// Assuming your API returns the bookings in response.data
    } catch (error) {
      console.error('Error fetching bookings for the current user:', error);
      return []; // Return an empty array on error
    }
  };

  export const getAdopterSuitabilityByUsername = async (username) => {
    try {
      const response = await api.get(`/adopter-suitability/user/${username}`);
      return response.data; 
    } catch (error) {
      console.error(`Error fetching adopter suitability for user ${username}:`, error);
      return null; // Return null on error
    }
  };
  
  export const updateAdopterSuitability = async (adopterSuitability) => {
  try {
    const response = await api.put('/adopter-suitability', adopterSuitability);
    return response.data; 
  } catch (error) {
    console.error('Error updating adopter suitability:', error);
    throw error;
  }
};
export const getVolunteerInfoByUserId = async () => {
    try {
      const response = await api.get('/volunteer-info/user/');
      return response.data; 
    } catch (error) {
      console.error('Error fetching volunteer information by user ID:', error);
      return null; // Return null on error
    }
  };

  export const updateVolunteerInfo = async (volunteerInfo) => {
    try {
      const response = await api.put('/volunteer-info',volunteerInfo);
      return response.data; 
    } catch (error) {
      console.error('Error updating volunteer info:', error);
      throw error;
    }
  };
