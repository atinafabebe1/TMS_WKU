import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal,Row,Col,FormControl,FormLabel,FormGroup } from "react-bootstrap";
import api from "../../../api/api";

const GDMaintenanceRequestTables = ({ filter }) => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [transferModal,setTransferModal]=useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [vehicless,setVehicles]=useState("");
  const [mechanics,setMechanics]=useState("");
  const [plateNumber,setPlateNumber]=useState("");
  const [selectedMechanic, setSelectedMechanic] = useState("");

  function handleMechanicChange(event) {
    setSelectedMechanic(event.target.value);
  }
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
  const handleTransferModal =(request)=>{
    setSelectedRequest(request);
    setVehicles(vehicless);
    setTransferModal(true);
  }

  const handleModalClose = () => {
    setShowModal(false);
    setTransferModal(false);
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
  const fetch = async () => {
    api
      .get("/VehicleRecord?select=plateNumber,type,assignedTo")
      .then((response) => {
        setVehicles(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchMachanics = async () => {
    api
      .get("/user/getusers?select=role,firstName")
      .then((response) => {
        setMechanics(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetch();
    fetchMachanics();
  }, []);
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
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>{request.status}</td>
              <td>

                {request.status === "in-progress" && (
                  <>
                    <Button
                      variant="success"
                      className="btn btn-sm"
                      onClick={() => handleTransferModal(request)}
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
    <Modal.Title>Maintenance Order Details</Modal.Title>
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





<Modal show={transferModal} onHide={handleModalClose} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Transfer to Mechanic Order</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>
      <strong>Plate Number: </strong> {selectedRequest?.plateNumber}
    </p>

    <p>
      <strong>Vehicle Type: </strong>
      {Array.isArray(vehicless) &&
        vehicless.map((vehicle) => {
          if (vehicle.plateNumber === selectedRequest?.plateNumber) {
            return vehicle.type;
          } else {
            return null;
          }
        })}
    </p>

    <p>
      <strong>Assigned Work flow: </strong>{" "}
      {Array.isArray(vehicless) &&
        vehicless.map((vehicle) => {
          if (vehicle.plateNumber === selectedRequest?.plateNumber) {
            return vehicle.assignedTo;
          } else {
            return null;
          }
        })}
    </p>

    <Form>
      <Form.Group as={Col}>
        <Form.Label>Kilometer Reading</Form.Label>
        <Form.Control
          type="number"
          // value={approvedAmount}
          // onChange={(event) => setApprovedAmount(event.target.value)}
          // required
          className="mb-3"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid Amount.
        </Form.Control.Feedback>
      </Form.Group>
     
    </Form>
    <p>
  <strong>Description:</strong> {selectedRequest?.description}
</p>

    <ul>
  {Array.isArray(mechanics) &&
    mechanics
      .filter((mechanic) => mechanic.role === "ROLE_MECHANIC")
      .map((mechanic) => {
        return <li key={mechanic.role}>{mechanic.name}</li>;
      })}
</ul>

<select value={selectedMechanic} onChange={handleMechanicChange}>
  <option value="">Select a Mechanic</option>
  {Array.isArray(mechanics) &&
    mechanics
      .filter((mechanic) => mechanic.role === "ROLE_MECHANIC")
      .map((mechanic) => {
        return (
          <option key={mechanic.id} value={mechanic.firstName}>
            {mechanic.firstName}
          </option>
        );
      })}
</select>


  
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
      // onClick={() => handleApprove(selectedRequest)}
    >
      Approve
    </Button>
  </Modal.Footer>
</Modal>



    </div>
  );
};

export default GDMaintenanceRequestTables;

