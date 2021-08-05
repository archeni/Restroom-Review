import React, { useEffect, useState } from "react";
import Bathroom from './Bathroom';
import { getAllBathrooms, Search } from "../../modules/bathroomManager";
import { useHistory } from "react-router-dom";
import { getUserProfileId } from "../../modules/userProfileManager";
import { Button } from 'reactstrap';
import './Bathroom.css';

const BathroomList = () => {
  const [bathrooms, setBathrooms] = useState([]);
  const [currentUser, setUser] = useState([]);
  const history = useHistory();

  const getBathrooms = () => {
    getAllBathrooms().then(bathroom => setBathrooms(bathroom));
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

  const handleAddBathroom = () => {
    history.push('/add');
  }

  useEffect(() => {
    getBathrooms();
    getUser();
  }, []);

  return (
    <>
      <section className='bathroomHeader'>
        <h3>Bathrooms:</h3>
        <Button className="btn btn-primary" onClick={handleAddBathroom}>Add a Bathroom</Button>
        <form className='bathroomForm'>
          <input placeholder='Search' onChange={searchBathrooms}></input>
        </form>
      </section>
      <div className="container">
        <div className="bathroomList row justify-content-center">
          {bathrooms.map((bathroom) => {
            return <Bathroom bathroom={bathroom} key={bathroom.id} user={currentUser} />
          })}
        </div>
      </div>
    </>
  );
};

export default BathroomList;