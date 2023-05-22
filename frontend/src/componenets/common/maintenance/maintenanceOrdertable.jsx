import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import api from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";

const MaintenanceOrderTable = ({ filter,data }) => {

  const [spareparts, setSparePart] = useState([{identificationNumber:'', itemName: '', itemPrice: '', itemQuantity:'',
  totalPrice: '' }]);
  const [exchangedMaintenanceTotalPrice, setExchangedMaintenanceTotalPrice]=useState(0);
  const [examination, setExamination]=useState("");
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
  useEffect(() => {
    if (data) {
      setPlateNumber(data.plateNumber);
      setSparePart(data.spareparts);
    } else {
      setPlateNumber('');
      setSparePart([{identificationNumber:'', itemName: '', itemPrice: '', itemQuantity:'',
      totalPrice: '' }]);
    }
  }, [data]);
  const handleItemsChange = (index, field, value) => {
    const newItems = [...spareparts];
    newItems[index][field] = value;
    setSparePart(newItems);
  
    const updatedItems = [...spareparts];
    updatedItems[index][field] = value;
  
    // Calculate the total price for the spare part
    if (field === 'itemPrice' || field === 'itemQuantity') {
      const totalPrice = updatedItems[index].itemPrice * updatedItems[index].itemQuantity;
      updatedItems[index].totalPrice = totalPrice;
    }
  
    // Update the state with the modified array
    setSparePart(updatedItems);
  
    // Calculate the overall total
    let total = 0;
    updatedItems.forEach(item => {
      total += item.totalPrice || 0;
    });
    setExchangedMaintenanceTotalPrice(total);
  };
  
  const handleAddItem = () => {
    setSparePart([...spareparts, {identificationNumber:'', itemName: '', itemPrice: '', itemQuantity:'',
    totalPrice: '' }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...spareparts];
    newItems.splice(index, 1);
    setSparePart(newItems);
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

  const handleSend = async (event) => {
event.preventDefault();
      const maintenanceReport = {
        plateNumber,
        spareparts,
        examination,
        exchangedMaintenanceTotalPrice,
        expertWorked: selectedMechanic,
       
      };
  
      try {
        const response = await api.post("/MaintenanceReport", maintenanceReport);
        console.log("Maintenance report submitted successfully:", response.data);

  
      } catch (error) {
        console.error("Error submitting maintenance order:", error);
      }
    };
  
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

    {spareparts?.map((item, index) => (
      <Form.Group key={index}>
        <Form.Label>
          <strong>Spare #{index + 1}</strong>
        </Form.Label>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 120px', marginRight: '1rem' }}>
            <Form.Label>Spare Part ID</Form.Label>
            <Form.Control
              type="text"
              value={item.identificationNumber}
              onChange={(e) => handleItemsChange(index, 'identificationNumber', e.target.value)}
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
              value={item.itemPrice}
              onChange={(e) => handleItemsChange(index, 'itemPrice', e.target.value)}
              className="mb-3"
              min={0}
            />
          </div>
          <div style={{ flex: '0 0 120px', marginRight: '1rem' }}>
            <Form.Label>Item Quantity</Form.Label>
            <Form.Control
              type="number"
              value={item.itemQuantity}
              onChange={(e) => handleItemsChange(index, 'itemQuantity', e.target.value)}
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
    <div>
  <strong>Overall Total: </strong>
  {exchangedMaintenanceTotalPrice}
</div>
    <Form.Group controlId="description">
      <Form.Label>Examination</Form.Label>
      <Form.Control
        type="string"
        required
        value={examination}
        onChange={(e) => setExamination(e.target.value)}
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
    <Button variant="success" className="btn btn-sm" onClick={() => handleSend()}>
      Send
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default MaintenanceOrderTable;
