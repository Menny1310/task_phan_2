import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // ✅ ĐÚNG

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Hiển thị loading khi đang kiểm tra trạng thái xác thực
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                fontSize: '18px'
            }}>
                Đang tải...
            </div>
        );
    }

    // Nếu chưa đăng nhập thì chuyển về trang login
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Nếu đã đăng nhập thì cho phép truy cập
    return children;
};

export default PrivateRoute;