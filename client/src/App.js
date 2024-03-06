import React, { useEffect, useState } from 'react';

function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/home").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data.products)
      }
    ).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <div>
      {(backendData.length === 0) ? (
        <p>Loading...</p>
      ):(
        backendData.map((product, i) => (
          <p key={i}>{product}</p>
        ))
      )}
    </div>
  );
}

export default App;
