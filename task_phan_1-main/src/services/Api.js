import axiosInstance from './Axiosconfig';
import { hasPermission } from '../constants/roles';

// Helper function để check permission trước khi gọi API
const checkPermissionBeforeCall = (requiredPermission) => {
    const userString = localStorage.getItem('user');
    if (!userString) {
        throw new Error('User not authenticated');
    }
    
    const user = JSON.parse(userString);
    const userRole = user?.role;
    
    if (!hasPermission(userRole, requiredPermission)) {
        throw new Error(`Permission denied. Required: ${requiredPermission}`);
    }
};

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
 * Lấy danh sách users (Chỉ Admin và Staff)
 * @returns {Promise} array of users
 */
export const getUsers = async () => {
    // Check permission trước khi gọi API
    checkPermissionBeforeCall('view_users');
    
    const response = await axiosInstance.get('/users');
    return response.data;
};

/**
 * Lấy thông tin user theo ID
 * @param {number} userId 
 * @returns {Promise} user data
 */
export const getUserById = async (userId) => {
    checkPermissionBeforeCall('view_users');
    
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
};

/**
 * Cập nhật thông tin user (Chỉ Admin)
 * @param {number} userId 
 * @param {object} userData 
 * @returns {Promise} updated user
 */
export const updateUser = async (userId, userData) => {
    checkPermissionBeforeCall('manage_users');
    
    const response = await axiosInstance.put(`/users/${userId}`, userData);
    return response.data;
};

/**
 * Xóa user (Chỉ Admin)
 * @param {number} userId 
 * @returns {Promise}
 */
export const deleteUser = async (userId) => {
    checkPermissionBeforeCall('manage_users');
    
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
};

// ===== TASK SERVICES =====

/**
 * Tạo task mới (Tất cả role)
 * @param {object} taskData 
 * @returns {Promise}
 */
export const createTask = async (taskData) => {
    checkPermissionBeforeCall('create_tasks');
    
    const response = await axiosInstance.post('/tasks', taskData);
    return response.data;
};

/**
 * Xử lý task (Chỉ Admin và Staff)
 * @param {number} taskId 
 * @param {object} processData 
 * @returns {Promise}
 */
export const processTask = async (taskId, processData) => {
    checkPermissionBeforeCall('process_tasks');
    
    const response = await axiosInstance.put(`/tasks/${taskId}/process`, processData);
    return response.data;
};

/**
 * Lấy danh sách tasks
 * @returns {Promise}
 */
export const getTasks = async () => {
    const response = await axiosInstance.get('/tasks');
    return response.data;
};

// ===== REPORT SERVICES =====

/**
 * Xem báo cáo (Tất cả role)
 * @returns {Promise}
 */
export const viewReports = async () => {
    checkPermissionBeforeCall('view_reports');
    
    const response = await axiosInstance.get('/reports');
    return response.data;
};

/**
 * Xuất báo cáo (Chỉ Admin và Staff)
 * @param {string} format 
 * @returns {Promise}
 */
export const exportReport = async (format = 'pdf') => {
    checkPermissionBeforeCall('export_reports');
    
    const response = await axiosInstance.post('/reports/export', { format });
    return response.data;
};

// ===== STATISTICS SERVICES =====

/**
 * Xem thống kê (Chỉ Admin)
 * @returns {Promise}
 */
export const getStatistics = async () => {
    checkPermissionBeforeCall('view_statistics');
    
    const response = await axiosInstance.get('/statistics');
    return response.data;
};

// ===== SYSTEM SERVICES =====

/**
 * Quản lý hệ thống (Chỉ Admin)
 * @param {object} systemData 
 * @returns {Promise}
 */
export const manageSystem = async (systemData) => {
    checkPermissionBeforeCall('manage_system');
    
    const response = await axiosInstance.post('/system/manage', systemData);
    return response.data;
};

/**
 * Cập nhật cài đặt (Chỉ Admin)
 * @param {object} settings 
 * @returns {Promise}
 */
export const updateSettings = async (settings) => {
    checkPermissionBeforeCall('edit_settings');
    
    const response = await axiosInstance.put('/settings', settings);
    return response.data;
};

/**
 * Xem cài đặt (Admin và Staff)
 * @returns {Promise}
 */
export const viewSettings = async () => {
    checkPermissionBeforeCall('view_settings');
    
    const response = await axiosInstance.get('/settings');
    return response.data;
};

// ===== EXAMPLE: Sử dụng trong component =====

/*
import { loginAPI, getCurrentUser, createTask, processTask } from '../services/api';

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

// Trong component với role checking
const handleCreateTask = async () => {
    try {
        // API sẽ tự động check permission
        await createTask({ title: 'New Task', description: 'Task details' });
        alert('Task created successfully!');
    } catch (error) {
        if (error.message.includes('Permission denied')) {
            alert('Bạn không có quyền thực hiện hành động này!');
        } else {
            alert('Có lỗi xảy ra!');
        }
    }
};

// Xử lý task - chỉ Admin và Staff có quyền
const handleProcessTask = async (taskId) => {
    try {
        await processTask(taskId, { status: 'completed' });
        alert('Task processed successfully!');
    } catch (error) {
        if (error.message.includes('Permission denied')) {
            alert('Bạn không có quyền xử lý task!');
        }
    }
};
*/

export default {
    // Auth
    loginAPI,
    logoutAPI,
    getCurrentUser,
    refreshTokenAPI,
    
    // Users
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    
    // Tasks
    createTask,
    processTask,
    getTasks,
    
    // Reports
    viewReports,
    exportReport,
    
    // Statistics
    getStatistics,
    
    // System
    manageSystem,
    updateSettings,
    viewSettings
};