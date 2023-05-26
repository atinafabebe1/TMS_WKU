import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import Loading from "../../common/Provider/LoadingProvider";
import api from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";
const FuelRequestListPage = () => {
  const [requests, setRequests] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const fetchReqestData = async () => {
    await api.get(`/Request/fuel?user=${user.id}`).then((response) => {
      console.log(response.data.data);
      setRequests(response.data.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchReqestData();
  }, [user]);

  const handleShowModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedRequest(null);
    setShowModal(false);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };

  const handleApprove = async () => {
    const updatedRequest = {
      ...selectedRequest,
      status: "Received",
    };

    await api
      .put(`/Request/fuel/${selectedRequest._id}`, updatedRequest)
      .then((response) => {
        setSelectedRequest(updatedRequest);
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <h3>Fuel Requests</h3>
        </Col>
        <Col className="text-end">
          <Link to="/driver/request/create-fuel-request">
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
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Type</th>
            <th>ID </th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.slice(startIndex, startIndex + 7).map((request) => (
            <tr key={request._id}>
              <td>{request.plateNumber}</td>
              <td>{request.typeOfFuel}</td>
              <td>{request.requestAmount}</td>
              <td>{request.currentRecordOnCounter}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "Canceled" && (
                  <Button
                    className="btn btn-sm"
                    variant="secondary"
                    onClick={() =>
                      navigate(
                        `/driver/request/edit-vehicle-request/${request._id}`
                      )
                    }
                  >
                    Resubmit
                  </Button>
                )}
                {request.status === "Completed" && (
                  <Button
                    className="btn btn-sm"
                    variant="success"
                    onClick={() => handleShowModal(request)}
                  >
                    Receive
                  </Button>
                )}
                {request.status === "Waiting Approval" && (
                  <Button className="btn btn-sm" variant="warning" disabled>
                    Waiting for Approval
                  </Button>
                )}
                {request.status === "Approved" && (
                  <Button className="btn btn-sm" variant="success" disabled>
                    Approved
                  </Button>
                )}
                {request.status === "Received" && (
                  <Button className="btn btn-sm" variant="success" disabled>
                    Received
                  </Button>
                )}
                {request.status === "Rejected" && (
                  <Button className="btn btn-sm" variant="danger" disabled>
                    Request Rejected
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Approve You Have Received Fuel, Are You Sure?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-sm"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="btn btn-sm"
            onClick={() => handleApprove(selectedRequest)}
          >
            Approve
          </Button>
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

export default FuelRequestListPage;
