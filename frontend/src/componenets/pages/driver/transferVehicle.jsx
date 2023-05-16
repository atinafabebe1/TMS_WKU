import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import api from '../../../api/api';

const TransferVehiclePage = () => {
  const [newDriver, setNewDriver] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [receiverData, setReceiverData] = useState([]);

  useEffect(() => {
    fetchVehicles();
    fetchReceiver();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/VehicleRecord?select=plateNumber,maxPerson,typeOfFuel');
      setVehicles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReceiver = async () => {
    try {
      const response = await api.get('/user/getusers?select=role,firstName,lastName');
      const filteredReceivers = response.data.data.filter(receiver => receiver.role === 'ROLE_DRIVER');
      setReceiverData(filteredReceivers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewDriverChange = (event) => {
    setNewDriver(event.target.value);
  };

  const handlePlateNumberChange = (event) => {
    setPlateNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the transfer logic here, e.g., update a database or send a request to an API
    console.log(`Transfer vehicle to ${newDriver}`);
    // Reset the form
    setNewDriver('');
    setPlateNumber('');
  };

  return (
    <div className="text-center">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <h1>Transfer Vehicle</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="newDriver">
              <Form.Label>Select Receiver</Form.Label>
              <Form.Control as="select" value={newDriver} onChange={handleNewDriverChange}>
                <option value="">Select</option>
                {receiverData.map((receiver) => (
                  <option key={receiver.id} value={receiver.id}>
                    {receiver.firstName} {receiver.lastName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="plateNumber">
              <Form.Label>Vehicle</Form.Label>
              <Form.Control
                as="select"
                value={plateNumber}
                onChange={handlePlateNumberChange}
                required
                className="mb-3"
              >
                <option value="">Select a Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option
                    key={vehicle.plateNumber}
                    value={vehicle.plateNumber}
                    title={`Max person load: ${vehicle.maxPerson}\nFuel type: ${vehicle.typeOfFuel}`}
                  >
                    {vehicle.plateNumber}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>Transfer</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default TransferVehiclePage;