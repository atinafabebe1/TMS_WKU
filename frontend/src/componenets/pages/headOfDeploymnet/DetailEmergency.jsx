import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailEmergencyReport from "../../common/report/detailEmmergency";
import api from "../../../api/api";

const DetailEmmergecy = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

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
          <DetailEmergencyReport
            title={"Edit Emergency Report"}
            data={data[0]}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailEmmergecy;
