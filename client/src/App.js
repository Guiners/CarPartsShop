import React, { useState, useEffect } from 'react';
import { AppProvider } from '@shopify/polaris';
import Login from './components/login';
import AllProductsList from './components/products';

export const TokenContext = React.createContext(null);

function App() {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    
    useEffect(() => {
    }, [token]);

    return (
        <AppProvider>
            <TokenContext.Provider value={{ token, setToken}}>
                <div>
                    {token ? <AllProductsList /> : <Login />}
                </div>
            </TokenContext.Provider>
        </AppProvider>
    );
}

export default App;
