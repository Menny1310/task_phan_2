// Định nghĩa các Role trong hệ thống
export const ROLES = {
    ADMIN: 'admin',
    STAFF: 'staff',
    USER: 'user'
};

// Định nghĩa các Permission
export const PERMISSIONS = {
    // User Management
    VIEW_USERS: 'view_users',
    CREATE_USER: 'create_user',
    EDIT_USER: 'edit_user',
    DELETE_USER: 'delete_user',
    
    // Content Management
    VIEW_CONTENT: 'view_content',
    CREATE_CONTENT: 'create_content',
    EDIT_CONTENT: 'edit_content',
    DELETE_CONTENT: 'delete_content',
    
    // Reports
    VIEW_REPORTS: 'view_reports',
    EXPORT_REPORTS: 'export_reports',
    
    // Settings
    VIEW_SETTINGS: 'view_settings',
    EDIT_SETTINGS: 'edit_settings',
    
    // Tasks
    VIEW_TASKS: 'view_tasks',
    CREATE_TASK: 'create_task',
    EDIT_TASK: 'edit_task',
    DELETE_TASK: 'delete_task',
    APPROVE_TASK: 'approve_task',
};

// Mapping Role -> Permissions
export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: [
        // Admin có toàn quyền
        PERMISSIONS.VIEW_USERS,
        PERMISSIONS.CREATE_USER,
        PERMISSIONS.EDIT_USER,
        PERMISSIONS.DELETE_USER,
        
        PERMISSIONS.VIEW_CONTENT,
        PERMISSIONS.CREATE_CONTENT,
        PERMISSIONS.EDIT_CONTENT,
        PERMISSIONS.DELETE_CONTENT,
        
        PERMISSIONS.VIEW_REPORTS,
        PERMISSIONS.EXPORT_REPORTS,
        
        PERMISSIONS.VIEW_SETTINGS,
        PERMISSIONS.EDIT_SETTINGS,
        
        PERMISSIONS.VIEW_TASKS,
        PERMISSIONS.CREATE_TASK,
        PERMISSIONS.EDIT_TASK,
        PERMISSIONS.DELETE_TASK,
        PERMISSIONS.APPROVE_TASK,
    ],
    
    [ROLES.STAFF]: [
        // Staff có quyền xử lý công việc
        PERMISSIONS.VIEW_USERS, // Chỉ xem
        
        PERMISSIONS.VIEW_CONTENT,
        PERMISSIONS.CREATE_CONTENT,
        PERMISSIONS.EDIT_CONTENT,
        
        PERMISSIONS.VIEW_REPORTS,
        
        PERMISSIONS.VIEW_SETTINGS, // Chỉ xem
        
        PERMISSIONS.VIEW_TASKS,
        PERMISSIONS.CREATE_TASK,
        PERMISSIONS.EDIT_TASK,
    ],
    
    [ROLES.USER]: [
        // User chỉ có quyền cơ bản
        PERMISSIONS.VIEW_CONTENT,
        
        PERMISSIONS.VIEW_TASKS,
    ]
};

export default {
    ROLES,
    PERMISSIONS,
    ROLE_PERMISSIONS
};