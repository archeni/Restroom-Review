import React, { useEffect, useState } from "react";
import Bathroom from './Bathroom';
import { getAllBathrooms, Search } from "../../modules/bathroomManager";
import { Link } from "react-router-dom";
import { getUserProfileId } from "../../modules/userProfileManager";
import './Bathroom.css';

const BathroomList = () => {
  const [bathrooms, setBathrooms] = useState([]);
  const [currentUser, setUser] = useState([]);

  const getBathrooms = () => {
    getAllBathrooms().then(bathrooms => setBathrooms(bathrooms));
  };

  const getUser = () => {
    getUserProfileId().then(oneUser => setUser(oneUser.id));
  }

  const searchBathrooms = (event) => {
    event.preventDefault();
    let bathroomInput = event.target.value;
    let searchMatch = {};
    searchMatch[event.target.id] = bathroomInput;
    Search(bathroomInput, true).then(bathrooms => setBathrooms(bathrooms))
  };

  useEffect(() => {
    getBathrooms();
    getUser();
  }, []);

  return (
    <>
      <section className='bathroomHeader'>
        <h3>Bathrooms:</h3>
        <Link to='/add'>Add a Bathroom</Link>
        <form className='bathroomForm'>
          <input placeholder='Search' onChange={searchBathrooms}></input>
        </form>
      </section>
      <div className="container">
        <div className="row justify-content-center">
          {bathrooms.map((bathroom) => {
            return <Bathroom bathroom={bathroom} key={bathroom.id} user={currentUser} />
          })}
        </div>
      </div>
    </>
  );
};

export default BathroomList;