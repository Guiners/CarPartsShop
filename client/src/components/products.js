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
            const response = await axios.get(SERVER_URL + 'product/', {
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
            <DescriptionList
                items={productsList.map(product => ({
                    term: product.name,
                    description: product.description
                }))}
            />
        </div>
    );
}

export default AllProductsList;
