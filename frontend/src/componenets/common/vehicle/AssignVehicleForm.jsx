import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SuccessProvider from "../Provider/SuccessProvider";
import ErrorProvider from "../Provider/ErrorProvider";

import api from "../../../api/api";

const AssignVehicleForm = ({ title, data, onSubmit }) => {
  const [assignedTo, setAssignedTo] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setAssignedTo(data.assignedTo);
    } else {
      setAssignedTo(null);
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
    handleAssign();
  };

  const handleCancel = () => {
    setAssignedTo("");
  };

  const handleAssign = async () => {
    try {
      const result = {
        assignedTo,
      };
      let response;
      response = await api.put(
        `/VehicleRecord/${data._id}?isDeleted=false`,
        result
      );
      setSuccess("Successfuly Assigned");
      setError("");
      onSubmit();
    } catch (err) {
      setError(err.response.data?.error);
      setSuccess("");
    }
  };

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h3 className="mb-3 text-center">{title}</h3>

          <Container breakpoint="lg">
            <Form
              className="form"
              noValidate
              validated={validated}
              onSubmit={handleConfirmation}
            >
              <Row className="mb-3">
                <h5>Assign Vehicle Information</h5>
                <hr></hr>
                <br></br>
                <Form.Group as={Col} controlId="assignedTo">
                  <Form.Label>Assigned To</Form.Label>
                  <Form.Control
                    as={"textarea"}
                    type="text"
                    required
                    minLength={3}
                    maxLength={200}
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Task.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Form>
          </Container>

          {error && <ErrorProvider error={error} />}
          {success && <SuccessProvider success={success} />}

          <div className="d-flex justify-content-end my-4">
            <Button
              className="btn-secondary me-2"
              variant="secondary"
              onClick={() => navigate(`/hd/vehicles`)}
            >
              Cancel
            </Button>
            <Button
              type="reset"
              className="btn-danger me-2"
              onClick={handleCancel}
            >
              Clear
            </Button>
            <Button
              type="submit"
              className="btn-primary"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Assign
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Submission</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to Assign this vehicle for {assignedTo}?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirmation}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssignVehicleForm;
