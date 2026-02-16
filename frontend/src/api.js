const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('teddy_token');

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
    };

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Request Error:', error.message);
        throw error;
    }
};

export const api = {
    get: (endpoint, options) => apiRequest(endpoint, { ...options, method: 'GET' }),
    post: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
    patch: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
    delete: (endpoint, options) => apiRequest(endpoint, { ...options, method: 'DELETE' }),

    // Specialized for file uploads
    upload: async (endpoint, formData) => {
        const token = localStorage.getItem('teddy_token');
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            body: formData,
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` }),
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Upload failed');
        return data;
    }
};
