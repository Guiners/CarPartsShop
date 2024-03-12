import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../App';
import Address from './address'
const SERVER_URL = 'http://localhost:4000/';

function Order() {

    const { token } = useContext(TokenContext);
    const { order } = useContext(TokenContext);
    const { email } = useContext(TokenContext);
    const { setOrder } = useContext(TokenContext);
    const { isPaid } = useContext(TokenContext);
    const { setIsPaid } = useContext(TokenContext);
    const { productsList } = useContext(TokenContext);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');
    const [isOrderCreated, setIsOrderCreated] = useState(Boolean);


    const handleOpenModal = (text) => {
        setModalText(text);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000); 
    };

    // const renderProductNames = () => {
    //     return (
    //       <div>
    //         <h1>Ordered Items</h1>
    //         {Object.values(order.products).map(productId => {
    //           const product = Object.values(productsList).find(item => item._id === productId);
    //           if (product) {
    //             return <h2 key={product._id} style={getStyle().orderedItem}>{product.name}</h2>;
    //           }
    //           return null;
    //         })}
    //       </div>
    //     );
    //   };

    const renderProductNames = () => {
      return (
        <div style={getStyle().containerRender}>
          <h1>Ordered Items</h1>
          <div style={getStyle().productList}>
            {Object.values(order.products).map(productId => {
              const product = Object.values(productsList).find(item => item._id === productId);
              if (product) {
                return (
                  <div key={product._id} style={getStyle().productItem}>
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
    

    useEffect(() => {
        renderProductNames();

    }, []);

     const createOrder = async () => {
        try {
            
            const response = await axios.post(SERVER_URL + 'order', {
                email: email,
                productsList: order.products,
                address: order.address,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setOrder(prevState => ({
                ...prevState,
                id: response.data._id,
                price: response.data.price
            }))
            setIsOrderCreated(true)
            setIsPaid(false)

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const realizeOrder = async () => {
        try {
            const response = await axios.post(SERVER_URL + 'order/realizeOrder', {
                id: order.id,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIsPaid(true);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

return (
  <div style={getStyle().container}>
    {isOrderCreated ? (
      <div style={getStyle().orderContainer}>
        {isPaid ? (
          <div style={getStyle().orderPaid}>
            <h2>Order Paid</h2>
            <h2>Thanks for shopping</h2>
          </div>
        ) : (
          <div style={getStyle().orderPaid}>
            <h2>Price To Pay</h2>
            <h3>{`$ ${order.price}`}</h3>
            <button style={getStyle().createOrderButton} onClick={realizeOrder}>Pay for order</button>
          </div>
        )}
      </div>
    ) : (
      <div style={getStyle().orderedItemsAndAddress}>
        {renderProductNames()}
        <Address />
        <button style={getStyle().createOrderButton} onClick={createOrder}>Create Order</button>
      </div>
    )}

    <h3>{modalText}</h3>
  </div>
);
   
}
const getStyle = () => ({
  productName: {
    fontSize: '1.8em',
    marginBottom: '10px',
    color: '#333',
    textDecoration: 'none',
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
  containerRender: {
    marginTop: '60%',
    marginBottom: '-50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70vh',
  },
  orderedItemsContainer: {
    marginBottom: '-15%',
    marginTop: '25%', 
    textAlign: 'center',
    marginBottom: '20px',
  },
  orderedItemsContainer1 : {
    marginBottom: '-5%',
    marginTop: '90%', 
    textAlign: 'center',
    marginBottom: '-70%',
  },
  orderPaid: {
    marginBottom: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  createOrderButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '-40%',
    marginBottom: '10px',
  },
  createOrderButtonHover: {
    backgroundColor: '#0056b3',
  },
  orderedItemsAndAddress: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  orderedItem: { 
    margin: '5px 0',
    textAlign: 'center',
  },
});


export default Order;