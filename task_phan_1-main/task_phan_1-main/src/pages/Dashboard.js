import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-content">
                    <h1>Dashboard</h1>
                    <div className="user-info">
                        <span>Xin chào, {user?.name}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </nav>

            <div className="dashboard-content">
                <div className="welcome-card">
                    <h2>Chào mừng đến với Dashboard!</h2>
                    <p>Bạn đã đăng nhập thành công.</p>
                    
                    <div className="user-details">
                        <h3>Thông tin tài khoản:</h3>
                        <p><strong>ID:</strong> {user?.id}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Tên:</strong> {user?.name}</p>
                    </div>

                    <div className="token-info">
                        <h3>Trạng thái xác thực:</h3>
                        <p>✅ Token đang hoạt động</p>
                        <p><small>Token được lưu trong localStorage và tự động gửi kèm mọi request</small></p>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <h3>📊 Thống kê</h3>
                        <p>Xem các số liệu thống kê</p>
                    </div>
                    <div className="feature-card">
                        <h3>👥 Người dùng</h3>
                        <p>Quản lý người dùng</p>
                    </div>
                    <div className="feature-card">
                        <h3>⚙️ Cài đặt</h3>
                        <p>Cấu hình hệ thống</p>
                    </div>
                    <div className="feature-card">
                        <h3>📝 Báo cáo</h3>
                        <p>Xem báo cáo chi tiết</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;