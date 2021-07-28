import React, { useEffect, useState } from "react";
import Bathroom from './Bathroom';
import { getAllBathrooms } from "../../modules/bathroomManager";
import { Link } from "react-router-dom";

const BathroomList = () => {
  const [bathrooms, setBathrooms] = useState([]);

  const getBathrooms = () => {
    getAllBathrooms().then(bathrooms => setBathrooms(bathrooms));
  };

  useEffect(() => {
    getBathrooms();
  }, []);

  return (
    <>
      <h3>Bathrooms:</h3>
      <Link to='Bathroom/add'>Add a Bathroom</Link>
      <div className="container">
        <div className="row justify-content-center">
          {bathrooms.map((bathroom) => {
            return <Bathroom bathroom={bathroom} key={bathroom.id} />
          })}
        </div>
      </div>
    </>
  );
};

export default BathroomList;