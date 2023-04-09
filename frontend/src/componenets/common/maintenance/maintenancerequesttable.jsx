import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col, Form,Modal } from "react-bootstrap";
import api from "../../../api/api";

const MaintenanceRequestTables = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Fetch the user's vehicle requests from your server API
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
        console.error(`Error deleting vehicle request with ID ${id}:`, error)
      );
  };
  const handleMore = (request) => {
    console.log(request)
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

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h1 align='center'>Maintenance Requests</h1>
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
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "approved" && (
                  <Button className="btn btn-sm" variant="success" disabled>
                    Approved
                  </Button>
                )}
                {request.status === "pending" && (
                  <div>
                  
                    <Button
                      className="btn btn-sm"
                      variant="success"
                      onClick={() =>
                        window.location.replace(
                          `/hd/maintenance-order-form?_id=${request._id}`
                        )
                      }
                    >
                      Transfer Order
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      variant="danger"
                      onClick={() => handleDeleteRequest(request._id)}
                    >
                      Delete
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      variant="primary"
                      onClick={() => handleMore(request)}
                    >
                      More
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={showModal}
        onHide={handleModalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { (
            <div>
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <th scope="col">Plate Number:</th>
                    <th scope="col"> {selectedRequest?.plateNumber}</th>
                  </tr>
                  <tr>
                    <th scope="col">Chassis No:</th>
                    <th scope="col"> {selectedRequest?.chassisNo}</th>
                  </tr>
                  <tr>
                    <th scope="col">Type of Fuel: </th>
                    <th scope="col"> {selectedRequest?.typeOfFuel}</th>
                  </tr>
                  <tr>
                    <th scope="col">Model Number: </th>
                    <th scope="col"> {selectedRequest?.modelNo}</th>
                  </tr>
                  <tr>
                    <th scope="col">Motor Number: </th>
                    <th scope="col"> {selectedRequest?.motorNo}</th>
                  </tr>
                  <tr>
                    <th scope="col">CC: </th>
                    <th scope="col"> {selectedRequest?.cC}</th>
                  </tr>
                  <tr>
                    <th scope="col">Purchase Date: </th>
                    <th scope="col"> {selectedRequest?.purchasedDate}</th>
                  </tr>
                  
                  <tr>
                    <th scope="col">Proprietary Id Number: </th>
                    <th scope="col"> {selectedRequest?.proprietaryIdNumber}</th>
                  </tr>
                  <tr>
                    <th scope="col">Reason: </th>
                    <th scope="col"> {selectedRequest?.description}</th>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MaintenanceRequestTables;
