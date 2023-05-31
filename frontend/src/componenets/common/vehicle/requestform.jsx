import React, { useState, useEffect } from "react";
import ErrorProvider from "../Provider/ErrorProvider";
import SuccessProvider from "../Provider/SuccessProvider";
import { Link, useNavigate } from "react-router-dom";

import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Modal,
  FormCheck,
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";
import api from "../../../api/api";

const VehicleRequestForm = ({ title, request, onSubmit }) => {
  const [passengers, setPassengers] = useState([{ name: "" }]);
  const [destination, setDestination] = useState("");
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [driver, setDriver] = useState("");
  const [error, setError] = useState("");
  const [success, setSucces] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  //fetch vehicle information
  const fetch = async () => {
    api
      .get("/VehicleRecord?select=plateNumber,maxPerson,typeOfFuel")
      .then((response) => {
        setVehicles(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (request) {
      console.log(request.date);
      setPassengers(request.passengers);
      setDestination(request.destination);
      setReason(request.reason);

      if (request.date && request.date.from) {
        setFromDate(new Date(request.date.from).toISOString().substring(0, 10));
      }
      if (request.date && request.date.to) {
        setToDate(new Date(request.date.to).toISOString().substring(0, 10));
      }

      setPlateNumber(request.plateNumber);
      setDriver(request.driver);
    }
  }, [request]);

  const handlePassengerNameChange = (index, event) => {
    const newPassengers = [...passengers];
    newPassengers[index].name = event.target.value;
    setPassengers(newPassengers);
  };

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: "" }]);
  };

  const handleRemovePassenger = (index) => {
    const newPassengers = [...passengers];
    newPassengers.splice(index, 1);
    setPassengers(newPassengers);
  };

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

  const handleFromDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    if (selectedDate >= currentDate) {
      setFromDate(event.target.value);
    }
  };

  const handleToDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const fromDateObj = new Date(fromDate);
    const currentDate = new Date();

    if (selectedDate >= currentDate && selectedDate > fromDateObj) {
      setToDate(event.target.value);
    }
  };

  const handleSubmit = () => {
    const result = {
      passengers,
      plateNumber,
      destination,
      reason,
      date: { from: fromDate, to: toDate },
      driver,
    };
    if (request) {
      if (validated) {
        api
          .put(`/Request/vehicle/${request._id}?isDeleted=false`, result)
          .then((response) => {
            if (response.statusText === "OK") {
              setSucces("Successfuly Sent");
              setError("");
              setTimeout(() => {
                navigate("/employee/request/vehicle"); // Navigate to the desired page after 6 seconds
              }, 6000);
            }
            onSubmit();
          })
          .catch((err) => {
            console.log(err.response.data);
            setError("");
            setSucces("Please Provide Valid Data And Try Again");
          });
      } else {
        api
          .post(`/Request/vehicle?isDeleted=false`, result)
          .then((response) => {
            if (response.statusText === "OK") {
              setSucces("Successfuly Sent");
              setError(null);
              setTimeout(() => {
                navigate("/employee/request/vehicle"); // Navigate to the desired page after 6 seconds
              }, 6000);
            }
            setPassengers([{ name: "" }]);
            setDestination("");
            setReason("");
            setFromDate("");
            setToDate("");
            setPlateNumber("");
            setShowModal();
            setDriver("");
          })
          .catch((err) => {
            console.log(err.response.data);
            setError("Please Provide Valid Data And Try Again");
            setSucces("");
          });
      }
    }
  };
  const handleClear = () => {
    setPlateNumber("");
    setPassengers([{ name: "" }]);
    setDestination("");
    setReason("");
    setFromDate("");
    setToDate("");
  };

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-primary text-light">
              <h5 style={{ textAlign: "center" }}>{title}</h5>
            </Card.Header>
            <Card.Body>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  {request?.rejectReason && (
                    <div>
                      <hr></hr>
                      <p
                        className="text-danger"
                        style={{ textAlign: "center" }}
                      >
                        Kindly be informed that your request has been rejected
                        due to the reason of{" "}
                        <strong>"{request.rejectReason}"</strong>. We advise
                        that upon resubmission of your request, you consider
                        modifying the reason to improve your chances of
                        approval. Thank you for your understanding and
                        cooperation.
                      </p>
                    </div>
                  )}
                  <hr></hr>
                  <br></br>

                  <Form
                    style={{ padding: "10px" }}
                    noValidate
                    validated={validated}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <Row>
                      <FormGroup as={Col}>
                        <FormLabel className="form-control-custom">
                          Vehicle
                        </FormLabel>
                        <FormControl
                          as="select"
                          value={plateNumber}
                          onChange={(event) =>
                            setPlateNumber(event.target.value)
                          }
                          required
                        >
                          <option value="">Select a Vehicle</option>
                          {vehicles?.map((vehicle) => (
                            <option
                              key={vehicle.plateNumber}
                              value={vehicle.plateNumber}
                              title={`Max person load: ${vehicle.maxPerson}\nFuel type: ${vehicle.typeOfFuel}`}
                            >
                              {vehicle.plateNumber}
                            </option>
                          ))}
                        </FormControl>{" "}
                        <Form.Control.Feedback type="invalid">
                          Please Select Vehicle.
                        </Form.Control.Feedback>
                      </FormGroup>
                      <FormGroup as={Col}>
                        <FormLabel className="form-control-custom">
                          Destination
                        </FormLabel>
                        <FormControl
                          type="text"
                          minLength={3}
                          maxLength={35}
                          value={destination}
                          onChange={(event) =>
                            setDestination(event.target.value)
                          }
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Provide Valid Data.
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Row>
                    <br></br>
                    <FormGroup className="mb-3">
                      <FormLabel className="form-control-custom">
                        Driver Selection:{" "}
                      </FormLabel>
                      <div>
                        {/* <FormCheck
                  type="radio"
                  id="selectDriver"
                  label="Select Driver"
                  value="selectDriver"
                  checked={driver === "selectDriver"}
                  onChange={(e) => setDriver(e.target.value)}
                /> */}
                        <FormCheck
                          type="checkbox"
                          id="drive"
                          label="I will be the driver"
                          value="drive"
                          checked={driver === "drive"}
                          onChange={(e) =>
                            setDriver(e.target.checked ? e.target.value : "")
                          }
                        />
                      </div>
                    </FormGroup>

                    <Row>
                      {passengers?.map((passenger, index) => (
                        <Col md={6} key={index}>
                          <FormGroup>
                            <FormLabel className="form-control-custom">
                              Passenger #{index + 1}
                            </FormLabel>
                            <FormControl
                              type="text"
                              value={passenger.name}
                              onChange={(event) =>
                                handlePassengerNameChange(index, event)
                              }
                              pattern="[A-Za-z]+\s+[A-Za-z]+"
                              required
                              className="mb-3"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid full name in the format of
                              "FirstName LastName".
                            </Form.Control.Feedback>

                            {index !== 0 && (
                              <Button
                                variant="danger"
                                onClick={() => handleRemovePassenger(index)}
                                className="mb-3 btn-sm"
                              >
                                Remove Passenger
                              </Button>
                            )}
                          </FormGroup>
                        </Col>
                      ))}
                    </Row>

                    <Button
                      variant="success"
                      onClick={handleAddPassenger}
                      className="mb-3 btn-sm"
                    >
                      Add Passenger
                    </Button>

                    <FormGroup as={Col}>
                      <FormLabel className="form-control-custom">
                        Reason
                      </FormLabel>
                      <FormControl
                        as={"textarea"}
                        type="text"
                        required
                        minLength={30}
                        maxLength={500}
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        className="mb-3"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Provide Valid Reason. Reason must be described by
                        more than 30 and less than 500 characters
                      </Form.Control.Feedback>
                    </FormGroup>
                    <br></br>
                    <Row>
                      <FormGroup as={Col}>
                        <FormLabel className="form-control-custom">
                          Date of Use (From)
                        </FormLabel>
                        <FormControl
                          type="date"
                          value={fromDate}
                          onChange={handleFromDateChange}
                          required
                          className="mb-3"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Provide Valid Date. Date Must be Future.
                        </Form.Control.Feedback>
                      </FormGroup>
                      <FormGroup as={Col}>
                        <FormLabel className="form-control-custom">
                          Date of Use (To)
                        </FormLabel>
                        <FormControl
                          type="date"
                          value={toDate}
                          onChange={handleToDateChange}
                          required
                          className="mb-3"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Provide Valid Data. Date Must Be Future and
                          After From Date
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Row>
                    {error && <ErrorProvider error={error} />}
                    {success && <SuccessProvider success={success} />}
                    <hr></hr>
                    <div className="d-flex justify-content-center my-4">
                      <Button
                        className="btn-secondary me-2"
                        onClick={(e) => {
                          navigate("/employee/request/vehicle");
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
                          setShowModal(true);
                        }}
                      >
                        Submit
                      </Button>
                      <Modal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className="form-control-custom">
                            Confirm Submission
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Are you sure you want to submit this request?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default VehicleRequestForm;
