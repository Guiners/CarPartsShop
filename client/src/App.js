import React, { useState, useEffect } from 'react';
import { AppProvider } from '@shopify/polaris';
import Login from './components/login';
import TopLayout from './components/topLayout';
import AllProductsList from './components/products';
import Order from './components/order';


export const TokenContext = React.createContext(null);

function App() {
    const [token, setToken] = useState('');
    const [email, setEmailState] = useState('');
    const [order, setOrder] = useState({
            email: email,
            products: [],
            price: 0,
            date: "",
            address: "",
            realized: false
        });;

    const [isMainPage, setisMainPage] = useState(true);
    const [productsList, setProductsList] = useState([]);


    useEffect(() => {
        const storedProductsList = localStorage.getItem('productsList');
        if (storedProductsList) {
            setProductsList(storedProductsList);
        }
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        } else {
            setToken('')
        }

        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmailState(storedEmail);
        }

        const storedOrder = localStorage.getItem('order');
        if (storedOrder) {
            setOrder(storedOrder);
        }

        const storedisMainPage= localStorage.getItem('isMainPage');
        if (storedisMainPage) {
            setisMainPage(storedisMainPage);
        }
    }, []);

    return (
        <AppProvider>
            <TokenContext.Provider value={{ token, setToken, email, setEmailState, isMainPage, setisMainPage, order, setOrder , isMainPage, setisMainPage, productsList, setProductsList}}>
                <div>
                    {token ? (
                        <>
                            <TopLayout />
                            {isMainPage ? (
                                <AllProductsList />
                            ) : (
                                <Order />
                                )}
                        </>
                    ) : (
                        <>
                            <Login />
                        </>
                    )}
                </div>
            </TokenContext.Provider>
        </AppProvider>
    );
}

export default App;