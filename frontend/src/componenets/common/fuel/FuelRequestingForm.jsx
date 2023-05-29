import React, { useState, useEffect } from "react";
import ErrorProvider from "../Provider/ErrorProvider";
import SuccessProvider from "../Provider/SuccessProvider";
import Loading from "../../common/Provider/LoadingProvider";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Form, Button, Modal, Alert, Card, Container } from "react-bootstrap";
import api from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";
import "../css/formStyles.css";

const FuelRequestingForm = ({ title, request, onSubmit }) => {
  const [typeOfFuel, setTypeOfFuel] = useState("");
  const [currentRecordOnCounter, setCurrentRecordOnCounter] = useState("");
  const [requestAmount, setRequestAmount] = useState(0);
  const [plateNumber, setPlateNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [validated, setValidated] = useState(false);
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/user/getuser/${user.id}`);
        setUserData(response.data);
        setPlateNumber(response.data?.driverinfo?.vehiclePlateNumber);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    if (request) {
      setTypeOfFuel(request.type);
      setCurrentRecordOnCounter(request.identificationNumber);
      setRequestAmount(request.quantity);
    } else {
      setTypeOfFuel("");
      setCurrentRecordOnCounter("");
      setRequestAmount("");
    }
  }, [request]);

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
    setTypeOfFuel("");
    setCurrentRecordOnCounter("");
    setRequestAmount("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = {
      plateNumber,
      typeOfFuel,
      currentRecordOnCounter,
      requestAmount,
    };
    if (request) {
      api
        .put(`/Request/fuel/${request._id}?isDeleted=false`, result)
        .then((response) => {
          setIsLoading(false);
          setSuccess("Successfuly Updated");
          setError("");
          onSubmit();
          setTimeout(() => {
            navigate("/driver/request/fuel"); // Navigate to the desired page after 6 seconds
          }, 6000); // Navigate to the desired pagee
        })
        .catch((err) => {
          console.log(err.response.data);
          setIsLoading(false);
          setError(err.response.data);
          setSuccess("");
        });
    } else {
      api
        .post(`/Request/fuel?isDeleted=false`, result)
        .then((response) => {
          setIsLoading(false);
          setSuccess("Successfuly Sent");
          setError("");
          setTimeout(() => {
            navigate("/driver/request/fuel"); // Navigate to the desired page after 6 seconds
          }, 6000); // Navigate to the desired page
        })
        .catch((err) => {
          console.log(err.response.data);
          setIsLoading(false);
          setError("Failed to Send This Request");
          setSuccess("");
        });
    }
  };
  return (
    <Container className="my-3">
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-primary text-light">
              Fuel Requesting Form
            </Card.Header>
            <Card.Body>
              <div>
                <h4 className="mb-3 text-center">{title}</h4>
                {request?.rejectReason && (
                  <p className="text-danger">
                    Kindly be informed that your request has been rejected due
                    to the reason of "{request.rejectReason}". We advise that
                    upon resubmission of your request, you consider modifying
                    the reason to improve your chances of approval. Thank you
                    for your understanding and cooperation.
                  </p>
                )}
                <Form
                  className="form"
                  noValidate
                  validated={validated}
                  onSubmit={handleConfirmation}
                >
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label style={{ color: "#696969" }}>
                        <h6>
                          Fuel Request For Your Vehicle With Plate Number:{" "}
                          <strong>{plateNumber}</strong>
                        </h6>
                      </Form.Label>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className="mb-3" controlId="type">
                      <Form.Label className="form-control-custom">
                        Select Type of Fuel
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="type"
                        required
                        value={typeOfFuel}
                        onChange={(event) => setTypeOfFuel(event.target.value)}
                      >
                        <option value="">Choose</option>
                        <option value="Grease">Grease</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Benzene">Benzene</option>
                        <option value="Motor Oil">Motor Oil</option>
                        <option value="Fren Oil">Fren Oil</option>
                        <option value="Other Oil">Other Oil</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label className="form-control-custom">
                        {" "}
                        Current Record on Counter
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min={0}
                        max={100}
                        value={currentRecordOnCounter}
                        onChange={(event) =>
                          setCurrentRecordOnCounter(event.target.value)
                        }
                        required
                        className="mb-3"
                      />{" "}
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid SparePart Id.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label className="form-control-custom">
                        Request Amount
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        max={100}
                        value={requestAmount}
                        onChange={(event) =>
                          setRequestAmount(event.target.value)
                        }
                        required
                        className="mb-3"
                      />{" "}
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Quantity.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Form>
                {isLoading && <Loading />}
                {error && <ErrorProvider error={error} />}
                {success && <SuccessProvider success={success} />}

                <div className="d-flex justify-content-end my-4">
                  {userData?.driverinfo?.vehiclePlateNumber ===
                  "not-Assigned" ? (
                    <Alert variant="info">
                      Unfortunately, a Vehicle That Is Not Assigned To You
                      Prevents You From Sending a Fuel Request.
                    </Alert>
                  ) : (
                    <>
                      <Button
                        type="reset"
                        size="sm"
                        className="btn-secondary me-2"
                        onClick={(e) => {
                          navigate("/driver/request/fuel");
                        }}
                      >
                        Cancel
                      </Button>{" "}
                      <Button
                        type="reset"
                        size="sm"
                        className="btn-danger me-2"
                        onClick={handleClear}
                      >
                        Clear
                      </Button>
                      <Button
                        type="submit"
                        size="sm"
                        className="btn-primary"
                        onClick={() => {
                          setShowModal(true);
                        }}
                      >
                        Submit
                      </Button>
                    </>
                  )}
                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        Please review the filled data before sending the
                        request:
                      </p>
                      <p>
                        <strong>Type of Fuel:</strong> {typeOfFuel}
                      </p>
                      <p>
                        <strong>Current Record on Counter:</strong>{" "}
                        {currentRecordOnCounter}
                      </p>
                      <p>
                        <strong>Request Amount:</strong> {requestAmount}
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClear}>
                        Clear
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleConfirmation}
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send Request"}
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default FuelRequestingForm;
