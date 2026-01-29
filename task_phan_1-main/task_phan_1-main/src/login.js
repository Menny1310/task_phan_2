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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Giả lập API call (sau này thay bằng API thật)
        setTimeout(() => {
            // Kiểm tra đơn giản
            if (email === "test@gmail.com" && password === "123456") {
                const mockData = {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake_jwt_token",
                    user: {
                        id: 1,
                        email: email,
                        name: "Nguyễn Văn A"
                    }
                };

                // Lưu thông tin đăng nhập vào context
                login(mockData.user, mockData.token);
                
                setLoading(false);
                
                // Chuyển đến trang dashboard
                navigate('/dashboard');
            } else {
                setError("Email hoặc mật khẩu không đúng!");
                setLoading(false);
            }
        }, 1500);

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

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Nhập email của bạn"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Mật khẩu:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>

                    <div className="hint" style={{ marginTop: '20px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
                        <p><strong>Thông tin đăng nhập test:</strong></p>
                        <p>Email: test@gmail.com</p>
                        <p>Password: 123456</p>
                    </div>
                </form>
            </div>
        </div>
    );
}