import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../../../api/api";

const RegisterVehicle = () => {

  const [modelNo, setModelNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [motorNo, setMotorNo] = useState("");
  const [cC, setCC] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [typeOfFuel, setTypeOfFuel] = useState("");
  const [purchasedDate, setPurchasedDate] = useState("");
  const [maxPerson, setMaxPerson] = useState("");
  const [maxLoad, setMaxLoad] = useState("");
  const [maxLitres, setMaxLitres] = useState("");
  const [proprietaryIdNumber, setProprietaryIdNumber] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    const formData = {
      modelNo,
      chassisNo,
      motorNo,
      cC,
      purchasePrice,
      plateNumber,
      typeOfFuel,
      purchasedDate,
      maxPerson,
      maxLoad,
      maxLitres,
      proprietaryIdNumber,
      vehicleImage,
      assignedTo,
    };
    try {
      const response = await api.post("/VehicleRecord", formData);
      if (response.data.success) {
        setSuccess(response.data.message);
        setError(null);
      } else {
        setError(response.data.error);
        setSuccess(null);
      }
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.error);
      setSuccess(null);
    }
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
              min={1000}
              max={9999}
              value={modelNo}
              onChange={(e) => setModelNo(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="chassisnumber">
            <span> </span>
            <Form.Label>Chassis Number</Form.Label>

            <Form.Control
              type="number"
              required
              min={100000}
              max={999999}
              value={chassisNo}
              onChange={(e) => setChassisNo(e.target.value)}
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
              value={motorNo}
              onChange={(e) => setMotorNo(e.target.value)}

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
              value={cC}
              onChange={(e) => setCC(e.target.value)}

            />
          </Form.Group>
          <Form.Group as={Col} controlId="platenumber">
            <span> </span>
            <Form.Label>plate Number</Form.Label>
            <Form.Control
              type="string"
              required
              min={0}
              minLength={3}
              maxLength={25}
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}

            />
          </Form.Group>
    
          <Form.Group as={Col} controlId="role">
              <Form.Label className="font-weight-bold">Type Of Fuel</Form.Label>
              <Form.Control
                as="select"
                type="name"
                placeholder="Choose"
                required
                value={typeOfFuel}
                onChange={(e) => setTypeOfFuel(e.target.value)}
              >
                
                <option value="diesel">Diesel</option>
                <option value="benzene">Benzene</option>
                <option value="motorOil">Motor Oil</option>
                <option value="frenOil">Fren Oil</option>
                <option value="grease">Grease</option>
                <option value="otherOil">
                Other Oil
                </option>
                
              </Form.Control>
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
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}

            />
          </Form.Group>
          <Form.Group as={Col} controlId="duedate">
            <span> </span>
            <Form.Label>Purchased Date</Form.Label>

            <Form.Control
              type="date"
              name="purchaseddates"
              required
              value={purchasedDate}
              onChange={(e) => setPurchasedDate(e.target.value)}

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
              value={maxPerson}
              onChange={(e) => setMaxPerson(e.target.value)}

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
              value={maxLoad}
              onChange={(e) => setMaxLoad(e.target.value)}

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
              value={maxLitres}
              onChange={(e) => setMaxLitres(e.target.value)}

            />
          </Form.Group>
        </Row>

        <br></br>

        <h5>Proprietary Information</h5>
        <hr></hr>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="proprietaryIdNumber">
          <span> </span>
          <Form.Label>Proprietary Id Number</Form.Label>
          <Form.Control
            type="number"
            name="proprietaryIdNumber"
            required
            value={proprietaryIdNumber}
            onChange={(e) => setProprietaryIdNumber(e.target.value)}

          />
        </Form.Group>
       
        <Form.Group as={Col} controlId="assignedTo">
            <span> </span>
            <Form.Label>Assigned to</Form.Label>
            <Form.Control
              type="text"
              required
              minLength={3}
              maxLength={100}
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </Form.Group>
        <Form.Group as={Col} controlId="vehicleimage">
          <span> </span>
          <Form.Label>Vehicle Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            name="vehicleimage"
            value={vehicleImage}
            onChange={(e) => setVehicleImage(e.target.value)}

          />
        </Form.Group>
        </Row>
        {error && <p className="text-danger my-2">{error}</p>}
            {success && <p className="text-success my-2">{success}</p>}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterVehicle;
