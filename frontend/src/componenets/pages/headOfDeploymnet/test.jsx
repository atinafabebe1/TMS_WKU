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
  const [resources, setResources] = useState([]);

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
  const fetchRequestData = async () => {
    await api.get(`/Resources`).then((response) => {
      console.log(response.data.data);
      setResources(response.data.data);
    });
  };

  useEffect(() => {
    fetchRequestData();
  }, []);

  const handleShowModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedRequest(null);
    setShowModal(false);
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
  const recentResources = resources.reduce((groups, resource) => {
    const key = resource.type;
    if (
      !groups[key] ||
      new Date(groups[key].createdAt) < new Date(resource.createdAt)
    ) {
      groups[key] = {
        type: key,
        amount: resource.amount,
        unitPrice: resource.unitPrice,
        totalPrice: resource.totalPrice,
        createdAt: resource.createdAt,
      };
    }
    return groups;
  }, {});

  // convert the object back to an array
  const recentResourcesArray = Object.values(recentResources);

  // sort the array by createdAt date in descending order
  recentResourcesArray.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h3>Fuel Requests</h3>
        </Col>
      </Row>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Current Cost Statistics</h4>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Total Amount</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {recentResourcesArray.map((resource) => (
            <tr key={resource.type}>
              <td>{resource.type}</td>
              <td>{resource.amount}</td>
              <td>{resource.unitPrice}</td>
              <td>{resource.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Next</h2>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Type of Fuel</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.slice(startIndex, startIndex + 7).map((request) => (
            <tr key={request._id}>
              <td>{request.plateNumber}</td>
              <td>{request.typeOfFuel}</td>
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
          <p>
            <strong>Type Of Fuel: </strong> {selectedRequest?.typeOfFuel} Litres
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
    </div>
  );
};

export default ApproveFuelRequest;
