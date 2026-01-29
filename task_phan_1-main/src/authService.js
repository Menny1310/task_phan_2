// authService.js
export const authService = {
    // Đăng nhập
    login: async (email, password) => {
        const response = await fetch("https://your-api-url.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        
        if (!response.ok) {
            throw new Error("Login failed");
        }
        
        return await response.json();
    },

    // Lưu token
    saveToken: (token) => {
        localStorage.setItem("token", token);
    },

    // Lấy token
    getToken: () => {
        return localStorage.getItem("token");
    },

    // Xóa token (đăng xuất)
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    // Kiểm tra đã đăng nhập chưa
    isAuthenticated: () => {
        return !!localStorage.getItem("token");
    },

    // Gọi API với token
    fetchWithAuth: async (url, options = {}) => {
        const token = authService.getToken();
        
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    },
};