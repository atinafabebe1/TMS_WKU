import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import Loading from "../../common/Provider/LoadingProvider";
import ErrorProvider from "../../common/Provider/ErrorProvider";
import SuccessProvider from "../../common/Provider/SuccessProvider";
import api from "../../../api/api";

const ApproveAndRegisterFuelRequest = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [mode, setMode] = useState("");
  const [typeOfFuel, setTypeOfFuel] = useState("");
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const [requests, setRequests] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchReqestData = async () => {
    await api.get(`/Request/fuel?status=Approved`).then((response) => {
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

  const handleSubmit = async () => {
    const data = {
      plateNumber: selectedRequest?.plateNumber,
      typeOfFuel: selectedRequest?.typeOfFuel,
      mode,
      approvedAmount: selectedRequest?.approvedAmount,
      price: selectedRequest?.price,
    };
    try {
      const response = await api.post(
        `/Report/daily-fuel-costs?isDeleted=false`,
        data
      );
      setShowModal(false);
      setSuccess("Successfully Registered");
    } catch (err) {
      console.log(err.response.data);
      setShowModal(false);
      setError("Please select valid Mode and try again");
      setSuccess("");
    }

    try {
      await api.put(`/Request/fuel/${selectedRequest._id}`, {
        status: "Completed",
      });
      const response = await api.get("/Request/fuel");
      setRequests(response.data.data);
    } catch (error) {
      console.log(error);
    }
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
        {error && <ErrorProvider error={error} />}
        {success && <SuccessProvider success={success} />}
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
                {request.status === "Approved" && (
                  <Button
                    className="btn btn-sm"
                    variant="success"
                    onClick={() => handleShowModal(request)}
                  >
                    Complete
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
          <Modal.Title>Register Fuel Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Col} controlId="platenumber">
              <Form.Label>Plate Number</Form.Label>
              <Form.Control
                type="string"
                readOnly
                minLength={9}
                maxLength={9}
                value={selectedRequest?.plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="apprivedAmount">
              <Form.Label>Approved Amount</Form.Label>
              <Form.Control
                type="number"
                readOnly
                value={selectedRequest?.approvedAmount}
                onChange={(e) => setApprovedAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="string"
                readOnly
                value={selectedRequest?.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="mode">
              <Form.Label>Mode</Form.Label>
              <Form.Control
                as="select"
                type="text"
                placeholder="Choose"
                min={0}
                minLength={3}
                maxLength={25}
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="Choose">Choose</option>
                <option value="Coupon">Coupon</option>
                <option value="Cash">Cash</option>
                <option value="Fuel">Fuel</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="role">
              <Form.Label className="font-weight-bold">Type Of Fuel</Form.Label>
              <Form.Control
                type="text"
                readOnly
                required
                value={selectedRequest?.typeOfFuel}
                onChange={(e) => setTypeOfFuel(e.target.value)}
              ></Form.Control>
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
            variant="success"
            className="btn btn-sm"
            onClick={() => handleSubmit(selectedRequest)}
          >
            Register and Complete
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

export default ApproveAndRegisterFuelRequest;
