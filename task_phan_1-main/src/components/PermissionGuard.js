import React from 'react';
import { usePermission } from '../hooks/usePermission';

/**
 * Component bảo vệ UI dựa trên permission
 * @param {Object} props
 * @param {string|string[]} props.permission - Permission hoặc mảng permissions cần kiểm tra
 * @param {string} props.requireAll - Nếu true, cần tất cả permissions. Nếu false, cần ít nhất 1 permission
 * @param {ReactNode} props.children - Nội dung sẽ hiển thị nếu có quyền
 * @param {ReactNode} props.fallback - Nội dung hiển thị nếu không có quyền (optional)
 */
const PermissionGuard = ({ 
    permission, 
    requireAll = false, 
    children, 
    fallback = null 
}) => {
    const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission();

    // Nếu permission là mảng
    if (Array.isArray(permission)) {
        const hasAccess = requireAll 
            ? hasAllPermissions(permission)
            : hasAnyPermission(permission);
        
        return hasAccess ? <>{children}</> : <>{fallback}</>;
    }

    // Nếu permission là string
    const hasAccess = hasPermission(permission);
    return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default PermissionGuard;