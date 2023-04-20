import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../../../api/api";

const AccessoryRequest = () => {
  const [request, setRequest] = useState({
    plateNumber: "",
    type: "",
    identificationNumber: "",
    quantity: "",
  });

  const [succes, setSucces] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestInformation = { ...request };
    await api
      .post("Request/sparePart", { ...requestInformation })
      .then((response) => {
        if (response.success) {
          setSucces(response.data?.message);
          setError(null);
        } else {
        }
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data?.error);
        setSucces(null);
      });
  };

  return (
    <Container>
      <Row>
        <Form
          onSubmit={handleSubmit}
          className="p-4 rounded shadow-sm bg-white"
        >
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-center mb-4">Send Accessory Request</h2>

            <Form.Group className="mb-3" controlId="plateNumber">
              <Form.Label className="font-weight-bold">
                Plate Number <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Plate Number"
                name="plateNumber"
                value={request.plateNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="type">
              <Form.Label className="font-weight-bold">Vehicle Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={request.type}
                onChange={handleChange}
              >
                <option value="car">Car</option>
                <option value="truck">Truck</option>
                <option value="motorcycle">Motor Cycle</option>
                <option value="bus">Bus</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="id">
              <Form.Label className="font-weight-bold">
                Spare Part Id <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Spare Part Id"
                name="identificationNumber"
                value={request.identificationNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="quantity">
              <Form.Label className="font-weight-bold">
                Quantity <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Enter Quantity"
                name="quantity"
                value={request.quantity}
                onChange={handleChange}
              />
            </Form.Group>

            {error && <p className="text-danger my-2">{error}</p>}
            {succes && <p className="text-success my-2">{succes}</p>}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};

export default AccessoryRequest;
