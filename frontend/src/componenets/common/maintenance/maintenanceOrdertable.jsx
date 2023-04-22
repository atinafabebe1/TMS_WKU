import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import axios from "axios";
import api from "../../../api/api";

const MaintenanceOrderTable = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Fetch the user's vehicle requests from your server API
    api
      .get("/MaintenanceOrder")
      .then((response) => {
        console.log(response.data.data);
        setRequests(response.data.data);
      })
      .catch((error) =>
        console.error("Error fetching maintenance order:", error)
      );
  }, []);

  const handleDeleteRequest = (id) => {
    // Delete the vehicle request with the specified ID from your server API
    api
      .delete(`/MaintenanceOrder/${id}`)
      .then(() => {
        // Filter out the deleted request from the local state
        setRequests(requests.filter((request) => request._id !== id));
      })
      .catch((error) =>
        console.error(`Error deleting maintenance order with ID ${id}:`, error)
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
  const [maintenanceOrder, setMaintenanceOrder] = useState('');

  const handleTransferOrder = () => {
    axios.post('/MaintenanceOrder', {maintenanceOrder})
      .then(response => {
        console.log(response);
        // add any additional code here to handle response
      })
      .catch(error => {
        console.log(error);
        // add any additional code here to handle error
      });
  }


  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h1 align="center">Maintenance Orders</h1>
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
                          `/gd/maintenance-order-form?_id=${request._id}`
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
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div>
              <table class="table table-striped table-sm">
                <tbody>
                  <tr>
                    <th scope="col">Plate Number:</th>
                    <th scope="col"> {selectedRequest?.vehicle.plateNumber}</th>
                  </tr>
                  <tr>
                    <th scope="col">Chassis No:</th>
                    <th scope="col"> {selectedRequest?.vehicle.chassisNo}</th>
                  </tr>
                  <tr>
                    <th scope="col">Type of Fuel: </th>
                    <th scope="col"> {selectedRequest?.vehicle.typeOfFuel}</th>
                  </tr>
                  <tr>
                    <th scope="col">Model Number: </th>
                    <th scope="col"> {selectedRequest?.vehicle.modelNo}</th>
                  </tr>
                  <tr>
                    <th scope="col">Motor Number: </th>
                    <th scope="col"> {selectedRequest?.vehicle.motorNo}</th>
                  </tr>
                  <tr>
                    <th scope="col">CC: </th>
                    <th scope="col"> {selectedRequest?.vehicle.cC}</th>
                  </tr>
                  <tr>
                    <th scope="col">Purchase Date: </th>
                    <th scope="col">
                      {" "}
                      {selectedRequest?.vehicle.purchasedDate}
                    </th>
                  </tr>

                  <tr>
                    <th scope="col">Proprietary Id Number: </th>
                    <th scope="col">
                      {" "}
                      {selectedRequest?.vehicle.proprietaryIdNumber}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">Reason: </th>
                    <th scope="col"> {selectedRequest?.description}</th>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            variant="secondary"
            onClick={handleModalClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MaintenanceOrderTable;
