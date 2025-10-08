import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Health check function
export const checkBackendHealth = async () => {
    try {
        const response = await api.get('/api/health');
        console.log(' Backend connected:', response.data);
        return true;
    } catch (error) {
        console.error(' Backend connection failed:', error.message);
        return false;
    }
};

// Sync user to backend
export const syncUserToBackend = async (userData) => {
    try {
        const response = await api.post('/api/users/sync', {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            emailAddresses: userData.emailAddresses,
            imageUrl: userData.imageUrl
        });
        console.log('User synced to backend:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error syncing user to backend:', error.response?.data || error.message);
        throw error;
    }
};

export default api;