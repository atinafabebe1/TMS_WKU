import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal,Row,Col } from "react-bootstrap";
import api from "../../../api/api";
import Loading from "../Provider/LoadingProvider";
import "../../common/css/formStyles.css";
const MaintenanceRequestTables = ({ filter }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading]=useState(true);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [reason,setReason]=useState("");

  useEffect(() => {
    api
      .get("/Request/maintenance")
      .then((response) => {
        setRequests(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicle requests:", error);
      });
  }, []);
  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 7, requests.length - 7));
  };
  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };
  
  const handleRejectClick = async (request) => {
   
    if (!reason)
    {
    return; 
    }else{// If the user cancels the prompt, do nothing
    try {
      await api.patch(`/Request/maintenance/${request._id}`, {
        status: "canceled",
        rejectReason: reason, // Add the reason to the patch request
      });
      const response = await api.get("/Request/maintenance");
      setRequests(response.data.data);
    } catch (error) {
      console.log(error);
    }}
  };
  const handleRejectModal=(request)=>{
    setSelectedRequest(request);
    setShowRejectModal(true);
    setShowModal(false);
  }

  const handleMore = (request) => {
    setSelectedRequest(request);
    if (request.status === "canceled") {
      setShowModal(false); // Close the existing modal
      const reason = request.rejectReason || "No reason provided";
      // Set the selected request with the rejection reason
      setSelectedRequest({ ...request, reason });
      setShowModal(true);
      setShowRejectModal(false);
      // Reopen the modal with the rejection reason
    } else {
      setShowModal(true);
      setShowRejectModal(false);

    }
  };
  

  const handleModalClose = () => {
    setShowModal(false);
    setShowRejectModal(false);
    setSelectedRequest(null);
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

  const handleTransferOrder = async (request) => {
    try {
      await api.patch(`/Request/maintenance/${request._id}`, { status: "in-progress" });

      const response = await api.get("/Request/maintenance");
      setRequests(response.data.data);
    } catch (error) {
      console.log(error);
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
      </Form>
      {isLoading && <Loading/> }
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

                {request.status === "pending" && (
                  <>
                    <Button
                      variant="success"
                      className="btn btn-sm"
                      onClick={() => handleTransferOrder(request)}
                    >
                      Transfer Order
                    </Button>
                    {" "}
                    <Button
                      variant="danger"
                      className="btn btn-sm"
                      onClick={() => handleRejectModal(request)}
                    >
                      Reject
                    </Button>
                    {" "}
                  </>
                )}
                <Button variant="info"
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
      <strong>Description:</strong> {selectedRequest?.description}
    </p>
    {selectedRequest?.status === "canceled" && (
      <p>
        <strong>Rejection Reason:</strong> {selectedRequest?.reason}
      </p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" 
    className="btn btn-sm"
    onClick={handleModalClose}>
      Close
    </Button>
    {selectedRequest?.status === "pending" && (
      <Form.Group>
      <Button
      variant="danger"
      className="btn btn-sm"
      onClick={() => handleRejectModal(selectedRequest)}
    >
      Reject
    </Button>
{" "}
      <Button
        variant="primary"
        className="btn btn-sm"
        onClick={() => handleTransferOrder(selectedRequest)}
      >
        Transfer Order
      </Button>
      </Form.Group>
    )}
  </Modal.Footer>
</Modal>
<Modal show={showRejectModal} onHide={handleModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Provide Reject Reason</Modal.Title>
  </Modal.Header>
  <Modal.Body>
   
  <Form.Label>Reject Reason</Form.Label>
        <Form.Control
          type="text"
           value={reason}
           onChange={(event) => setReason(event.target.value)}
          required
          className="mb-3"
        />
         </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" 
    className="btn btn-sm"
    onClick={handleModalClose}>
      Close
    </Button>
    {selectedRequest?.status === "pending" && (
      <Button
        variant="primary"
        className="btn btn-sm"
        onClick={() => handleRejectClick(selectedRequest)}
      >
        Reject
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

export default MaintenanceRequestTables;
