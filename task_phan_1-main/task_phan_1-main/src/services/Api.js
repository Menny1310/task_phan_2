import axiosInstance from './Axiosconfig';

// ===== AUTH SERVICES =====

/**
 * Đăng nhập
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise} { token, user }
 */
export const loginAPI = async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {
        email,
        password
    });
    return response.data;
};

/**
 * Đăng xuất
 * @returns {Promise}
 */
export const logoutAPI = async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
};

/**
 * Lấy thông tin user hiện tại (verify token)
 * @returns {Promise} user data
 */
export const getCurrentUser = async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
};

/**
 * Refresh token
 * @param {string} refreshToken 
 * @returns {Promise} { token, refreshToken }
 */
export const refreshTokenAPI = async (refreshToken) => {
    const response = await axiosInstance.post('/auth/refresh', {
        refreshToken
    });
    return response.data;
};

// ===== USER SERVICES =====

/**
 * Lấy danh sách users
 * @returns {Promise} array of users
 */
export const getUsers = async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
};

/**
 * Lấy thông tin user theo ID
 * @param {number} userId 
 * @returns {Promise} user data
 */
export const getUserById = async (userId) => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
};

/**
 * Cập nhật thông tin user
 * @param {number} userId 
 * @param {object} userData 
 * @returns {Promise} updated user
 */
export const updateUser = async (userId, userData) => {
    const response = await axiosInstance.put(`/users/${userId}`, userData);
    return response.data;
};

/**
 * Xóa user
 * @param {number} userId 
 * @returns {Promise}
 */
export const deleteUser = async (userId) => {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
};

// ===== EXAMPLE: Sử dụng trong component =====

/*
import { loginAPI, getCurrentUser } from '../services/api';

// Trong component Login
const handleLogin = async () => {
    try {
        const data = await loginAPI(email, password);
        login(data.user, data.token);
        navigate('/dashboard');
    } catch (error) {
        console.error('Login failed:', error);
        setError(error.response?.data?.message || 'Đăng nhập thất bại');
    }
};

// Trong component Dashboard
useEffect(() => {
    const fetchUserData = async () => {
        try {
            const userData = await getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };
    
    fetchUserData();
}, []);
*/

export default {
    loginAPI,
    logoutAPI,
    getCurrentUser,
    refreshTokenAPI,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};