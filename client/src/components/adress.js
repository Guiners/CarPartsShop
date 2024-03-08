import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../App';

const SERVER_URL = 'http://localhost:4000/';

function Address() {

    const { token } = useContext(TokenContext);
    // const { email } = useContext(TokenContext);
    const { order } = useContext(TokenContext);
    const { setOrder } = useContext(TokenContext);
    const { setisMainPage } = useContext(TokenContext);
    const { isMainPage } = useContext(TokenContext);
    const { productsList } = useContext(TokenContext);
    const { setProductsList } = useContext(TokenContext);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');

    const [address, setAddress] = useState({
        streetName: '',
        apartmentNumber: '',
        doorNumber: '',
        postCode: '',
        city: '',
        country: ''
    });
    
    const handleOpenModal = (text) => {
        setModalText(text);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000); 
    };
    const getStyles = () => {
        return {
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
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                color: '#fff',
            },
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
    };
    
    const createAddress = async () => {
        try {
            const response = await axios.post(SERVER_URL + 'address/', {
                address,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        
        } catch (error) {
            console.error('Error creating address in:', error);
        }
    };

    const getAddress = async (id) => {
        try {
            const response = await axios.get(SERVER_URL + 'address/', {
                id,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        
        } catch (error) {
            console.error('Error creating address in:', error);
        }
    };


    const setAddressValue = async (parametr, value) => {

        setAddress(prevState => ({
            ...prevState,
            [parametr]: value
        }));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressValue(name, value);
    }

    return (
    <div style={getStyles().container}>
        <h1>Enter Address</h1>
        {/* <button style={getStyles().button} onClick={() => {handleOpenModal('Go to Payment');}}>Submit Address</button> */}
        <div style={getStyles().formLayout}>
            <h2 style={getStyles().heading}>Car Parts</h2>
            <input
                type="text"
                name="streetName"
                placeholder="Street Name"
                value={address.streetName}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="apartmentNumber"
                placeholder="Apartment Number"
                value={address.apartmentNumber}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="doorNumber"
                placeholder="Door Number"
                value={address.doorNumber}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="postCode"
                placeholder="Post Code"
                value={address.postCode}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={handleInputChange}
            />
               
            <button onClick={createAddress} style={{ ...getStyles().button, ...getStyles().loginButton }}>Submit Address</button>
            
        </div>
    </div>
    );
}

export default Address;
