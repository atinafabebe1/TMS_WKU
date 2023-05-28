import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col, Form, Badge, Modal } from "react-bootstrap";
import Loading from "../../common/Provider/LoadingProvider";
import api from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";

import "../../common/css/formStyles.css";
const SparePartRequestListPage = () => {
  const [requests, setRequests] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteRequestId, setDeleteRequestId] = useState(null);
  const { user } = useAuth();

  const navigate = useNavigate();

  const fetchRequestData = async () => {
    try {
      const response = await api.get(`/Request/sparePart?user=${user.id}`);
      setRequests(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching spare part requests:", error);
    }
  };

  useEffect(() => {
    fetchRequestData();
  }, []);

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };

  const handleDeleteRequest = async (id) => {
    try {
      await api.delete(`/Request/sparePart/${id}`);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id)
      );
    } catch (error) {
      console.error(`Error deleting spare part request with ID ${id}:`, error);
    }
  };

  const handleConfirmDelete = () => {
    handleDeleteRequest(deleteRequestId);
    setDeleteRequestId(null);
    setShowConfirmationModal(false);
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
          <h5 className="form-control-custom">Your Last Spare Part Requests</h5>
        </Col>
        <Col className="text-end">
          <Link to="/mechanic/request/create-accessory">
            <Button variant="primary">New Request</Button>
          </Link>
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
      {isLoading && <Loading />}
      <Table striped bordered hover responsive className="table-sm">
        <thead className="form-control-custom">
          <tr>
            <th>Plate Number</th>
            <th>Spare Part Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.slice(startIndex, startIndex + 7).map((request) => (
            <tr key={request._id}>
              <td>{request.plateNumber}</td>
              <td>{request.sparePartName}</td>
              <td>{request.quantity}</td>
              <td>{request.unitPrice}</td>
              <td>{request.totalPrice}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>
                <Badge>{request.status}</Badge>
              </td>
              <td>
                {request.status === "canceled" && (
                  <Button
                    className="btn btn-sm"
                    variant="secondary"
                    onClick={() =>
                      navigate(
                        `/mechanic/request/edit-vehicle-request/${request._id}`
                      )
                    }
                  >
                    Resubmit
                  </Button>
                )}
                {request.status === "completed" && (
                  <Button
                    className="btn btn-sm"
                    variant="success"
                    disabled
                    onClick={() =>
                      navigate(
                        `/mechanic/request/edit-vehicle-request/${request._id}`
                      )
                    }
                  >
                    Completed
                  </Button>
                )}
                {request.status === "in-progress" && (
                  <Button className="btn btn-sm" variant="success" disabled>
                    Waiting for Store
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
                      onClick={() =>
                        navigate(
                          `/mechanic/request/edit-vehicle-request/${request._id}`
                        )
                      }
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      variant="danger"
                      onClick={() => {
                        setDeleteRequestId(request._id);
                        setShowConfirmationModal(true);
                      }}
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
      <Modal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this request?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SparePartRequestListPage;
