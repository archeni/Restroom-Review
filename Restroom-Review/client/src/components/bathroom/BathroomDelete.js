import React, { useEffect, useState } from "react";
import { deleteBathroom, getBathroomById } from "../../modules/bathroomManager";
import { Link, useParams, useHistory } from "react-router-dom";

export const BathroomDelete = () => {
  const [singleBathroom, setBathroom] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const getBathroom = (id) => {
    getBathroomById(id).then(oneBathroom => setBathroom(oneBathroom));
    setIsLoading(false);
  }

  const DeleteSingleBathroom = (e) => {
    e.preventDefault();
    setIsLoading(true);

    deleteBathroom(singleBathroom.id)
      .then(() => history.push('/'))
  }

  useEffect(() => {
    getBathroom(id);
  })

  return (
    <>
      <h3>{singleBathroom.placeName}</h3>
      <button
        type="button" disabled={isLoading}
        onClick={DeleteSingleBathroom}
        className="btn btn-primary"
      >Delete Bathroom</button>
      <Link to={"/"}>
        <button>Back</button>
      </Link>
    </>
  );
}

export default BathroomDelete;