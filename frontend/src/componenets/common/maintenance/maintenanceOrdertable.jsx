import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import api from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";

const MaintenanceOrderTable = ({ filter }) => {

  const [identificationNumber, setIdentificationNumber] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [itemsWithVehicle, setItemsWithVehicle] = useState([{ itemDetail: '', quantity: '' }]);


  const [description, setCrashType]=useState("");
  const [plateNumber,setPlateNumber]=useState("");
  const [selectedMechanic, setSelectedMechanic] = useState(); 
  const [mechanics,setMechanics]=useState([]);

  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [approvalModal,setApprovalModal]=useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  const handleItemsChange = (index, field, value) => {
    const newItems = [...itemsWithVehicle];
    newItems[index][field] = value;
    setItemsWithVehicle(newItems);
    const updatedItems = [...itemsWithVehicle];
     updatedItems[index][field] = value;

  // Calculate the total price for the spare part
  if (field === 'unitPrice' || field === 'quantity') {
    const totalPrice = updatedItems[index].unitPrice * updatedItems[index].quantity;
    updatedItems[index].totalPrice = totalPrice;
  }

  // Update the state with the modified array
  setItemsWithVehicle(updatedItems);
  };

  const handleAddItem = () => {
    setItemsWithVehicle([...itemsWithVehicle, { itemDetail: '', quantity: '' }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...itemsWithVehicle];
    newItems.splice(index, 1);
    setItemsWithVehicle(newItems);
  };

  function handleMechanicChange(event) {
    setSelectedMechanic(event.target.value);
    console.log(selectedMechanic);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/user/getuser/${user?.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const myId = userData?.mechanicinfo?._id;

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
    fetchMachanics();
  }, []);
  useEffect(() => {
    api
      .get("/MaintenanceOrder")
      .then((response) => {
        console.log(response.data.data);
        setRequests(response.data.data);
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

  const handleSend=(request)=>{

  }
  const handleApproval=(request)=>{
    setSelectedRequest(request);
    setApprovalModal(true);
  }
  const handleModalClose = () => {
    setShowModal(false);
    setApprovalModal(false);
    setSelectedRequest(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = requests
    .filter((request) => {
      if (filter === "all") {
        return true;
      } else {
        return request.status.toLowerCase() === filter;
      }
    })
    .filter((request) => {
      return request.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((request) => {
      return myId === request.receiver;
    });
    filteredRequests.forEach((request) => {
      console.log("myId:", myId);
      console.log("Receiver:", request.receiver);
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
                  onClick={() => handleApproval(request)}
                >
                  Send for Approvements
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
          <Modal.Title>Maintenance Orders Details</Modal.Title>
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
            <strong>Description:</strong> {selectedRequest?.crashType}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-sm"
            onClick={handleModalClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      

      <Modal show={approvalModal} onHide={handleModalClose} responsive>
  <Modal.Header closeButton>
    <Modal.Title>Send for Approval to Mechanic</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group controlId="platenumber">
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

    <h5>Changed Spare Part</h5>
    <hr />

    {itemsWithVehicle?.map((item, index) => (
      <Form.Group key={index}>
        <Form.Label>
          <strong>Spare #{index + 1}</strong>
        </Form.Label>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 120px', marginRight: '1rem' }}>
            <Form.Label>Spare Part ID</Form.Label>
            <Form.Control
              type="text"
              value={item.itemDetail}
              onChange={(e) => handleItemsChange(index, 'itemDetail', e.target.value)}
              className="mb-3"
            />
          </div>
          <div style={{ flex: '0 0 120px', marginRight: '1rem' }}>
            <Form.Label>Spare Name</Form.Label>
            <Form.Control
              type="text"
              value={item.itemName}
              onChange={(e) => handleItemsChange(index, 'itemName', e.target.value)}
              className="mb-3"
            />
          </div>
          <div style={{ flex: '0 0 120px', marginRight: '1rem' }}>
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="number"
              value={item.unitPrice}
              onChange={(e) => handleItemsChange(index, 'unitPrice', e.target.value)}
              className="mb-3"
            />
          </div>
          <div style={{ flex: '0 0 120px', marginRight: '1rem' }}>
            <Form.Label>Item Quantity</Form.Label>
            <Form.Control
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemsChange(index, 'quantity', e.target.value)}
              className="mb-3"
              min={0}
            />
          </div>
          <div style={{ flex: '0 0 120px', marginRight: '1rem' }}>
            <Form.Label>Total Price</Form.Label>
            <Form.Control
              type="number"
              readOnly
              value={item.totalPrice}
              onChange={(e) => handleItemsChange(index, 'totalPrice', e.target.value)}
              className="mb-3"
              min={0}
            />
          </div>
        </div>
        {index !== 0 && (
          <Button variant="danger" onClick={() => handleRemoveItem(index)} className="mb-3 btn-sm">
            Remove Item
          </Button>
        )}
      </Form.Group>
    ))}

    <Button variant="success" onClick={handleAddItem} className="mb-3 btn-sm">
      Add Item
    </Button>

    <Form.Group controlId="description">
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="string"
        required
        minLength={9}
        maxLength={9}
        value={selectedRequest?.description}
        onChange={(e) => setCrashType(e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="mechanic">
      <Form.Label>Select a Mechanic</Form.Label>
      <Form.Control
        as="select"
        value={selectedMechanic}
        required
        onChange={handleMechanicChange}
      >
        <option value="">Select a Mechanic</option>
        {mechanics
          .filter((mechanic) => mechanic.role === 'ROLE_MECHANIC')
          .map((mechanic) => (
            <option key={mechanic.id} value={mechanic.id}>
              {mechanic.firstName}
            </option>
          ))}
      </Form.Control>
    </Form.Group>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" className="btn btn-sm" onClick={handleModalClose}>
      Cancel
    </Button>
    <Button variant="success" className="btn btn-sm" onClick={() => handleSend(selectedRequest)}>
      Send
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default MaintenanceOrderTable;
