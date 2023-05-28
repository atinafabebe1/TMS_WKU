import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form, Modal, Alert } from "react-bootstrap";
import Loading from "../../common/Provider/LoadingProvider";
import api from "../../../api/api";
const ApproveFuelRequest = () => {
  const [requests, setRequests] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [resources, setResources] = useState([]);
  const [validated, setValidated] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

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
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
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
  const handleShowDataModal = () => {
    setSelectedRequest();
    setShowDataModal(true);
  };

  const handleDataModalClose = () => {
    setSelectedRequest(null);
    setShowDataModal(false);
  };
  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };

  const handleConfirmation = (event) => {
    const form = event.currentTarget;
    setValidated(true);

    if (form && form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    setShowModal(false);
    handleApprove();
  };

  const handleApprove = async () => {
    const updatedRequest = {
      ...selectedRequest,
      approvedAmount: parseInt(approvedAmount),
      price: parseInt(price),
      status: "Approved",
    };
    const data = {
      ...selectedRequest,
      type: matchingResource.type,
      amount: parseInt(approvedAmount),
      unitPrice: parseInt(matchingResource.unitPrice),
      totalPrice:
        parseFloat(approvedAmount) * parseFloat(matchingResource.unitPrice),
    };
    await api
      .put(`/Request/fuel/${selectedRequest._id}`, updatedRequest)
      .then((response) => {
        setSelectedRequest(updatedRequest);
        setShowModal(false);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
    try {
      await api.post("/Resources", data);
      setSuccess("Resource registered successfully!");
      console.log("Success");
    } catch (err) {
      setError(err.message);
      console.error(err.message);
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

  // group resources by type and calculate the total attributes
  const groupedResources = resources.reduce((groups, resource) => {
    const key = resource.type;
    if (!groups[key]) {
      groups[key] = {
        type: key,
        amount: 0,
        unitPrice: 0,
        totalPrice: 0,
      };
    }
    groups[key].amount += resource.amount;
    groups[key].unitPrice += resource.unitPrice;
    groups[key].totalPrice += resource.totalPrice;
    return groups;
  }, {});

  // convert the object back to an array
  const groupedResourcesArray = Object.values(groupedResources);

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
  const recentResourcesArray = Object.values(recentResources);
  recentResourcesArray.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const matchingResource = recentResourcesArray.find(
    (resource) => resource.type === selectedRequest?.typeOfFuel
  );
  const matchingResourceAmount = groupedResourcesArray.find(
    (resource) => resource.type === selectedRequest?.typeOfFuel
  );

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-left mb-4">
        <Button
          className="btn btn-sm"
          variant="primary"
          onClick={() => handleShowDataModal()}
        >
          Show Current Fuel Cost Statistics
        </Button>
      </div>

      <Row className="mb-4">
        <Col>
          <h3 className="form-control-custom">Fuel Requests</h3>
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
                  <Button className="btn btn-sm" variant="success" disabled>
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
      <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="form-control-custom">Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">Fuel request approved successfully!</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-sm"
            onClick={handleSuccessModalClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="form-control-custom">
            Approve Fuel Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong className="form-control-custom">Requested Amount: </strong>{" "}
            {selectedRequest?.requestAmount} Litres
          </p>
          <p>
            <strong className="form-control-custom">Type Of Fuel: </strong>{" "}
            {selectedRequest?.typeOfFuel}
          </p>

          {matchingResource && (
            <p>
              <strong className="form-control-custom">
                {matchingResource.type} Unit Price:{" "}
              </strong>
              {matchingResource.unitPrice} Per Litres
            </p>
          )}

          <Form
            style={{ padding: "10px" }}
            className="form"
            noValidate
            validated={validated}
            onSubmit={handleConfirmation}
          >
            <Form.Group as={Col}>
              <Form.Label className="form-control-custom">
                Add Approved Amount
              </Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={approvedAmount}
                onChange={(event) => {
                  const value = event.target.value;
                  setApprovedAmount(value);
                  setPrice(value * matchingResource.unitPrice);
                }}
                required
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Amount.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="form-control-custom">
                Total price
              </Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={price}
                disabled
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
            variant="primary"
            className="btn btn-sm"
            onClick={(event) => handleConfirmation(event)}
          >
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDataModal} onHide={handleDataModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="form-control-custom">Current Cost Statistics</h4>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Table striped bordered hover>
          <thead className="form-control-custom">
            <tr>
              <th>Type</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {recentResourcesArray.map((resource) => (
              <tr key={resource.type}>
                <td>{resource.type}</td>
                <td>{resource.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-sm"
            onClick={handleDataModalClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ paddingBottom: "70px" }}
      >
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
