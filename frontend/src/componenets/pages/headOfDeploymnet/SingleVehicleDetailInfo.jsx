import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleVehicleDetailInfo from "../../common/vehicle/SeeVehicleDetailForm";
import api from "../../../api/api";

const SingleVehicleDetailInfoo = () => {
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
          <SingleVehicleDetailInfo
            title={"Vehicle Detail Information"}
            data={data[0]}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleVehicleDetailInfoo;
