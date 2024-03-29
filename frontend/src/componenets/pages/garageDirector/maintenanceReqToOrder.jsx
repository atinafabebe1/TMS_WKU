import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal,Row,Col,FormControl,FormLabel,FormGroup } from "react-bootstrap";
import api from "../../../api/api";
import ErrorProvider from "../../common/Provider/ErrorProvider";
import SuccessProvider from "../../common/Provider/SuccessProvider";
import Loading from "../../common/Provider/LoadingProvider";

const GDMaintenanceRequestTables = ({ filter }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading,setIsLoading]=useState(true);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [transferModal,setTransferModal]=useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [vehicless,setVehicles]=useState([]);
  const [mechanics,setMechanics]=useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [typeOfVehicle,setTypeOfVehicle]=useState("");
  const [assignedWorkflow,setAssignedWorkflow]=useState(""); 
  const [kilometerOnCounter,setKilometerOncounter]=useState("");
  const [description, setCrashType]=useState("");
  const [plateNumber,setPlateNumber]=useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState();
  const [reason,setReason]=useState("");


  function handleMechanicChange(event) {
    setSelectedMechanic(event.target.value);
    console.log(selectedMechanic);
  }
  useEffect(() => {
    api
      .get("/Request/maintenance")
      .then((response) => {
        setRequests(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicle requests:", error);
      });
  }, []);
  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 7, requests.length - 7));
  };
  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };
  
  const handleRejectClick = async (request) => {
   
    if (!reason)
    {
    return; 
    }else{// If the user cancels the prompt, do nothing
    try {
      await api.patch(`/Request/maintenance/${request._id}`, {
        status: "canceled",
        rejectReason: reason, // Add the reason to the patch request
      })
      const response = await api.get("/Request/maintenance");
      setRequests(response.data.data);
      setShowRejectModal(false);
   
    } catch (error) {
      console.log(error);
    }}
  };
  const handleRejectModal=(request)=>{
    setSelectedRequest(request);
    setShowRejectModal(true);
    setShowModal(false);
  }

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
    setShowRejectModal(false);
    setSelectedRequest(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = requests.filter((request) => {
    if (filter === "all") {
      return request.status.toLowerCase() !== "pending";
    } else {
      return request.status.toLowerCase() === filter;
    }
  }).filter((request) => {
    return request.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleTransferOrder = async () => {
    try {
    const data = {
    ...selectedRequest,selectedMechanic,
    plateNumber: selectedRequest?.plateNumber,
    kilometerOnCounter: parseInt(selectedRequest?.kilometerOnCounter),
    crashType: selectedRequest?.description,
    reciever: selectedMechanic,
    };
    await api.post(`/MaintenanceOrder?isDeleted=false`, data);
    await api.patch(`/Request/maintenance/${selectedRequest?._id}`, { status: "UnderMaintenance" });
    setTransferModal(false);
    setSuccess("Successfully Order Transferred");
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
        {error && <ErrorProvider error={error} />}
        {success && <SuccessProvider success={success} />}
        {isLoading && <Loading /> }
      </Form>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr className="form-control-custom">
            <th>Plate Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody >
          {filteredRequests.slice(startIndex, startIndex + 7).map((request)  => (
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
                      onClick={() => handleRejectModal(request)}
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

      <Modal show={showModal} className="form-control-custom" onHide={handleModalClose}>
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
        onClick={() => handleTransferModal(selectedRequest)}
      >
        Transfer Order
      </Button>
    )}
  </Modal.Footer>
</Modal>
<Modal show={showRejectModal} onHide={handleModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Provide Reject Reason</Modal.Title>
  </Modal.Header>
  <Modal.Body>
   
  <Form.Label>Reject Reason</Form.Label>
        <Form.Control
          type="text"
           value={reason}
           onChange={(event) => setReason(event.target.value)}
          required
          className="mb-3"
        />
         </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" 
    className="btn btn-sm"
    onClick={handleModalClose}>
      Close
    </Button>
    {selectedRequest?.status === "in-progress" && (
      <Button
        variant="primary"
        className="btn btn-sm"
        onClick={() => handleRejectClick(selectedRequest)}
      >
        Reject
      </Button>
    )}
  </Modal.Footer>
</Modal>




<Modal show={transferModal} onHide={handleModalClose} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Transfer to Mechanic Order</Modal.Title>
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
  <Form.Group as={Col} controlId="vehicletype">
    <Form.Label>Vehicle Type</Form.Label>
    <Form.Control
      type="text"
      readOnly
      value={
        Array.isArray(vehicless) &&
        vehicless
          .filter((vehicle) => vehicle.plateNumber === selectedRequest?.plateNumber)
          .map((vehicle) => {
            if (vehicle.type !== null) {
              return vehicle.type;
            }

            else return null;
          })
          .join(", ")
      }
      onChange={(e) => setTypeOfVehicle(e.vehicle.type)}
    />
  </Form.Group>
  <Form.Group as={Col} controlId="assignedto">
    <Form.Label>Assigned To</Form.Label>
    <Form.Control
      type="text"
      readOnly
      value={
        Array.isArray(vehicless) &&
        vehicless
          .filter((vehicle) => vehicle.plateNumber === selectedRequest?.plateNumber)
          .map((vehicle) => {
            if (vehicle.assignedTo !== null) return vehicle.assignedTo;
            else return null;
          })
          .join(", ")
      }
      onChange={(e) => setAssignedWorkflow(e.target.value)}
    />
  </Form.Group>
</Form>



    <Form>
      <Form.Group as={Col}>
        <Form.Label>Kilometer Reading</Form.Label>
        <Form.Control
          type="number"
           value={selectedRequest?.kilometerOnCounter}
           onChange={(event) => setKilometerOncounter(event.target.value)}
           readOnly
          required
          className="mb-3"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid Amount.
        </Form.Control.Feedback>
      </Form.Group>
     
    
    <Form.Group as={Col} controlId="platenumber">
    <Form.Label>Description</Form.Label>
    <Form.Control
      type="string"
      readOnly
      required
      minLength={9}
      maxLength={9}
      value={selectedRequest?.description}
      onChange={(e) => setCrashType(e.target.value)}
    />
  </Form.Group>
 

<select value={selectedMechanic} required onChange={handleMechanicChange}>
  <option value="">Select a Mechanic</option>
  
  {Array.isArray(mechanics) &&
    mechanics
      .filter((mechanic) => mechanic.role === "ROLE_MECHANIC")
      .map((mechanic) => {
        return (
          <option key={mechanic.id} value={mechanic.id}>
            {mechanic.firstName}
          </option>
        );
      })}
</select>

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
      onClick={() => handleTransferOrder(selectedRequest)}
    >
      Transfer
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
  disabled={startIndex + 7 >= filteredRequests.length}
  block
>
  Next
</Button>

      </div>


    </div>
 );
};
export default GDMaintenanceRequestTables;

