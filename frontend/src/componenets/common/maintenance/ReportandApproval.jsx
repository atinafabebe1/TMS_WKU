import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Alert, Card, Container } from 'react-bootstrap';

import api from '../../../api/api';

const MaintenanceReportForm = () => {
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState("");

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

  const [reportData, setReportData] = useState({
    plateNumber: '',
    spareparts: [
      {
        spareId: '',
        spareName: '',
        itemPrice: 0,
        quantity: 0,
        totalPrice: 0,
      },
    ],
    exchangedMaintenanceTotalPrice: 0,
    examination: '',
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.includes('spareparts')) {
      const parts = [...reportData.spareparts];
      parts[index][name.split('.')[1]] = value;
      parts[index].totalPrice = calculateTotalPrice(parts[index]);
      const exchangedMaintenanceTotalPrice = parts.reduce(
        (total, part) => total + part.totalPrice,
        0
      );
      setReportData((prevData) => ({
        ...prevData,
        spareparts: parts,
        exchangedMaintenanceTotalPrice,
      }));
    } else {
      setReportData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const calculateTotalPrice = (part) => {
    return part.itemPrice * part.quantity;
  };

  const handleAddItem = () => {
    setReportData((prevData) => ({
      ...prevData,
      spareparts: [
        ...prevData.spareparts,
        {
          spareId: '',
          spareName: '',
          itemPrice: 0,
          quantity: 0,
          totalPrice: 0,
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(reportData);
    try {
      const response = await api.post('/MaintenanceReport', { ...reportData,
        expertExamined: selectedMechanic }
      );
      console.log('Maintenance report submitted successfully:', response.data);
      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error('Failed to submit maintenance report:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-primary text-light">
              Maintenance Report Need For Approval
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="plateNumber">
                  <Form.Label column sm={2}>
                    Plate Number:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="plateNumber"
                      value={reportData.plateNumber}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Form.Group>

                {reportData.spareparts.map((part, index) => (
                  <div key={index}>
                    <h3>Spare Part {index + 1}</h3>

                    <Row>
                      <Col sm={4}>
                        <Form.Group controlId={`spareId_${index}`}>
                          <Form.Label>Spare ID:</Form.Label>
                          <Form.Control
                            type="text"
                            name={`spareparts[${index}].spareId`}
                            value={part.spareId}
                            onChange={(e) => handleChange(e, index)}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col sm={4}>
                        <Form.Group controlId={`spareName_${index}`}>
                          <Form.Label>Spare Name:</Form.Label>
                          <Form.Control
                            type="text"
                            name={`spareparts[${index}].spareName`}
                            value={part.spareName}
                            onChange={(e) => handleChange(e, index)}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col sm={4}>
                        <Form.Group controlId={`itemPrice_${index}`}>
                          <Form.Label>Item Price:</Form.Label>
                          <Form.Control
                            type="number"
                            name={`spareparts[${index}].itemPrice`}
                            value={part.itemPrice}
                            onChange={(e) => handleChange(e, index)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={4}>
                        <Form.Group controlId={`quantity_${index}`}>
                          <Form.Label>Quantity:</Form.Label>
                          <Form.Control
                            type="number"
                            name={`spareparts[${index}].quantity`}
                            value={part.quantity}
                            onChange={(e) => handleChange(e, index)}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col sm={8}>
                        <Form.Group controlId={`totalPrice_${index}`}>
                          <Form.Label>Total Price:</Form.Label>
                          <Form.Control
                            plaintext
                            readOnly
                            value={`${part.totalPrice.toFixed(2)}`}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                ))}
<br></br>
                <Button variant="secondary" onClick={handleAddItem}>
                  Add Item
                </Button>
                <br></br>
                <Form.Group as={Row} controlId="exchangedMaintenanceTotalPrice">
                  <Form.Label column sm={8}>
                    Exchanged Maintenance Total Price:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="number"
                      name="exchangedMaintenanceTotalPrice"
                      value={reportData.exchangedMaintenanceTotalPrice}
                      onChange={handleChange}
                      required
                      readOnly
                    />
                  </Col>
                </Form.Group>
                <br></br>
                <Form.Group as={Row} controlId="examination">
                  <Form.Label column sm={4}>
                    Examination:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="textarea"
                      name="examination"
                      value={reportData.examination}
                      onChange={handleChange}
                      required
                    />
                  </Col>
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
    <br></br>
                <Button type="submit">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MaintenanceReportForm;
