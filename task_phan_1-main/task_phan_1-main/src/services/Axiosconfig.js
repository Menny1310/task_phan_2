import axios from 'axios';

// Tạo instance axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Thay đổi URL khi có backend thật
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request Interceptor - Tự động thêm token vào header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor - Xử lý lỗi 401 (hết hạn token)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token hết hạn hoặc không hợp lệ
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Chuyển về trang login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;