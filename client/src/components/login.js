import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { TokenContext } from '../App';

const SERVER_URL = 'http://localhost:4000/';

function Login() {
    const { setToken } = useContext(TokenContext);
    const { setEmailState } = useContext(TokenContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(SERVER_URL + 'user/login', {
                email: email,
                password: password
            });

            setToken(response.data.token);
            setEmailState(email);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email);
        
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleRegister = async () => {
      try {
        const response = await axios.post(SERVER_URL+'user/register', {
          email: email,
          password: password
        });

        console.log(response.data);
      } catch (error) {
          console.error('Error registering:', error);
      }
    };

    return (
        <div style={styles.formLayout}>
            <h2 style={{ fontSize: '2.5em', color: '#444', marginBottom: '30px' }}>Car Parts</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="off"
                style={{ ...styles.textField, marginTop: '20px' }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={styles.textField}
            />
            <button onClick={handleLogin} style={{ ...styles.button, ...styles.loginButton }}>Log in</button>
            <button onClick={handleRegister} style={{ ...styles.button, ...styles.registerButton }}>Register</button>
        </div>
    );
}

const styles = {
    formLayout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '0 20px',
    },
    textField: {
        marginBottom: '20px',
        width: '100%',
        padding: '10px',
        fontSize: '1em',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        width: '100%',
        marginBottom: '10px',
        padding: '15px',
        fontSize: '1em',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.1s ease, box-shadow 0.3s ease',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
        color: '#fff',
    },
    loginButton: {
        background: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
    },
    registerButton: {
        background: 'linear-gradient(to right, #42e695, #3bb2b8)',
    },
    buttonHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

export default Login;