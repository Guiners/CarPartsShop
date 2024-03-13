import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../App';

const SERVER_URL = 'http://localhost:4000/';

function AllProductsList() {

    const { token, order, setOrder, setisMainPage, isMainPage, productsList, setProductsList, filters } = useContext(TokenContext);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    const handleOpenModal = (text) => {
        setModalText(text);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000); 
    };

    useEffect(() => {
         getProducts().then((result) => {
          setFilteredItems(result)
          setProductsList(result)
        })
    }, []);

    useEffect(() => {
        const filteredProducts = filterProductsByCarBrand(filters.carBrand);
        setFilteredItems(filteredProducts)

    }, [filters]);

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
        <div style={getStyle().container}>
          <h1>Items in Cart</h1>
          <div style={getStyle().productList}>
            {Object.values(order.products).map(productId => {
              const product = Object.values(productsList).find(item => item._id === productId);
              if (product) {
                return (
                  <div key={product._id} style={getStyle().productItem} onClick={() => getProductsDetails(product._id)}>
                    <h2 style={getStyle().productName}>{product.name}</h2>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      );
    };
    
    
    const filterProductsByCarBrand = () => {
      if(!filters.carBrand) {
        console.log(productsList)
        return productsList;
      }

      const filteredProducts = productsList.filter((product) => {
        return product.carBrand === filters.carBrand //&& product.category === filters.category && product.availability === filters.availability
      })
      
      // if filters.map((filter) => filter.carBrand).includes(product.carBrand)
      // filter = {carBrand, availability}
      return filteredProducts;
    }
    // const filterProductsByPrice = (price) => {
    //   const filteredProducts = productsList.filter((product) => {
    //     return product.price === price;
    //   })

    //   setProductsList(filteredProducts)
    // }

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
    
    const getProducts = async () => {
      try {
        const response = await axios.get(SERVER_URL + 'products/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        console.error('Error fetching products:', error);
    }
    }

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
        <div style={getStyle().container}>
            <h2 style={getStyle().heading}>Product Details</h2>
            <div style={getStyle().productItem}>
                <div style={getStyle().productDetails}>
                    <h3 style={getStyle().productName} onClick={() => getProductsList()}>{productsList.name}</h3>
                    <p style={getStyle().productPrice}>Price: ${productsList.price}</p>
                    <p><strong>Car Brand:</strong> {productsList.carBrand}</p>
                    <p><strong>Category:</strong> {productsList.category}</p>
                    <p><strong>Amount:</strong> {productsList.amount}</p>
                    <p><strong>Description:</strong> {productsList.description}</p>
                    <p style={productsList.availability ? getStyle().available : getStyle().unavailable}>Availability: {productsList.availability ? 'Available' : 'Not Available'}</p>
                </div>
                {productsList.availability ? (
                  <div>
                    <button style={getStyle().button} onClick={() => { addProductToOrder(productsList._id); handleOpenModal('Added to basket') }}>Add to basket</button>
                    {showModal && (
                    <div>
                      <p>{modalText}</p>
                    </div>
                    )}
                  </div>
                ) : null}
            </div>
        </div>
    );
    
    
    const renderProductList = () => (
        <div style={getStyle().container}>
            <h2 style={getStyle().heading} onClick={getProductsList}>Products List</h2>
            <ul style={getStyle().productList}>
                {filteredItems.map(product => (
                    <li key={product._id} style={getStyle().productItem}>
                        <div style={getStyle().productDetails}>
                            <h3 style={getStyle().productName} onClick={() => getProductsDetails(product._id)}>{product.name}</h3>
                            <p style={getStyle().productPrice}>Price: ${product.price}</p>
                            <p><strong>Car Brand:</strong> {product.carBrand}</p>
                            <p><strong>Category:</strong> {product.category}</p>
                            <p style={product.availability ? getStyle().available : getStyle().unavailable}>Availability: {product.availability ? 'Available' : 'Not Available'}</p>
                        </div>
                        {product.availability ? (
                  <div>
                    <button style={getStyle().button} onClick={() => { addProductToOrder(product._id); handleOpenModal('Added to basket') }}>Add to basket</button>
                    {showModal && (
                    <div>
                      <p>{modalText}</p>
                    </div>
                    )}
                  </div>
                ) : null}
                    </li>
                ))}
            </ul>
        </div>
    );


    return (
        <div style={getStyle().container}>
          {Array.isArray(productsList) ? (
            <div>
             {renderProductNames()}
             <button style={getStyle().buttonOrdering} onClick={() => { changePage(); }}>Go To Your Order</button>
              {renderProductList()}
            </div>
          ) : (
            renderProductDetails()
          )}
        </div>
      );
}

const getStyle = () => ({
    orderedItem: { 
      margin: '5px 0',
      textAlign: 'center',
    },
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
    button: {
      padding: '10px 15px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#008000',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      textAlign: 'center',
    },
    buttonOrdering: {
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#008000',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        textAlign: 'center',
        marginTop: '10px',
        marginLeft: '42%',
      },
  });


export default AllProductsList;
