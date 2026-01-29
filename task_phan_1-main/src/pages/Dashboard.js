import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePermission } from '../hooks/usePermission';
import PermissionGuard from '../components/PermissionGuard';
import RoleGuard from '../components/RoleGuard';
import { PERMISSIONS, ROLES } from '../constants/roles';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { hasPermission, userRole } = usePermission();
    const navigate = useNavigate();
    const [notification, setNotification] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAction = (action, requiredPermission) => {
        if (!hasPermission(requiredPermission)) {
            setNotification(`❌ Bạn không có quyền ${action}!`);
            setTimeout(() => setNotification(''), 3000);
            return;
        }
        
        setNotification(`✅ Đã thực hiện: ${action}`);
        setTimeout(() => setNotification(''), 3000);
        console.log(`Action: ${action} - Permission: ${requiredPermission}`);
    };

    const getRoleBadgeColor = () => {
        switch(userRole) {
            case ROLES.ADMIN: return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            case ROLES.STAFF: return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            case ROLES.USER: return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            default: return '#999';
        }
    };

    const getRoleDisplayName = () => {
        switch(userRole) {
            case ROLES.ADMIN: return 'ADMIN';
            case ROLES.STAFF: return 'STAFF';
            case ROLES.USER: return 'USER';
            default: return 'UNKNOWN';
        }
    };

    return (
        <div className="dashboard-main-container">
            <nav className="dashboard-navbar">
                <div className="dashboard-navbar-content">
                    <h1 className="dashboard-navbar-title">Dashboard</h1>
                    <div className="dashboard-user-info">
                        <span className="dashboard-user-avatar">{user?.avatar}</span>
                        <div className="dashboard-user-details">
                            <span className="dashboard-user-name">Xin chào, {user?.name}</span>
                            <span 
                                className="dashboard-user-badge"
                                style={{ background: getRoleBadgeColor() }}
                            >
                                {getRoleDisplayName()}
                            </span>
                        </div>
                        <button onClick={handleLogout} className="dashboard-logout-btn">
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </nav>

            {notification && (
                <div className={`dashboard-notification ${notification.includes('❌') ? 'dashboard-notification-error' : 'dashboard-notification-success'}`}>
                    {notification}
                </div>
            )}

            <div className="dashboard-content-wrapper">
                <div className="dashboard-welcome-card">
                    <h2 className="dashboard-welcome-title">Chào mừng đến với Dashboard!</h2>
                    <p className="dashboard-welcome-text">Bạn đã đăng nhập thành công với role: <strong>{getRoleDisplayName()}</strong></p>
                    
                    <div className="dashboard-user-info-box">
                        <h3 className="dashboard-info-title">Thông tin tài khoản:</h3>
                        <p className="dashboard-info-text"><strong>ID:</strong> {user?.id}</p>
                        <p className="dashboard-info-text"><strong>Email:</strong> {user?.email}</p>
                        <p className="dashboard-info-text"><strong>Tên:</strong> {user?.name}</p>
                        <p className="dashboard-info-text"><strong>Role:</strong> {user?.role}</p>
                    </div>

                    <div className="dashboard-permissions-box">
                        <h3 className="dashboard-permissions-title">Quyền của bạn:</h3>
                        <RoleGuard role={ROLES.ADMIN}>
                            <p className="dashboard-permission-item">✅ Toàn quyền quản trị hệ thống</p>
                            <p className="dashboard-permission-item">✅ Quản lý người dùng (tạo, sửa, xóa)</p>
                            <p className="dashboard-permission-item">✅ Quản lý nội dung đầy đủ</p>
                            <p className="dashboard-permission-item">✅ Xem và xuất báo cáo</p>
                            <p className="dashboard-permission-item">✅ Cấu hình hệ thống</p>
                            <p className="dashboard-permission-item">✅ Phê duyệt công việc</p>
                        </RoleGuard>
                        
                        <RoleGuard role={ROLES.STAFF}>
                            <p className="dashboard-permission-item">✅ Xem danh sách người dùng</p>
                            <p className="dashboard-permission-item">✅ Tạo và chỉnh sửa nội dung</p>
                            <p className="dashboard-permission-item">✅ Xem báo cáo</p>
                            <p className="dashboard-permission-item">✅ Xem cài đặt hệ thống</p>
                            <p className="dashboard-permission-item">✅ Tạo và xử lý công việc</p>
                            <p className="dashboard-permission-item dashboard-permission-denied">❌ Không có quyền xóa người dùng</p>
                            <p className="dashboard-permission-item dashboard-permission-denied">❌ Không có quyền phê duyệt</p>
                        </RoleGuard>
                        
                        <RoleGuard role={ROLES.USER}>
                            <p className="dashboard-permission-item">✅ Xem nội dung</p>
                            <p className="dashboard-permission-item">✅ Xem công việc</p>
                            <p className="dashboard-permission-item dashboard-permission-denied">❌ Không có quyền quản lý</p>
                            <p className="dashboard-permission-item dashboard-permission-denied">❌ Không có quyền tạo/sửa/xóa</p>
                            <p className="dashboard-permission-item dashboard-permission-denied">❌ Không có quyền xem báo cáo</p>
                        </RoleGuard>
                    </div>
                </div>

                {/* QUẢN LÝ NGƯỜI DÙNG */}
                <PermissionGuard permission={PERMISSIONS.VIEW_USERS}>
                    <div className="dashboard-section-card">
                        <h2 className="dashboard-section-title">👥 Quản lý Người dùng</h2>
                        <div className="dashboard-actions-grid">
                            <PermissionGuard 
                                permission={PERMISSIONS.CREATE_USER}
                                fallback={
                                    <button className="dashboard-action-btn dashboard-btn-disabled" disabled>
                                        ➕ Thêm User (Chỉ Admin)
                                    </button>
                                }
                            >
                                <button 
                                    className="dashboard-action-btn dashboard-btn-admin"
                                    onClick={() => handleAction('Thêm người dùng', PERMISSIONS.CREATE_USER)}
                                >
                                    ➕ Thêm User
                                </button>
                            </PermissionGuard>

                            <PermissionGuard 
                                permission={PERMISSIONS.EDIT_USER}
                                fallback={
                                    <button className="dashboard-action-btn dashboard-btn-disabled" disabled>
                                        ✏️ Sửa User (Chỉ Admin)
                                    </button>
                                }
                            >
                                <button 
                                    className="dashboard-action-btn dashboard-btn-admin"
                                    onClick={() => handleAction('Sửa người dùng', PERMISSIONS.EDIT_USER)}
                                >
                                    ✏️ Sửa User
                                </button>
                            </PermissionGuard>

                            <PermissionGuard 
                                permission={PERMISSIONS.DELETE_USER}
                                fallback={
                                    <button className="dashboard-action-btn dashboard-btn-disabled" disabled>
                                        🗑️ Xóa User (Chỉ Admin)
                                    </button>
                                }
                            >
                                <button 
                                    className="dashboard-action-btn dashboard-btn-danger"
                                    onClick={() => handleAction('Xóa người dùng', PERMISSIONS.DELETE_USER)}
                                >
                                    🗑️ Xóa User
                                </button>
                            </PermissionGuard>

                            <button 
                                className="dashboard-action-btn dashboard-btn-view"
                                onClick={() => handleAction('Xem danh sách người dùng', PERMISSIONS.VIEW_USERS)}
                            >
                                👁️ Xem danh sách
                            </button>
                        </div>
                    </div>
                </PermissionGuard>

                {/* QUẢN LÝ NỘI DUNG */}
                <PermissionGuard permission={PERMISSIONS.VIEW_CONTENT}>
                    <div className="dashboard-section-card">
                        <h2 className="dashboard-section-title">📝 Quản lý Nội dung</h2>
                        <div className="dashboard-actions-grid">
                            <PermissionGuard 
                                permission={PERMISSIONS.CREATE_CONTENT}
                                fallback={
                                    <button className="dashboard-action-btn dashboard-btn-disabled" disabled>
                                        ➕ Tạo nội dung (Không có quyền)
                                    </button>
                                }
                            >
                                <button 
                                    className="dashboard-action-btn dashboard-btn-staff"
                                    onClick={() => handleAction('Tạo nội dung', PERMISSIONS.CREATE_CONTENT)}
                                >
                                    ➕ Tạo nội dung
                                </button>
                            </PermissionGuard>

                            <PermissionGuard 
                                permission={PERMISSIONS.EDIT_CONTENT}
                                fallback={
                                    <button className="dashboard-action-btn dashboard-btn-disabled" disabled>
                                        ✏️ Sửa nội dung (Không có quyền)
                                    </button>
                                }
                            >
                                <button 
                                    className="dashboard-action-btn dashboard-btn-staff"
                                    onClick={() => handleAction('Sửa nội dung', PERMISSIONS.EDIT_CONTENT)}
                                >
                                    ✏️ Sửa nội dung
                                </button>
                            </PermissionGuard>

                            <PermissionGuard 
                                permission={PERMISSIONS.DELETE_CONTENT}
                                fallback={
                                    <button className="dashboard-action-btn dashboard-btn-disabled" disabled>
                                        🗑️ Xóa nội dung (Chỉ Admin)
                                    </button>
                                }
                            >
                                <button 
                                    className="dashboard-action-btn dashboard-btn-danger"
                                    onClick={() => handleAction('Xóa nội dung', PERMISSIONS.DELETE_CONTENT)}
                                >
                                    🗑️ Xóa nội dung
                                </button>
                            </PermissionGuard>

                            <button 
                                className="dashboard-action-btn dashboard-btn-view"
                                onClick={() => handleAction('Xem nội dung', PERMISSIONS.VIEW_CONTENT)}
                            >
                                👁️ Xem nội dung
                            </button>
                        </div>
                    </div>
                </PermissionGuard>

                {/* BÁO CÁO */}
                <PermissionGuard permission={PERMISSIONS.VIEW_REPORTS}>
                    <div className="dashboard-section-card">
                        <h2 className="dashboard-section-title">📊 Báo cáo</h2>
                        <div className="dashboard-actions-grid">
                            <button 
                                className="dashboard-action-btn dashboard-btn-view"
                                onClick={() => handleAction('Xem báo cáo', PERMISSIONS.VIEW_REPORTS)}
                            >
                                👁️ Xem báo cáo
                            </button>

                            <PermissionGuard 
                                permission={PERMISSIONS.EXPORT_REPORTS}
                                fallback={
                                    <button className="dashboard-action-btn dashboard-btn-disabled" disabled>
                                        📥 Xuất báo cáo (Chỉ Admin)
                                    </button>
                                }
                            >
                                <button 
                                    className="dashboard-action-btn dashboard-btn-admin"
                                    onClick={() => handleAction('Xuất báo cáo', PERMISSIONS.EXPORT_REPORTS)}
                                >
                                    📥 Xuất báo cáo
                                </button>
                            </PermissionGuard>
                        </div>
                    </div>
                </PermissionGuard>

                {/* CÀI ĐẶT */}
                <PermissionGuard permission={PERMISSIONS.VIEW_SETTINGS}>
                    <div className="dashboard-section-card">
                        <h2 className="dashboard-section-title">⚙️ Cài đặt</h2>
                        <div className="dashboard-actions-grid">
                            <button 
                                className="dashboard-action-btn dashboard-btn-view"
                                onClick={() => handleAction('Xem cài đặt', PERMISSIONS.VIEW_SETTINGS)}
                            >
                                👁️ Xem cài đặt
                            </button>

                            <PermissionGuard 
                                permission={PERMISSIONS.EDIT_SETTINGS}
                                fallback={
                                    <button className="dashboard-action-btn dashboard-btn-disabled" disabled>
                                        ✏️ Sửa cài đặt (Chỉ Admin)
                                    </button>
                                }
                            >
                                <button 
                                    className="dashboard-action-btn dashboard-btn-admin"
                                    onClick={() => handleAction('Sửa cài đặt', PERMISSIONS.EDIT_SETTINGS)}
                                >
                                    ✏️ Sửa cài đặt
                                </button>
                            </PermissionGuard>
                        </div>
                    </div>
                </PermissionGuard>

                {/* CÔNG VIỆC */}
                <PermissionGuard permission={PERMISSIONS.VIEW_TASKS}>
                    <div className="dashboard-section-card">
                        <h2 className="dashboard-section-title">📋 Công việc</h2>
                        <div className="dashboard-actions-grid">
                            <button 
                                className="dashboard-action-btn dashboard-btn-view"
                                onClick={() => handleAction('Xem công việc', PERMISSIONS.VIEW_TASKS)}
                            >
                                👁️ Xem công việc
                            </button>

                            <PermissionGuard 
                                permission={PERMISSIONS.CREATE_TASK}
                                fallback={
                                    <button className="dashboard-action-btn dashboard-btn-disabled" disabled>
                                        ➕ Tạo công việc (Không có quyền)
                                    </button>
                                }
                            >
                                <button 
                                    className="dashboard-action-btn dashboard-btn-staff"
                                    onClick={() => handleAction('Tạo công việc', PERMISSIONS.CREATE_TASK)}
                                >
                                    ➕ Tạo công việc
                                </button>
                            </PermissionGuard>

                            <PermissionGuard 
                                permission={PERMISSIONS.EDIT_TASK}
                                fallback={
                                    <button className="dashboard-action-btn dashboard-btn-disabled" disabled>
                                        ✏️ Xử lý công việc (Không có quyền)
                                    </button>
                                }
                            >
                                <button 
                                    className="dashboard-action-btn dashboard-btn-staff"
                                    onClick={() => handleAction('Xử lý công việc', PERMISSIONS.EDIT_TASK)}
                                >
                                    ✏️ Xử lý công việc
                                </button>
                            </PermissionGuard>

                            <PermissionGuard 
                                permission={PERMISSIONS.APPROVE_TASK}
                                fallback={
                                    <button className="dashboard-action-btn dashboard-btn-disabled" disabled>
                                        ✅ Phê duyệt (Chỉ Admin)
                                    </button>
                                }
                            >
                                <button 
                                    className="dashboard-action-btn dashboard-btn-admin"
                                    onClick={() => handleAction('Phê duyệt công việc', PERMISSIONS.APPROVE_TASK)}
                                >
                                    ✅ Phê duyệt
                                </button>
                            </PermissionGuard>

                            <PermissionGuard 
                                permission={PERMISSIONS.DELETE_TASK}
                                fallback={
                                    <button className="dashboard-action-btn dashboard-btn-disabled" disabled>
                                        🗑️ Xóa công việc (Chỉ Admin)
                                    </button>
                                }
                            >
                                <button 
                                    className="dashboard-action-btn dashboard-btn-danger"
                                    onClick={() => handleAction('Xóa công việc', PERMISSIONS.DELETE_TASK)}
                                >
                                    🗑️ Xóa công việc
                                </button>
                            </PermissionGuard>
                        </div>
                    </div>
                </PermissionGuard>

                {/* Thông báo cho User */}
                <RoleGuard role={ROLES.USER}>
                    <div className="dashboard-user-notice">
                        <h3 className="dashboard-notice-title">ℹ️ Thông báo cho User</h3>
                        <p className="dashboard-notice-text">Bạn đang đăng nhập với quyền <strong>USER</strong> - chỉ có quyền xem.</p>
                        <p className="dashboard-notice-text">Để thực hiện các thao tác quản lý, vui lòng liên hệ Admin.</p>
                    </div>
                </RoleGuard>
            </div>
        </div>
    );
};

export default Dashboard;