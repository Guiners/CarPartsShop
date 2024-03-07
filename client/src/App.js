import React, { useState, useEffect } from 'react';
import { AppProvider } from '@shopify/polaris';
import Login from './components/login';
import TopLayout from './components/topLayout';
import AllProductsList from './components/products';

export const TokenContext = React.createContext(null);

function App() {
    const [token, setToken] = useState('');
    const [email, setEmailState] = useState('');
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }

        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmailState(storedEmail);
        }
    }, []);

    return (
        <AppProvider>
            <TokenContext.Provider value={{ token, setToken, email, setEmailState}}>
                <div>
                    {token ? (
                        <>
                            <TopLayout />
                            <AllProductsList />
                        </>
                    ) : (
                        <Login />
                    )}
                </div>
            </TokenContext.Provider>
        </AppProvider>
    );
}

export default App;