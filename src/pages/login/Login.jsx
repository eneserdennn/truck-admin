// LoginPage.js

import React, {useState} from 'react';
import axios from 'axios';
import './login.scss';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://truckapi.eneserden.com/api/auth/login', {
                username,
                password
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/'); // Ana sayfaya yönlendirme

        } catch (error) {
            console.log('Error ========>', error);
            console.log('Error ========>', error.response);
        }
    };

    return (
        <div className="login-page">
            <h2>Giriş Yap</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Şifre:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    );
};

export default Login;
