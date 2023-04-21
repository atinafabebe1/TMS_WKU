import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SparePartRequestingForm from "../../common/sparepart/sparePartrequestForm";
import api from "../../../api/api";

const EditSparePartRequest = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    console.log("id is");
    console.log(id);
    api
      .get(`/Request/sparePart?_id=${id}`)
      .then((response) => {
        console.log(response.data.data[0].rejectReason);
        setRequest(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {request ? (
        ((<p> {request[0].rejectReason}</p>),
        (
          <SparePartRequestingForm
            title={"Edit Request"}
            request={request[0]}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditSparePartRequest;
