import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../../../api/api";

const RegisterVehicle = () => {
  const [vehicle, setVehicle] = useState({
    modelNo: "",
    chassisNo: "",
    motorNo: "",
    cC: "",
    purchasePrice: "",
    plateNumber: "",
    typeOfFuel: "",
    purchasedDate: "",
    maxPerson: "",
    maxLoad: "",
    maxLitres: "",
    proprietaryIdNumber: "",
    vehicleImage: "",
    assignedTo: "",
  });

  const [succes, setSucces] = useState(null);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    const vehicleInfo = { ...vehicle };
    await api
      .post("/VehicleRecord", { ...vehicleInfo })
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
    <Container breakpoint="lg">
      <Form
        className="form"
        noValidate
        validated={validated}
        checkValidity
        onSubmit={handleSubmit}
      >
        <Row className="mb-3">
          <h3>Vehicle Registration Form</h3>
        </Row>
        <Row className="mb-3">
          <h5>Vehicle Information</h5>
          <hr></hr>
          <br></br>
          <Form.Group as={Col} controlId="modelnumber">
            <Form.Label>Model Number</Form.Label>
            <span> </span>
            <Form.Control
              type="number"
              required
              minLength={3}
              maxLength={25}
              value={vehicle.modelNo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="chassisnumber">
            <span> </span>
            <Form.Label>Chassis Number</Form.Label>

            <Form.Control
              type="number"
              required
              minLength={3}
              maxLength={25}
              value={vehicle.chassisNo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="motornumber">
            <span> </span>
            <Form.Label>Motor Number</Form.Label>
            <Form.Control
              type="number"
              required
              minLength={3}
              maxLength={25}
              value={vehicle.motorNo}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="cc">
            <span> </span>
            <Form.Label>CC</Form.Label>
            <Form.Control
              type="text"
              required
              minLength={3}
              maxLength={25}
              value={vehicle.cC}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="platenumber">
            <span> </span>
            <Form.Label>plate Number</Form.Label>
            <Form.Control
              type="number"
              required
              min={0}
              minLength={3}
              maxLength={25}
              value={vehicle.plateNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="typeoffuel">
            <span> </span>
            <Form.Label>Type Of Fuel</Form.Label>
            <Form.Control
              type="name"
              required
              minLength={3}
              maxLength={25}
              value={vehicle.typeOfFuel}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <br></br>
        <h5>Purchasing Information</h5>
        <hr></hr>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="purchaseprice">
            <span> </span>
            <Form.Label>Purchased Price</Form.Label>

            <Form.Control
              type="number"
              required
              min={1}
              maxLength={10}
              value={vehicle.purchasePrice}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="duedate">
            <span> </span>
            <Form.Label>Purchased Date</Form.Label>

            <Form.Control
              type="date"
              name="purchaseddates"
              required
              value={vehicle.purchasedDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <br></br>
        <h5>Maximum Load Capacity</h5>
        <hr></hr>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="person">
            <span> </span>
            <Form.Label>Person</Form.Label>
            <Form.Control
              type="number"
              name="maxperson"
              required
              min={0}
              max={80}
              value={vehicle.maxPerson}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="person">
            <span> </span>
            <Form.Label>Normal Load (KG)</Form.Label>
            <Form.Control
              type="number"
              name="maxload"
              required
              min={0}
              max={5000}
              value={vehicle.maxLoad}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="Adress">
            <span> </span>
            <Form.Label>Litres</Form.Label>
            <Form.Control
              type="number"
              name="maxlitres"
              required
              min={0}
              max={5000}
              value={vehicle.maxLitres}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <br></br>

        <h5>Proprietary Information</h5>
        <hr></hr>
        <Form.Group className="mb-3" controlId="proprietaryIdNumber">
          <span> </span>
          <Form.Label>Proprietary Id Number</Form.Label>
          <Form.Control
            type="number"
            name="proprietaryIdNumber"
            required
            value={vehicle.proprietaryIdNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="vehicleimage">
          <span> </span>
          <Form.Label>Vehicle Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            name="vehicleimage"
            value={vehicle.vehicleImage}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterVehicle;
