import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VehicleRegistrationForm from "../../common/vehicle/vehicleRegistrationForm";
import AssignVehicleForm from "./AssignVehicleForm";
import api from "../../../api/api";

const AssignVehicle = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get(`/Vehiclerecord?_id=${id}`)
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
          <p>{data[0].rejectReason}</p>
          <AssignVehicleForm title={"Edit Request"} data={data[0]} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AssignVehicle;
