import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    // Mock data cho 3 tài khoản với role khác nhau
    const mockAccounts = [
        {
            email: "admin@example.com",
            password: "admin123",
            user: {
                id: 1,
                email: "admin@example.com",
                name: "Nguyễn Văn Admin",
                role: "admin",
                avatar: "👨‍💼"
            }
        },
        {
            email: "staff@example.com",
            password: "staff123",
            user: {
                id: 2,
                email: "staff@example.com",
                name: "Trần Thị Staff",
                role: "staff",
                avatar: "👩‍💻"
            }
        },
        {
            email: "user@example.com",
            password: "user123",
            user: {
                id: 3,
                email: "user@example.com",
                name: "Lê Văn User",
                role: "user",
                avatar: "👤"
            }
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        setTimeout(() => {
            const account = mockAccounts.find(
                acc => acc.email === email && acc.password === password
            );

            if (account) {
                const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(email)}.fake_signature`;
                login(account.user, mockToken);
                setLoading(false);
                navigate('/dashboard');
            } else {
                setError("Email hoặc mật khẩu không đúng!");
                setLoading(false);
            }
        }, 1000);
        
        /* 
        // Code thật khi có API backend:
        try {
            const response = await axiosInstance.post('/auth/login', {
                email,
                password
            });
            
            login(response.data.user, response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại!');
        } finally {
            setLoading(false);
        }
        */
    };

    const quickLogin = (accountEmail, accountPassword) => {
        setEmail(accountEmail);
        setPassword(accountPassword);
    };

    return (
        <div className="login-page-container">
            <div className="login-page-box">
                <h2 className="login-page-title">Đăng nhập</h2>
                
                <form onSubmit={handleSubmit} className="login-page-form">
                    <div className="login-form-group">
                        <label className="login-form-label">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Nhập email của bạn"
                            className="login-form-input"
                        />
                    </div>
                    
                    <div className="login-form-group">
                        <label className="login-form-label">Mật khẩu:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Nhập mật khẩu"
                            className="login-form-input"
                        />
                    </div>

                    {error && <div className="login-error-message">{error}</div>}

                    <button type="submit" disabled={loading} className="login-submit-btn">
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>

                    <div className="login-test-accounts">
                        <p className="login-test-title">
                            🔐 Tài khoản test (Click để điền nhanh)
                        </p>
                        
                        <div 
                            className="login-account-card login-card-admin" 
                            onClick={() => quickLogin("admin@example.com", "admin123")}
                        >
                            <div className="login-card-emoji">👨‍💼</div>
                            <div className="login-card-role">ADMIN</div>
                            <div className="login-card-credentials">admin@example.com / admin123</div>
                            <div className="login-card-description">✅ Toàn quyền quản trị</div>
                        </div>

                        <div 
                            className="login-account-card login-card-staff"
                            onClick={() => quickLogin("staff@example.com", "staff123")}
                        >
                            <div className="login-card-emoji">👩‍💻</div>
                            <div className="login-card-role">STAFF</div>
                            <div className="login-card-credentials">staff@example.com / staff123</div>
                            <div className="login-card-description">⚡ Xử lý công việc</div>
                        </div>

                        <div 
                            className="login-account-card login-card-user"
                            onClick={() => quickLogin("user@example.com", "user123")}
                        >
                            <div className="login-card-emoji">👤</div>
                            <div className="login-card-role">USER</div>
                            <div className="login-card-credentials">user@example.com / user123</div>
                            <div className="login-card-description">👁️ Chỉ xem</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}