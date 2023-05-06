import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal,Row,Col } from "react-bootstrap";
import api from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";
import { ROLE_HEADOFDEPLOYMENT } from "../../../constants/index";

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

  const handleRejectClick = async (request) => {
    const reason = prompt("Please enter a reason for rejection:");
    if (!reason) return; // If the user cancels the prompt, do nothing
    try {
      await api.patch(`/Request/maintenance/${request._id}`, {
        status: "canceled",
        rejectReason: reason, // Add the reason to the patch request
      });
      const response = await api.get("/Request/maintenance");
      setRequests(response.data.data);
    } catch (error) {
      console.log(error);
    }
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
                      onClick={() => handleTransferOrder(request)}
                    >
                      Transfer Order
                    </Button>
                    {" "}
                    <Button
                      variant="danger"
                      className="btn btn-sm"
                      onClick={() => handleRejectClick(request)}
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
