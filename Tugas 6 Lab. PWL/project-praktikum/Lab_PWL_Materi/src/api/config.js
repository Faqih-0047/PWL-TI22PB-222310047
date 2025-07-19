import axios from 'axios';

export const BASE_API_URL = `http://localhost:3000`;

const api = axios.create({
    baseURL: 'http://localhost:3000/api',

});


export const login = async (username, password) => {
    try {
        const response = await api.post('/users/login', { username, password });

        console.log('Login successful:', response.data);

       
        const { token } = response.data; 

      
        localStorage.setItem('token', token);

        return response.data; 
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};



export const logout = async () => {
    try {
        const response = await api.post('/auth/logout');
        console.log('Logout berhasil:', response.data);
    } catch (error) {
        console.error('Logout gagal:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default api;
