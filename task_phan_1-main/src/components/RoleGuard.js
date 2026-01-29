import React from 'react';
import { usePermission } from '../hooks/usePermission';

/**
 * Component bảo vệ UI dựa trên role
 * @param {Object} props
 * @param {string|string[]} props.role - Role hoặc mảng roles cần kiểm tra
 * @param {ReactNode} props.children - Nội dung sẽ hiển thị nếu có role
 * @param {ReactNode} props.fallback - Nội dung hiển thị nếu không có role (optional)
 */
const RoleGuard = ({ role, children, fallback = null }) => {
    const { hasRole, hasAnyRole } = usePermission();

    // Nếu role là mảng
    if (Array.isArray(role)) {
        const hasAccess = hasAnyRole(role);
        return hasAccess ? <>{children}</> : <>{fallback}</>;
    }

    // Nếu role là string
    const hasAccess = hasRole(role);
    return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default RoleGuard;