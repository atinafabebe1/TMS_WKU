import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import axios from "axios";
import api from "../../../api/api";
const MaintenanceRequestTables = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [maintenanceOrder, setMaintenanceOrder] = useState('');

  useEffect(() => {
    // Fetch the user's vehicle
    //requests from your server API
    api
      .get("/Request/maintenance")
      .then((response) => {
        console.log(response.data.data);
        setRequests(response.data.data);
      })
      .catch((error) =>
        console.error("Error fetching vehicle requests:", error)
      );
  }, []);

  const handleDeleteRequest = (id) => {
    // Delete the vehicle request with the specified ID from your server API
    api
      .delete(`/Request/maintenance/${id}`)
      .then(() => {
        // Filter out the deleted request from the local state
        setRequests(requests.filter((request) => request._id !== id));
      })
      .catch((error) =>
        console.error(`Error deleting maintenance request with ID ${id}:`, error)
      );
  };

  const handleMore = (request) => {
    console.log(request);
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = requests.filter((request) => {
    return (
      request.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleTransferOrder = (id) => {
    // Send a POST request to the server API to transfer maintenance order
    axios.post(`/MaintenanceOrder`, { maintenanceOrder })
      .then((response) => {
        console.log(response);
        // Update the local state with the new status of the request
        const updatedRequests = requests.map((request) => {
          if (request._id === id) {
            return {
              ...request,
              status: "transferred",
            };
          }
          return request;
        });
        setRequests(updatedRequests);
      })
      .catch((error) => {
        console.error(`Error transferring maintenance order for request with ID ${id}:`, error);
      });
  };

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h1 align="center">Maintenance Requests</h1>
        </Col>
      </Row>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search by plate number or status"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Form>
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
              <td>{request.createdAt}</td>
              <td>{request.status}</td>
              <td>
                
                {request.status === "pending" && (
                  <>
                    <Button
                      variant="success"
                      className="mx-2"
                      onClick={() => handleTransferOrder(request._id)}
                    >
                      Transfer Order
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteRequest(request._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
                <Button variant="info" onClick={() => handleMore(request)}>
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
          {selectedRequest?.status === "in-progress" && (
            <>
              <Form.Label>Maintenance Order</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter maintenance order"
                value={maintenanceOrder}
                onChange={(e) => setMaintenanceOrder(e.target.value)}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {selectedRequest?.status === "in-progress" && (
            <Button
              variant="primary"
              onClick={() => handleTransferOrder(selectedRequest._id)}
            >
              Transfer Order
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MaintenanceRequestTables;
