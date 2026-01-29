import { useAuth } from '../context/AuthContext';
import { ROLE_PERMISSIONS } from '../constants/roles';

/**
 * Custom hook để kiểm tra quyền của user
 */
export const usePermission = () => {
    const { user } = useAuth();

    /**
     * Kiểm tra xem user có quyền cụ thể không
     * @param {string} permission - Tên quyền cần kiểm tra
     * @returns {boolean}
     */
    const hasPermission = (permission) => {
        if (!user || !user.role) {
            return false;
        }

        const userPermissions = ROLE_PERMISSIONS[user.role] || [];
        return userPermissions.includes(permission);
    };

    /**
     * Kiểm tra xem user có ít nhất một trong các quyền
     * @param {string[]} permissions - Mảng các quyền
     * @returns {boolean}
     */
    const hasAnyPermission = (permissions) => {
        if (!Array.isArray(permissions)) {
            return false;
        }
        return permissions.some(permission => hasPermission(permission));
    };

    /**
     * Kiểm tra xem user có tất cả các quyền
     * @param {string[]} permissions - Mảng các quyền
     * @returns {boolean}
     */
    const hasAllPermissions = (permissions) => {
        if (!Array.isArray(permissions)) {
            return false;
        }
        return permissions.every(permission => hasPermission(permission));
    };

    /**
     * Kiểm tra role của user
     * @param {string} role - Role cần kiểm tra
     * @returns {boolean}
     */
    const hasRole = (role) => {
        if (!user || !user.role) {
            return false;
        }
        return user.role === role;
    };

    /**
     * Kiểm tra có một trong các role
     * @param {string[]} roles - Mảng các role
     * @returns {boolean}
     */
    const hasAnyRole = (roles) => {
        if (!Array.isArray(roles)) {
            return false;
        }
        return roles.some(role => hasRole(role));
    };

    return {
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        hasRole,
        hasAnyRole,
        userRole: user?.role
    };
};

export default usePermission;