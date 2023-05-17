import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateEmergencyReport from "../../common/report/createEmmergencyReport";
import api from "../../../api/api";

const EditEmergencyReport = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get(`/EmergencyReport?_id=${id}`)
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
          <CreateEmergencyReport title={"Edit Report"} data={data[0]} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditEmergencyReport;
