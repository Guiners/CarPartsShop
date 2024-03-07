import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DescriptionList } from '@shopify/polaris';
import { TokenContext } from '../App';

const SERVER_URL = 'http://localhost:4000/';

function AllProductsList() {
    const { token } = useContext(TokenContext);
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

    return (
        <div>
            <h2>Products List</h2>
            <ul>
                {productsList.map(product => (
                    <li key={product.id} style={styles.productItem}>
                        <div style={styles.productDetails}>
                            <h3>{product.name}</h3>
                            <p><strong>Price:</strong> ${product.price}</p>
                            <p><strong>Car Brand:</strong> {product.carBrand}</p>
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Amount:</strong> {product.amount}</p>
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Availability:</strong> {product.availability ? 'Available' : 'Not Available'}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    productItem: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '10px',
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    productDetails: {
        marginLeft: '20px',
    }
};

export default AllProductsList;
