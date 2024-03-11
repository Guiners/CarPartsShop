import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../App';
import Address from './address'
const SERVER_URL = 'http://localhost:4000/';

function Order() {

    const { token } = useContext(TokenContext);
    // const { email } = useContext(TokenContext);
    const { order } = useContext(TokenContext);
    const { email } = useContext(TokenContext);
    const { setOrder } = useContext(TokenContext);
    const { setisMainPage } = useContext(TokenContext);
    const { isMainPage } = useContext(TokenContext);
    const { productsList } = useContext(TokenContext);
    const { setProductsList } = useContext(TokenContext);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');
    

    const handleOpenModal = (text) => {
        setModalText(text);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000); 
    };

    const renderProductNames = () => {
        return Object.values(order.products).map(productId => {
            const product = Object.values(productsList).find(item => item._id === productId);
            if (product) {
                return <h2 key={product._id}>{product.name}</h2>;
            }
            return null;
        });
    };

    useEffect(() => {
        renderProductNames();
    }, []);

     const createOrder = async () => {
        try {
            // console.log(order.products)
            // console.log(order.price)
            const response = await axios.post(SERVER_URL + 'order', {
                email: email,
                productsList: order.products,
                address: order.address,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.price);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const getStyles = () => ({
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        heading: {
            fontSize: '2.5em',
            color: '#444',
            marginBottom: '30px',
            cursor: 'pointer',
            textAlign: 'center',
        },
        productList: {
            minWidth: '800px',
            padding: 0,
            listStyle: 'none',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        productItem: {
            minWidth: '800px',
            border: '1px solid #ddd',
            borderRadius: '15px',
            marginBottom: '20px',
            padding: '15px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#f8f8f8',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
            backgroundImage: 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        productDetails: {
            marginLeft: '20px',
        },
        productName: {
            fontSize: '1.8em',
            marginBottom: '10px',
            color: '#333',
            textDecoration: 'none',
        },
        productPrice: {
            fontWeight: 'bold',
            color: '#008000',
        },
        productAvailability: {
            fontStyle: 'italic',
        },
        available: {
            color: 'green',
        },
        unavailable: {
            color: 'red',
        },
        buttonsContainer: {
            display: 'flex',
        },
        button: {
            marginLeft: '10px',
            padding: '10px 15px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#008000',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
    });
    return (
        <div style={getStyles().container}>
            <h1>Ordered items</h1>
            <div>{renderProductNames()}</div>
                <div><Address /></div>
                <button style={getStyles().button} onClick={() => {createOrder();}}>Pay for your order</button>
           
            <h3>{modalText}</h3>
        </div>
    );
}

export default Order;