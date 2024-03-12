import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../App';

const SERVER_URL = 'http://localhost:4000/';

function AllProductsList() {

    const { token } = useContext(TokenContext);
    const { order } = useContext(TokenContext);
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

    useEffect(() => {
        getProductsList();
    }, []);


    const addProductToOrder = async (id)=> {
        const newProducts = [...order.products, id];

        setOrder(prevState => ({
            ...prevState,
            products: newProducts
        }));
        console.log(order.products)

    };
    
    const changePage = async () => {
        setisMainPage(!isMainPage);
    }

    const renderProductNames = () => {
        return (
            <div>
                <h1>Ordered Items</h1>
                {Object.values(order.products).map(productId => {
                    const product = Object.values(productsList).find(item => item._id === productId);
                    if (product) {
                        return <h2 key={product._id}>{product.name}</h2>;
                    }
                    return null;
                })}
            </div>
        );
    };

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

    const renderProductDetails = () => (
        <div style={getStyles().container}>
            <h2 style={getStyles().heading}>Product Details</h2>
            <div style={getStyles().productItem}>
                <div style={getStyles().productDetails}>
                    <h3 style={getStyles().productName} onClick={() => getProductsList()}>{productsList.name}</h3>
                    <p style={getStyles().productPrice}>Price: ${productsList.price}</p>
                    <p><strong>Car Brand:</strong> {productsList.carBrand}</p>
                    <p><strong>Category:</strong> {productsList.category}</p>
                    <p><strong>Amount:</strong> {productsList.amount}</p>
                    <p><strong>Description:</strong> {productsList.description}</p>
                    <p style={productsList.availability ? getStyles().available : getStyles().unavailable}>Availability: {productsList.availability ? 'Available' : 'Not Available'}</p>
                </div>
                <button style={getStyles().button} onClick={() => { addProductToOrder(productsList._id); handleOpenModal('Added to basket') }}>Add to basket</button>
                {showModal && (
                    <div>
                        <p>{modalText}</p>
                    </div>
                )}
            </div>
        </div>
    );
    
    
    const renderProductList = () => (
        <div style={getStyles().container}>
            <h2 style={getStyles().heading} onClick={getProductsList}>Products List</h2>
            <ul style={getStyles().productList}>
                {productsList.map(product => (
                    <li key={product.id} style={getStyles().productItem}>
                        <div style={getStyles().productDetails}>
                            <h3 style={getStyles().productName} onClick={() => getProductsDetails(product._id)}>{product.name}</h3>
                            <p style={getStyles().productPrice}>Price: ${product.price}</p>
                            <p><strong>Car Brand:</strong> {product.carBrand}</p>
                            <p><strong>Category:</strong> {product.category}</p>
                            <p style={product.availability ? getStyles().available : getStyles().unavailable}>Availability: {product.availability ? 'Available' : 'Not Available'}</p>
                        </div>
                        <button style={getStyles().button} onClick={() => {addProductToOrder(product._id)}}>Add to basket</button>
                
                    </li>
                ))}
            </ul>
        </div>
    );


    return (
        <div style={getStyles().container}>
            <div>
                {renderProductNames()}
                <button style={getStyles().button} onClick={() => { changePage(); }}>Continue Ordering</button>
            </div>
            {Array.isArray(productsList) ? (
                renderProductList()
            ) : (
                renderProductDetails()
            )}
        </div>
    );
}

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
        margin: 0,
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


export default AllProductsList;
