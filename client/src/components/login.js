import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button, FormLayout, TextField } from '@shopify/polaris';
import { TokenContext } from '../App';

const SERVER_URL = 'http://localhost:4000/';

function Login() {
    const { setToken } = useContext(TokenContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(SERVER_URL + 'user/login', {
                email: email,
                password: password
            });
            setToken(response.data.token);
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
        <FormLayout>
            <TextField
                type="email"
                label="Email"
                value={email}
                onChange={setEmail}
                autoComplete="off"
            />
            <TextField
                type="password"
                label="Password"
                value={password}
                onChange={setPassword}
            />
            <Button onClick={handleLogin} type="submit" primary>Log in</Button>
            <Button onClick={handleRegister} type="submit" primary>Log in</Button>
        </FormLayout>
    );
}

export default Login;
