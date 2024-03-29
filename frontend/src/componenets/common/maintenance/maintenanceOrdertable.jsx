import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import api from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";
import Loading from "../Provider/LoadingProvider";

const MaintenanceOrderTable = ({ filter }) => {
  const [spareparts, setSpareParts] = useState([
    {
      identificationNumber: "",
      itemName: "",
      itemPrice: 0,
      itemQuantity: 0,
      totalPrice: 0,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [plateNumber, setPlateNumber] = useState("");
  const [selectedMechanic, setSelectedMechanic] = useState("");
  const [mechanics, setMechanics] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [description, setDescription] = useState("");
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const navigate = useNavigate();

  function handleMechanicChange(event) {
    setSelectedMechanic(event.target.value);
    console.log(selectedMechanic);
  }

  const fetchMechanics = async () => {
    try {
      const response = await api.get("/user/getusers?select=role,firstName");
      setMechanics(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMechanics();
  }, []);

  useEffect(() => {
    api
      .get(`/MaintenanceOrder?reciever=${user.id}`)
      .then((response) => {
        console.log(response.data.data);
        setRequests(response.data.data);
        setIsLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching vehicle requests:", error)
      );
  }, []);

  const handleMore = (request) => {
    console.log(request);
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setDescription("");
    setIsDescriptionValid(true);
  };

  const handleModalSubmit = async () => {

  
    try {
      await api.patch(`/MaintenanceOrder/${selectedRequest._id}`, {
        status: "Need-Higher-Maintenance",
      });
      console.log("Maintenance Order status updated successfully");

      window.location.reload();
      setShowModal(false);
    } catch (error) {
      console.error("Failed to update maintenance request status:", error);
      // Additional code to handle error
    }
  };
  const handlMaintained= async (request) => {
    try {
      await api.patch(`/MaintenanceOrder/${request._id}`, {
        status: "Maintained",
      });
      console.log("Maintenance request status updated successfully");

      // Additional code to handle successful submission
      window.location.reload();
   
    } catch (error) {
      console.error("Failed to update maintenance request status:", error);
      // Additional code to handle error
    }
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = requests
    .filter((request) => {
      if (filter === "all") {
        return request.status.toLowerCase() !== "pending";
      } else {
        return request.status.toLowerCase() === filter;
      }
    })
    .filter((request) => {
      return request.plateNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

  return (
    <div className="p-4">
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
                {request.status === "Maintained" && (
                  <>
                  <Button
  className="btn btn-sm"
  variant="primary"
  onClick={(e) => {
    navigate(
      `/mechanic/maintenance/approval-report/${request._id}`
    );
  }}
>
  Send For Approvements
</Button>
{" "}
                    <Button
                      variant="secondary"
                      className="btn btn-sm"
                      onClick={() => handleMore(request)}
                    >
                      Difficult
                    </Button>
                  </>
                )}{" "}
                 {request.status === "UnderMaintenance" && (
                 <Button
  variant="success"
  disabled={request.status === "Maintained"}
  className="btn btn-sm"
  onClick={() => handlMaintained(request)}
>
  Maintained
</Button>
                 )}
{" "}
                <Button
                  variant="info"
                  className="btn btn-sm"
                  onClick={() => handleMore(request)}
                >
                  More
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="form-control-custom">
            Maintenance Orders Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong className="form-control-custom">Plate Number:</strong>{" "}
            {selectedRequest?.plateNumber}
          </p>
          <p>
            <strong className="form-control-custom">Date:</strong>{" "}
            {selectedRequest?.createdAt}
          </p>
          <p>
            <strong className="form-control-custom">Status:</strong>{" "}
            {selectedRequest?.status}
          </p>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={!isDescriptionValid}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid description.
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-sm"
            onClick={handleModalClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            className="btn btn-sm"
            onClick={handleModalSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MaintenanceOrderTable;
