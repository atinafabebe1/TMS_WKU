import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorProvider from "../Provider/ErrorProvider";
import SuccessProvider from "../Provider/SuccessProvider";
import api from "../../../api/api";

const FuelCost = ({ title, data, onSubmit }) => {
  const [fuelCostData, setFuelCostData] = useState({
    type: "",
    unitPrice: "",
    totalPrice: "",
    amount: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setFuelCostData(data);
    } else {
      setFuelCostData({
        type: "",
        unitPrice: "",
        totalPrice: "",
        amount: "",
      });
    }
  }, [data]);

  const handleConfirmation = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    setShowModal(false);
    handleSubmit();
  };

  const handleClear = (event) => {
    setFuelCostData({
      type: "",
      unitPrice: "",
      totalPrice: "",
      amount: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFuelCostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (data) {
        await api.put(`/Resources/${data._id}`, fuelCostData);
        setSuccess("Fuel Cost Updated Successfully.");
        setTimeout(() => {
          navigate(""); // Navigate to the desired page after 6 seconds
        }, 6000);
      } else {
        await api.post("/Resources/", fuelCostData);
        setSuccess("Fuel Registered Successfully.");
      }
      onSubmit();
      setError("");
    } catch (error) {}
  };

  return (
    <Container>
      <h6
        className="form-control-custom"
        style={{ textAlign: "center", padding: "10px" }}
      >
        Register Fuel And Cost
      </h6>
      <hr></hr>
      <Form
        style={{ padding: "10px" }}
        noValidate
        validated={validated}
        onSubmit={(e) => e.preventDefault()}
      >
        <Row>
          <Col>
            <Form.Group controlId="type">
              <Form.Label className="form-control-custom">Type</Form.Label>
              <Form.Control
                as="select"
                type="text"
                placeholder="Choose"
                required
                name="type"
                value={fuelCostData.type}
                onChange={handleInputChange}
              >
                <option value="">Select a type</option>
                <option value="Fuel">Fuel</option>
                <option value="Benzene">Benzene</option>
                <option value="Petrol">Petrol</option>
                <option value="Kerosene">Kerosene</option>
                <option value="Biodiesel">Biodiesel</option>
                <option value="Diesel">Diesel</option>
                <option value="Gear oil">Gear oil</option>
                <option value="Fren Oil">Fren Oil</option>
                <option value="Grease">Grease</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide the vehicle type.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Form.Group as={Col} controlId="motornumber">
            <span> </span>
            <Form.Label className="form-control-custom">Amount</Form.Label>
            <Form.Control
              min={0}
              type="number"
              required
              minLength={3}
              maxLength={25}
              name="amount"
              value={fuelCostData.amount}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Motor Number.
            </Form.Control.Feedback>
          </Form.Group>
          <Col>
            <Form.Group controlId="chassisNo">
              <Form.Label className="form-control-custom">
                Unit Price
              </Form.Label>
              <Form.Control
                type="number"
                required
                min={1}
                max={1000000}
                name="unitPrice"
                value={fuelCostData.unitPrice}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the chassis number.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div style={{ paddingTop: "10px" }}>
          {error && <ErrorProvider error={error} />}
          {success && <SuccessProvider success={success} />}
        </div>
      </Form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Row>
          <Col>
            <Button
              variant="secondary"
              onClick={(e) => {
                navigate("/hd/fuel");
              }}
            >
              Cancel
            </Button>{" "}
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Submit
            </Button>{" "}
            <Button variant="danger" onClick={handleClear}>
              Clear
            </Button>{" "}
          </Col>
        </Row>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="form-control-custom">
            Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="form-control-custom">
          Are you sure you want to submit the form?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmation}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FuelCost;
