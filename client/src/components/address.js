import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../App';

const SERVER_URL = 'http://localhost:4000/';

function Address() {

    const { token } = useContext(TokenContext);
    const { setOrder } = useContext(TokenContext);
    const [showModel , setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');

    const [address, setAddress] = useState({
        streetName: '',
        apartmentNumber: 0,
        doorNumber: 0,
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

    const createAddress = async () => {
        try {
            const response = await axios.post(SERVER_URL + 'address', {
                streetName: address.streetName,
                apartmentNumber: address.apartmentNumber,
                doorNumber: address.doorNumber,
                postCode: address.postCode,
                city: address.city,
                country: address.country,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            addAddressToOrder(response.data);

        } catch (error) {
            console.error('Error creating address in:', error);
        }
    };

    const getAddress = async (id) => {
        try {
            const response = await axios.get(SERVER_URL + 'address', {
                id,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        
        } catch (error) {
            console.error('Error creating address in:', error);
        }
    };

    const addAddressToOrder = async (newAddress) => {
        setOrder(prevState => ({
            ...prevState,
            address: newAddress
        }));
    };

    const setAddressValue = async (parametr, value) => {

        setAddress(prevState => ({
            ...prevState,
            [parametr]: value
        }));
    }

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setAddressValue(name, value);
    }

      return (
        <div style={getStyle().addressForm}>
          <div style={getStyle().formContainer}>
            <h2 style={getStyle().h2}>Enter Address</h2>
            <input
              type="text"
              name="streetName"
              placeholder="Street Name"
              value={address.streetName}
              onChange={handleInputChange}
              style={getStyle().inputField}
            />
            <input
              type="text"
              name="apartmentNumber"
              placeholder="Apartment Number"
              value={address.apartmentNumber}
              onChange={handleInputChange}
              style={getStyle().inputField}
            />
            <input
              type="text"
              name="doorNumber"
              placeholder="Door Number"
              value={address.doorNumber}
              onChange={handleInputChange}
              style={getStyle().inputField}
            />
            <input
              type="text"
              name="postCode"
              placeholder="Post Code"
              value={address.postCode}
              onChange={handleInputChange}
              style={getStyle().inputField}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleInputChange}
              style={getStyle().inputField}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleInputChange}
              style={getStyle().inputField}
            />
          </div>
          <div>
              <button
                style={getStyle().button}
                onClick={() => {createAddress(); handleOpenModal('Address added ');}}
              >
                Submit Address
              </button>
              <h3 style={getStyle().h3}>{modalText}</h3>
            </div>
        </div>

      );
          
}
const getStyle = () => ({
  addressForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  formContainer: {
    marginTop: '10%',
    width: '800px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
    marginBottom: '2%',
  },
  inputField: {
    marginBottom: '10px',
    width: '300px', 
    height: '40px', 
    padding: '8px', 
  },

  button: {
    marginTop: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    marginTop: '20%',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  h2: {
    marginBottom: '20px',
  },
  h3: {
    marginTop: '20px',
  },
});


export default Address;
