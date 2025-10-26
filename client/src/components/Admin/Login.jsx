import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from 'react-hot-toast';

// --- CONSTANTS ---
const PRIMARY_COLOR = "#4F46E5";
const BORDER_GRAY = "#D1D5DB";
const SHADOW_LIGHT = "0 10px 15px -3px rgba(79, 70, 229, 0.1), 0 4px 6px -2px rgba(79, 70, 229, 0.05)"; 

const Login = () => {
    const { axios, setToken, navigate } = useAppContext(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // <-- toggle state

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/admin/login', { email, password });
            
            if (data.success) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                localStorage.setItem('adminAuth', true);
                axios.defaults.headers.common['Authorization'] = data.token;
                toast.success("Login successful!");
                navigate('/admin');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An unknown error occurred during login.";
            toast.error(errorMessage);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#F9FAFB' }}>
            <div 
                style={{
                    width: '100%',
                    maxWidth: '24rem',
                    padding: '2rem',
                    border: `1px solid ${PRIMARY_COLOR}4D`,
                    boxShadow: SHADOW_LIGHT, 
                    borderRadius: '0.5rem',
                    backgroundColor: '#fff',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '0 0 2rem 0', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '700' }}>
                        <span style={{ color: PRIMARY_COLOR }}>Admin</span> Login
                    </h1>
                    <p style={{ fontWeight: '300', marginTop: '0.5rem', color: '#6B7280' }}>
                        Enter your credentials to access the admin panel.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Email Input */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="your email id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                border: 'none',
                                borderBottom: `2px solid ${BORDER_GRAY}`,
                                padding: '0.5rem 0',
                                outline: 'none',
                                transition: 'border-color 0.15s',
                                fontSize: '1rem',
                                color: '#1F2937'
                            }}
                        />
                    </div>

                    {/* Password Input WITH EYE ICON */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Password</label>

                        {/* wrapper to position eye icon */}
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                required
                                placeholder="your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    border: 'none',
                                    borderBottom: `2px solid ${BORDER_GRAY}`,
                                    padding: '0.5rem 2.5rem 0.5rem 0', // leave space on the right for eye
                                    outline: 'none',
                                    transition: 'border-color 0.15s',
                                    fontSize: '1rem',
                                    color: '#1F2937',
                                    width: '100%',
                                }}
                            />

                            {/* Eye button (absolute, minimal, accessible) */}
                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword(prev => !prev)}
                                style={{
                                    position: 'absolute',
                                    right: '0', // aligns with input visual end
                                    background: 'transparent',
                                    border: 'none',
                                    padding: '0.35rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* Inline SVG: switches between eye / eye-off */}
                                {showPassword ? (
                                    // eye-off icon
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.02-2.66 2.99-4.88 5.47-6.24" />
                                        <path d="M1 1l22 22" />
                                        <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12" />
                                    </svg>
                                ) : (
                                    // eye icon
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{ 
                            width: '100%', 
                            padding: '0.5rem 1rem',
                            backgroundColor: PRIMARY_COLOR,
                            color: '#FFF',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            border: 'none',
                            fontWeight: '600',
                            marginTop: '1rem' 
                        }}
                    >
                        Login
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;
