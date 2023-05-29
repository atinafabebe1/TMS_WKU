import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorProvider from "../../common/Provider/ErrorProvider";
import SuccessProvider from "../../common/Provider/SuccessProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Loading from "../../common/Provider/LoadingProvider";
import {
  Table,
  Button,
  Row,
  Form,
  Col,
  Modal,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import api from "../../../api/api";

const MaintenanceRequestPage = ({ filter }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [requests, setRequests] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [kilometerOnCounter,setKilometerOncounter]=useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading]=useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [kilometerError, setKilometerError] = useState("");



  useEffect(() => {
    // Fetch the user's vehicle requests from your server API
    api
      .get(`/Request/maintenance?user=${user.id}`)
      .then((response) => {
        console.log(response.data.data);
        setRequests(response.data.data);
        setIsLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching vehicle requests:", error)
      );
  }, []);
  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 7, requests.length - 7));
  };
  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = requests.filter((request) => {
    if (filter === "all") {
      return true;
    } else {
      return request.status.toLowerCase() === filter;
    }
  }).filter((request) => {
    return request.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleModalClose = () => {
    setShowEditModal(false);
    setShowModal(false);
    setSelectedRequest(null);
  };
  const handleMore = (request) => {
    setSelectedRequest(request);
    if (request.status === "canceled") {
      setShowModal(false); // Close the existing modal
      const reason = request.rejectReason || "No reason provided";
      // Set the selected request with the rejection reason
      setSelectedRequest({ ...request, reason });
      setShowModal(true); // Reopen the modal with the rejection reason
    } else {
      setShowModal(true);
    }
  };


  const handleShowEditModal = (id) => {
    const request = requests.find((request) => request._id === id);
    setSelectedRequest(request);
    setKilometerOncounter(request?.kilometerOnCounter || null);
    setShowModal(false);
    if (request.status === "canceled") {
      setShowModal(false); // Close the existing modal
      const reason = request.rejectReason || "No reason provided";
      // Set the selected request with the rejection reason
      setSelectedRequest({ ...request, reason });
      setShowEditModal(true); // Reopen the modal with the rejection reason
    } else {
      setShowEditModal(true);
    }
    
  };
  
  const handleEditRequest = async (selectedRequest) => {
    try {
      if (selectedRequest.kilometerOnCounter < 0) {
        setError("Kilometer On Counter cannot be negative.");
        return;
      }
  
      const updatedRequest = {
        plateNumber: selectedRequest?.plateNumber,
        kilometerOnCounter: selectedRequest?.kilometerOnCounter || null,
        description: selectedRequest?.description,
      };
  
      await api.put(`/Request/maintenance/${selectedRequest._id}`, updatedRequest);
      await api.patch(`/Request/maintenance/${selectedRequest._id}`, {
        status: "pending",
      });
  
      const response = await api.get(`/Request/maintenance?user=${user.id}`);
      setRequests(response.data.data);
      setShowEditModal(false);
      setSuccess("Maintenance request successfully updated.");
      setTimeout(() => {
        navigate("/driver/request/maintenance"); // Navigate to the desired page after 6 seconds
      }, 6000);
    } catch (error) {
      console.error(
        `Error editing Maintenance request with ID ${selectedRequest._id}:`,
        error
      );
    }
  };
  
  
  

  return (
    <div className="p-4">
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search by plate number"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
        {error && <ErrorProvider error={error} />}
        {success && <SuccessProvider success={success} />}
      </Form>
      {isLoading && <Loading/>}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr className="form-control-custom">
            <th>Plate Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="form-control-custom">
          {filteredRequests.slice(startIndex, startIndex + 7).map((request) => (
            <tr key={request._id}>
              <td>{request.plateNumber}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "canceled" && (
                          <Button
                          className="btn btn-sm"
                          variant="primary"
                          onClick={() => handleShowEditModal(request._id)}
                          // onClick={() =>
                          //   window.location.replace(
                          //     `/driver/maintenance-request-form?_id=${request._id}`
                          //   )
                          // }
                        >
                          Resubmit
                        </Button>
                      )}
                {request.status === "approved" && (
                  <Button className="btn btn-sm" variant="success" disabled>
                    Approved
                  </Button>
                )}
                {request.status === "pending" && (
                  
                    <Button
                      className="btn btn-sm"
                      variant="primary"
                      onClick={() => handleShowEditModal(request._id)}
                     
                      // onClick={() =>
                      //   window.location.replace(
                      //     `/driver/maintenance-request-form?_id=${request._id}`
                      //   )
                      // }
                    >
                      Edit
                    </Button>
                  )}
                {" "}<Button variant="info"
                className="btn btn-sm" onClick={() => handleMore(request)}>
                  More
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Maintenance Request Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>
      <strong>Plate Number:</strong> {selectedRequest?.plateNumber}
    </p>
    <p>
      <strong>Date:</strong> {selectedRequest?.createdAt}
    </p>
    <p>
      <strong>Status:</strong> {selectedRequest?.status}
    </p>
    <p>
      <strong>Kilometer On Counter: </strong>{selectedRequest?.kilometerOnCounter}
    </p>
    <p>
      <strong>Description:</strong> {selectedRequest?.description}
    </p>
  
    {selectedRequest?.status === "canceled" && (
      <p>
        <strong>Rejection Reason:</strong> {selectedRequest?.reason}
      </p>
    )}
  </Modal.Body>
  <Modal.Footer>
  {selectedRequest?.status === "canceled" && (
  <Button
    variant="primary"
    className="btn btn-sm"
    onClick={() => handleShowEditModal(selectedRequest._id)}
  >
    Resubmit
  </Button>
)}

    <Button variant="secondary" 
    className="btn btn-sm"
    onClick={handleModalClose}>
      Close
    </Button>
   
  </Modal.Footer>
</Modal>
      <Modal show={showEditModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Maintenance Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <FormGroup>
        {selectedRequest?.status === "canceled" && (
  <p>
    <strong>Rejection Reason:</strong> {selectedRequest?.reason}
  </p>
)}

  <FormLabel>Description:</FormLabel>
  <FormControl
  as="textarea"
  value={selectedRequest?.description || ""}
  onChange={(e) =>
    setSelectedRequest({
      ...selectedRequest,
      description: e.target.value,
    })
  }
/>
</FormGroup>
   
<FormGroup>
        <FormLabel>Kilometer On Counter:</FormLabel>
        <FormControl
          type="number"
          min={0}
          value={selectedRequest?.kilometerOnCounter || ""}
          onChange={(e) => {
            const inputValue = parseInt(e.target.value);
            if (inputValue >= 0) {
              setSelectedRequest({
                ...selectedRequest,
                kilometerOnCounter: inputValue,
              });
              setKilometerError("");
            } else {
              setKilometerError("Kilometer On Counter cannot be negative.");
            }
          }}
        />
        {kilometerError && (
          <div className="text-danger">{kilometerError}</div>
        )}
      </FormGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
          className="btn btn-sm"
          onClick={handleModalClose}>
            Close
          </Button>
          {(selectedRequest?.status === "canceled"||selectedRequest?.status==="pending") && (
         <Button
         variant="primary"
         className="btn btn-sm"
         onClick={() => handleEditRequest(selectedRequest)}
       >
         Resubmit
       </Button>
       
          )}
        </Modal.Footer>
        </Modal>
        <div className="d-flex justify-content-center align-items-center w-100">
<Button
  variant="primary"
  className="btn-sm mx-2"
  onClick={handlePrevious}
  disabled={startIndex === 0}
  block
>
  Previous
</Button>
<Button
  variant="primary"
  className="btn-sm mx-2"
  onClick={handleNext}
  disabled={startIndex + 7 >= filteredRequests.length}
  block
>
  Next
</Button>

      </div>
    </div>
    
    
  );
};

export default MaintenanceRequestPage;
