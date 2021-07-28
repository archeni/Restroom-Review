import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addBathroom } from "../../modules/bathroomManager";
import { useHistory } from "react-router-dom";

export const BathroomForm = () => {
  const emptyBathroom = {
    placeName: '',
    address: ''
  };

  const [bathroom, setBathroom] = useState(emptyBathroom);
  const history = useHistory();

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const bathroomCopy = { ...bathroom };

    bathroomCopy[key] = value;
    setBathroom(bathroomCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    addBathroom(bathroom).then((p) => {
      // Navigate the user back to the home route
      history.push("/");
    });
  };

  return (
    <Form>
      <FormGroup>
        <Label for="placeName">Name</Label>
        <Input type="text" name="placeName" id="placeName" placeholder="bathroom name"
          value={bathroom.placeName}
          onChange={handleInputChange} />
        <Label for="address">Name</Label>
        <Input type="text" name="address" id="address" placeholder="bathroom address"
          value={bathroom.address}
          onChange={handleInputChange} />
      </FormGroup>
      <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
    </Form>
  );
};

export default BathroomForm;