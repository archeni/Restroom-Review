import React, { useEffect, useState } from "react";
import Bathroom from './Bathroom';
import { getAllBathrooms, Search } from "../../modules/bathroomManager";
import { Link } from "react-router-dom";

const BathroomList = () => {
  const [bathrooms, setBathrooms] = useState([]);

  const getBathrooms = () => {
    getAllBathrooms().then(bathrooms => setBathrooms(bathrooms));
  };

  const searchBathrooms = (event) => {
    event.preventDefault();
    let bathroomInput = event.target.value;
    let searchMatch = {};
    searchMatch[event.target.id] = bathroomInput;
    Search(bathroomInput, true).then(bathrooms => setBathrooms(bathrooms))
  };

  useEffect(() => {
    getBathrooms();
  }, []);

  return (
    <>
      <h3>Bathrooms:</h3>
      <Link to='/add'>Add a Bathroom</Link>
      <form className='bathroomForm'>
        <input placeholder='Search' onChange={searchBathrooms}></input>
      </form>
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