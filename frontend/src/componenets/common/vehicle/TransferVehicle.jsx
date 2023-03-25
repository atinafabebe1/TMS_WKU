import {Form, Row, Col} from "react-bootstrap";
import {Button , Container} from "react-bootstrap";
import React, { useState } from "react";


const TransferVehicle = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
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
                <h3>Vehicle Transfer Form</h3>
              </Row>
              <Row className="mb-3">
                <h5>Transfer Vehicle information</h5>
                <hr></hr>
                <br></br>
                <Form.Group as={Col} controlId="user" className="col col-sm-6">
                  <span> </span>
                  <Form.Label>User</Form.Label>
                  <Form.Control
                    type="id"
                    required
                    minLength={3}
                    maxLength={25}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="chassisnumber">
                  <span> </span>
                  <Form.Label>Reciever</Form.Label>
                  <Form.Control
                    type="id"
                    required
                    minLength={3}
                    maxLength={25}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="cc">
                  <span> </span>
                  <Form.Label>Vehicle</Form.Label>
                  <Form.Control
                    type="id"
                    required
                    minLength={3}
                    maxLength={25}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="duedate">
                  <span> </span>

                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="purchaseddates" required />
                </Form.Group>
                <Form.Group as={Col} controlId="modelof vehicle">
                  <span> </span>
                  <Form.Label>Model of Vehicle</Form.Label>
                  <Form.Control
                    type="name"
                    required
                    minLength={3}
                    maxLength={25}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="platenumber">
                  <span> </span>
                  <Form.Label>Plate Number</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    minLength={7}
                    maxLength={12}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="Status">
                  <span> </span>
                  <Form.Label>Status</Form.Label>
                  <Form.Select as={Col} defaultValue={"Choose..."} required>
                    <option value="Waiting Approval">Waiting Approval</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Approved">Approved</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">
                Done
              </Button>
            </Form>
          </Container>
  );
};
export default TransferVehicle;
