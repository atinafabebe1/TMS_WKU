import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorProvider from "../../common/Provider/ErrorProvider";
import SuccessProvider from "../../common/Provider/SuccessProvider";
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
  const [requests, setRequests] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [startIndex, setStartIndex] = useState(0);



  useEffect(() => {
    // Fetch the user's vehicle requests from your server API
    api
      .get("/Request/maintenance")
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
    setStartIndex((prevIndex) => prevIndex + 7);
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
    setSelectedRequest(null);
  };

  const handleDeleteRequest = (id) => {
    // Delete the vehicle request with the specified ID from your server API
    api
      .delete(`/Request/maintenance/${id}`)
      .then(() => {
        // Filter out the deleted request from the local state
        setRequests(requests.filter((request) => request._id !== id));
      })
      .catch((error) =>
        console.error(`Error deleting vehicle request with ID ${id}:`, error)
      );
  };

  const handleShowEditModal = (id) => {
    // Find the selected request from the local state and set it as the selectedRequest
    setSelectedRequest(requests.find((request) => request._id === id));
    setShowEditModal(true);
  };

  const handleEditRequest = () => {
    // Edit the selected request with the specified ID on your server API
    api
      .put(`/Request/maintenance/${selectedRequest._id}`, selectedRequest)
      .then(() => {
        // Update the local state with the edited request
        setRequests(
          requests.map((request) =>
            request._id === selectedRequest._id ? selectedRequest : request
          )
        );
        setShowEditModal(false);
      })
      .catch((error) =>
        console.error(`Error editing Maintenance request with ID ${selectedRequest._id}:`, error)
      );
  };

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col className="text-end">
          <Link to="/driver/maintenance-request-form">
            <Button variant="primary">New Request</Button>
          </Link>
        </Col>
      </Row>
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
      {isLoading && <Loading />}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.plateNumber}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "rejected" && (
                  <Button
                    className="btn btn-sm"
                    variant="secondary"
                    onClick={() =>
                      window.location.replace(
                        `/driver/maintenance-request-form?_id=${request._id}`
                      )
                    }
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
                  <div>
                    <Button
                      className="btn btn-sm"
                      variant="primary"
                      onClick={() => handleShowEditModal(request._id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      variant="danger"
                      onClick={() => handleDeleteRequest(request._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showEditModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Maintenance Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <FormGroup>
  <FormLabel>Description:</FormLabel>
  <FormControl
    as="textarea"
    value={selectedRequest?.description}
    onChange={(e) =>
      setSelectedRequest({
        ...selectedRequest,
        description: e.target.value,
      })
    }
  />
</FormGroup>

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
              onClick={() => handleEditRequest(selectedRequest._id)}
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
          disabled={startIndex + 7 >= requests.length}
          block
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MaintenanceRequestPage;
