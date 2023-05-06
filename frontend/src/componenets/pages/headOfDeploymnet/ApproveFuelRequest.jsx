import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import Loading from "../../common/Provider/LoadingProvider";
import api from "../../../api/api";
const ApproveFuelRequest = () => {
  const [requests, setRequests] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchReqestData = async () => {
    await api.get(`/Request/fuel`).then((response) => {
      console.log(response.data.data);
      setRequests(response.data.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchReqestData();
  }, []);

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

  const handleUnapprove = async (request) => {
    try {
      await api.put(`/Request/fuel/${request._id}`, {
        status: "Waiting Approval",
      });
      const response = await api.get("/Request/fuel");
      setRequests(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async () => {
    const updatedRequest = {
      ...selectedRequest,
      approvedAmount: parseInt(approvedAmount),
      price: parseInt(price),
      status: "Approved",
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
    const plateNumber =
      typeof request.plateNumber === "string" ? request.plateNumber : "";
    return (
      plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h3>Fuel Requests</h3>
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
            <th>Type of Fuel</th>
            <th>Requested Amount</th>
            <th>Current Record</th>
            <th>Approved Amount</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.slice(startIndex, startIndex + 7).map((request) => (
            <tr key={request._id}>
              <td>{request.plateNumber}</td>
              <td>{request.typeOfFuel}</td>
              <td>{request.requestAmount}</td>
              <td>{request.currentRecordOnCounter}</td>
              <td>{request.approvedAmount}</td>
              <td>{request.price}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "Waiting Approval" && (
                  <Button
                    className="btn btn-sm"
                    variant="primary"
                    onClick={() => handleShowModal(request)}
                  >
                    Approve
                  </Button>
                )}
                {request.status === "Approved" && (
                  <Button
                    className="btn btn-sm"
                    variant="success"
                    onClick={() => handleUnapprove(request)}
                  >
                    Approved
                  </Button>
                )}
                {request.status === "Completed" && (
                  <Button className="btn btn-sm" variant="success" disabled>
                    Completed
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Fuel Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Requested Amount: </strong> {selectedRequest?.requestAmount}{" "}
            Litres
          </p>
          <Form>
            <Form.Group as={Col}>
              <Form.Label>Add Approved Amount</Form.Label>
              <Form.Control
                type="number"
                value={approvedAmount}
                onChange={(event) => setApprovedAmount(event.target.value)}
                required
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Amount.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Add Total price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Quantity.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
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
            variant="secondary"
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

export default ApproveFuelRequest;
