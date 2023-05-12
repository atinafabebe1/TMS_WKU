import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import api from "../../../api/api";

const RegisterResourceForm = () => {
  const [type, setType] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/Resources?type=${type}`);
      const existingResource = res.data[0];
      if (existingResource) {
        await api.put(`/Resources/${existingResource._id}`, {
          type,
          amount: existingResource.amount + amount,
        });
        setSuccessMessage("Resource updated successfully!");
      } else {
        await api.post("/Resources", { type, amount, unitPrice, totalPrice });
        setSuccessMessage("Resource registered successfully!");
      }
      setErrorMessage("");
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage(err.message);
      console.error(err.message);
    }
  };

  useEffect(() => {
    setTotalPrice(parseFloat(amount) * parseFloat(unitPrice));
  }, [amount, unitPrice]);

  return (
    <Container>
      <div>
        <Form onSubmit={handleSubmit}>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form.Group
            controlId="type"
            style={{ width: "400px", padding: "10px" }}
          >
            <Form.Label>Type:</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select a type</option>
              <option value="Coupon">Coupon</option>
              <option value="Fuel">Fuel</option>
              <option value="Cash">Cash</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            controlId="amount"
            style={{ width: "400px", padding: "10px" }}
          >
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            controlId="amount"
            style={{ width: "400px", padding: "10px" }}
          >
            <Form.Label>Unit Price:</Form.Label>
            <Form.Control
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            controlId="amount"
            style={{ width: "400px", padding: "10px" }}
          >
            <Form.Label>Total Price:</Form.Label>
            <Form.Control type="number" value={totalPrice} disabled={true} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterResourceForm;
