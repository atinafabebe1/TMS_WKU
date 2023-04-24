import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import api from "../../../api/api";

const AssignVehicleForm = ({ title, data, onSubmit }) => {
  const [assignedTo, setAssignedTo] = useState([
    { project: null },
    { task: null },
    { serviceType: null },
    { commonService: null },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (data) {
      setAssignedTo(data.assignedTo);
    } else {
      setAssignedTo([
        { project: null },
        { task: null },
        { serviceType: null },
        { commonService: null },
      ]);
    }
  }, [data]);

  const handleConfirmation = (event) => {
    event.preventDefault();
    setShowModal(false);
    handleSubmit();
  };

  const handleCancel = () => {
    setAssignedTo([
      { project: null },
      { task: null },
      { serviceType: null },
      { commonService: null },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const result = {
        assignedTo,
      };
      let response;

      response = await api.put(
        `/VehicleRecord/${data._id}?isDeleted=false`,
        result
      );

      if (response.status === 200) {
        setSuccess(response.data?.message);
        setError("");
        onSubmit();
      }
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
            <Form className="form" onSubmit={() => setShowModal(true)}>
              <Row className="mb-3">
                <h5>Assign Vehicle Information</h5>
                <hr></hr>
                <br></br>
                <Form.Group as={Col} controlId="assignedTo">
                  <Form.Label>Task</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={assignedTo.task}
                    onChange={(e) =>
                      setAssignedTo((prev) => ({
                        ...prev,
                        task: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="assignedTo">
                  <Form.Label>Project</Form.Label>
                  <Form.Control
                    type="text"
                    value={assignedTo.project}
                    onChange={(e) =>
                      setAssignedTo((prev) => ({
                        ...prev,
                        project: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="serviceType">
                  <Form.Label>Service Type</Form.Label>
                  <Form.Control
                    type="text"
                    value={assignedTo.serviceType}
                    onChange={(e) =>
                      setAssignedTo((prev) => ({
                        ...prev,
                        serviceType: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Row>
            </Form>
          </Container>

          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <div className="d-flex justify-content-end my-4">
            <Button className="btn-secondary me-2">Cancel</Button>
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
                Are you sure you want to Assign th vehicle for {assignedTo}?
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
