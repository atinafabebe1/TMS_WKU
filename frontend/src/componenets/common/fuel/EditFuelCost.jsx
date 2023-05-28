import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FuelCost from "./RegisterFuelCost";
import api from "../../../api/api";

const EditFuelCost = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get(`/Resources?_id=${id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {data ? (
        <>
          <FuelCost title={"Edit Fuel"} data={data[0]} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditFuelCost;
