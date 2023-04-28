import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DailyFuelRegistrationForm from "../../common/fuel/DailyFuelRegistrationForm";
import api from "../../../api/api";

const EditFuelRecord = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get(`/Report/daily-fuel-costs/?_id=${id}`)
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
          <DailyFuelRegistrationForm
            title={"Edit Fuel Record"}
            data={data[0]}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditFuelRecord;
