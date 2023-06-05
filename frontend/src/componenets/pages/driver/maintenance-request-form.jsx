import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Modal,
} from "react-bootstrap";
import { Alert, Row, Col, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";

const MaintenanceRequestForm = ({ request }) => {
  const [description, setDescription] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSucces] = useState("");
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [kilometerOnCounter, setKilometerOncounter] = useState("");
  const navigate = useNavigate();
  const [kilometerOnCounterError, setKilometerOnCounterError] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const validateKilometerOnCounter = () => {
    if (kilometerOnCounter < 0) {
      setKilometerOnCounterError("Kilometer reading cannot be negative");
    } else {
      setKilometerOnCounterError("");
    }
  };

  const fetch = async () => {};

  useEffect(() => {
    fetch();
  }, []);

  const handleConfirmation = (event) => {
    event.preventDefault();
    setShowConfirmationModal(false);
    handleSubmit();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/user/getuser/${user?.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user?.id) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    if (request) {
      setDescription(request.description);
      setKilometerOncounter(request.kilometerOnCounter);
    } else {
      setDescription("");
      setKilometerOncounter("");
    }
  }, [request]);

  const myplateNumber = userData?.driverinfo?.vehiclePlateNumber;

  const handleSubmit = () => {
    if (!description || !myplateNumber) {
      setError("Description or kilometer number cannot be empty", myplateNumber);
      setSucces(null);
      return;
    }

    const result = {
      plateNumber: myplateNumber,
      kilometerOnCounter,
      description,
    };

    if (request) {
      // Update
      api
        .put(`/Request/maintenance/${request._id}`, result)
        .then(() => {
          return api.patch(`/Request/maintenance/${request._id}`, {
            status: "pending",
          });
        })
        .then((response) => {
          if (response.statusText === "OK") {
            setSucces(response.data?.message);
            setError(null);
          }

          setDescription("");
          setPlateNumber("");
          setKilometerOncounter("");
          setTimeout(() => {
            navigate("/driver/request/maintenance"); // Navigate to the desired page after 6 seconds
          }, 6000);
        })
        .catch((error) =>
          console.error(
            `Error editing Maintenance request with ID ${request._id}:`,
            error
          )
        );
    } else {
      // New post
      api
        .post(`/Request/maintenance?isDeleted=false`, result)
        .then((response) => {
          if (response.statusText === "OK") {
            setSucces(response.data?.message);
            setError(null);
          }

          setDescription("");
          setPlateNumber("");
          setKilometerOncounter("");
          setTimeout(() => {
            navigate("/driver/request/maintenance"); // Navigate to the desired page after 6 seconds
          }, 6000);
        })
        .catch((err) => {
          console.log(err.response.data);
          setError(err.response.data?.error);
          setSucces(null);
        });
    }
  };

  const handleClear = () => {
    setDescription("");
    setPlateNumber("");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-primary text-light">
              Maintenance Requesting Form
            </Card.Header>
            <Card.Body>
              <div className="container my-5">
                {request?.rejectReason && (
                  <p className="text-danger">
                    Kindly be informed that your request has been rejected due
                    to the reason of "{request.rejectReason}". We advise that
                    upon resubmission of your request, you consider modifying
                    the reason to improve your chances of approval. Thank you
                    for your understanding and cooperation.
                  </p>
                )}
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <Form onSubmit={handleConfirmation}>
                      <FormGroup>
                        <FormLabel>Plate Number</FormLabel>
                        <FormControl
                          type="text"
                          value={myplateNumber}
                          onChange={(event) =>
                            setPlateNumber(event.target.value)
                          }
                          required
                          readOnly
                          className="mb-3"
                        />
                        <Form.Label>Kilometer Reading</Form.Label>
                        <Form.Control
                          type="number"
                          value={kilometerOnCounter}
                          onChange={(event) =>
                            setKilometerOncounter(event.target.value)
                          }
                          onBlur={validateKilometerOnCounter}
                          required
                          min={0}
                          className="mb-3"
                        />
                        {kilometerOnCounterError && (
                          <p className="text-danger">
                            {kilometerOnCounterError}
                          </p>
                        )}

                        <FormLabel>Description</FormLabel>
                        <FormControl
                          type="text"
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                          required
                          className="mb-3"
                        />
                      </FormGroup>

                      {error && <p className="text-danger">{error}</p>}
                      {success && <p className="text-success">{success}</p>}

                      <div className="d-flex justify-content-end my-4">
                        <Button
                          className="btn-secondary me-2"
                          onClick={(e) => {
                            navigate("/driver/request/maintenance");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="reset"
                          className="btn-danger me-2"
                          onClick={handleClear}
                        >
                          Clear
                        </Button>
                        <Button
                          type="submit"
                          className="btn-primary"
                          onClick={() => {
                            setShowConfirmationModal(true);
                          }}
                        >
                          Submit
                        </Button>

                        <Modal
                          show={showConfirmationModal}
                          onHide={() => {
                            setShowConfirmationModal(false);
                          }}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Confirm Submission</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you want to submit this request?
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={(e) => {
                                setShowConfirmationModal(false);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="primary"
                              onClick={handleConfirmation}
                            >
                              Submit
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MaintenanceRequestForm;
