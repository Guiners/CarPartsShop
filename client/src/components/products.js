import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../App';

const SERVER_URL = 'http://localhost:4000/';

function AllProductsList() {
    const { token } = useContext(TokenContext);
    const { email } = useContext(TokenContext);
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        getProductsList();
    }, []);

    const getProductsList = async () => {
        try {
            const response = await axios.get(SERVER_URL + 'products/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProductsList(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const getProductsDetails = async (id) => {
        try {
            const response = await axios.get(SERVER_URL + 'products/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProductsList(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
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
    });

    return (
        <div style={getStyles().container}>
            {Array.isArray(productsList) ? (
                <div style={getStyles().container}>
                    <h2 style={getStyles().heading} onClick={getProductsList}>Products List</h2>
                    <ul style={getStyles().productList}>
                        {productsList.map(product => (
                            <li key={product.id} style={getStyles().productItem}>
                                <div style={getStyles().productDetails} onClick={() => getProductsDetails(product._id)}>
                                    <h3 style={getStyles().productName}>{product.name}</h3>
                                    <p style={getStyles().productPrice}>Price: ${product.price}</p>
                                    <p><strong>Car Brand:</strong> {product.carBrand}</p>
                                    <p><strong>Category:</strong> {product.category}</p>
                                    <p style={product.availability ? getStyles().available : getStyles().unavailable}>Availability: {product.availability ? 'Available' : 'Not Available'}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div style={getStyles().container}>
                    <h2 style={getStyles().heading} onClick={getProductsList}>Get back to Products List</h2>
                    <ul style={getStyles().productList}></ul>
                    <li key={productsList.id} style={getStyles().productItem}>
                        <div style={getStyles().productDetails}>
                            <h3 style={getStyles().productName}>{productsList.name}</h3>
                            <p style={getStyles().productPrice}>Price: ${productsList.price}</p>
                            <p><strong>Car Brand:</strong> {productsList.carBrand}</p>
                            <p><strong>Category:</strong> {productsList.category}</p>
                            <p><strong>Amount:</strong> {productsList.amount}</p>
                            <p><strong>Description:</strong> {productsList.description}</p>
                            <p style={productsList.availability ? getStyles().available : getStyles().unavailable}>Availability: {productsList.availability ? 'Available' : 'Not Available'}</p>
                        </div>
                    </li>
                </div>
            )}
        </div>
    );
}
export default AllProductsList;
