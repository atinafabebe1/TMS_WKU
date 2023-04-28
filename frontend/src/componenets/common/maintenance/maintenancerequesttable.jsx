import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal,Row,Col } from "react-bootstrap";
import axios from "axios";
import api from "../../../api/api";

const MaintenanceRequestTables = ({ filter }) => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    api
      .get("/Request/maintenance")
      .then((response) => {
        setRequests(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicle requests:", error);
      });
  }, []);

  const handleRejectClick = async (request, rejectReason) => {
    try {
      await api.put(
        `/Request/maintenance/${request._id}`,
        {
          status: "cancelled",
        },
        {
          data: {rejectReason}
        }
      );
      const response = await api.get("/Request/maintenance");
      setRequests(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMore = (request) => {
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
    if (filter === "all") {
      return true;
    } else {
      return request.status.toLowerCase() === filter;
    }
  }).filter((request) => {
    return request.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleTransferOrder = async (selectedRequest) => {
    try {
      await api.put(`/Request/maintenance/${selectedRequest}`, { status: "in-progress" });

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
                      className="btn btn-sm"
                      onClick={() => handleTransferOrder(selectedRequest)}
                    >
                      Transfer Order
                    </Button>
                    {" "}
                    <Button
                      variant="danger"
                      className="btn btn-sm"
                      onClick={() => handleRejectClick(request._id)}
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
              onClick={() => handleTransferOrder(selectedRequest)}
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
