import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SparePartRequestingForm from "../../common/sparepart/sparePartrequestForm";
import Loading from "../../common/Provider/LoadingProvider";
import api from "../../../api/api";

const EditSparePartRequest = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    api
      .get(`/Request/sparePart?_id=${id}`)
      .then((response) => {
        setRequest(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {request ? (
        <>
          <p>{request[0].rejectReason}</p>
          <SparePartRequestingForm
            title={"Edit Request"}
            request={request[0]}
          />
        </>
      ) : (
        <p>
          <Loading />
        </p>
      )}
    </div>
  );
};

export default EditSparePartRequest;
