import React, { useState, useEffect } from "react";
import ErrorProvider from "../Provider/ErrorProvider";
import SuccessProvider from "../Provider/SuccessProvider";
import Loading from "../../common/Provider/LoadingProvider";
import { Row, Col } from "react-bootstrap";
import { Form, Button, Modal } from "react-bootstrap";
import api from "../../../api/api";
import "../css/formStyles.css";

const FuelRequestingForm = ({ title, request, onSubmit }) => {
  const [plateNumber, setPlateNumber] = useState("");
  const [typeOfFuel, setTypeOfFuel] = useState("");
  const [currentRecordOnCounter, setCurrentRecordOnCounter] = useState("");
  const [requestAmount, setRequestAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (request) {
      setPlateNumber(request.plateNumber);
      setTypeOfFuel(request.type);
      setCurrentRecordOnCounter(request.identificationNumber);
      setRequestAmount(request.quantity);
    } else {
      setPlateNumber("");
      setTypeOfFuel("");
      setCurrentRecordOnCounter("");
      setRequestAmount("");
    }
  }, [request]);
  //handle validation and confirmation
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
    setPlateNumber("");
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
          setError(null);
          onSubmit();
        })
        .catch((err) => {
          console.log(err.response.data);
          setIsLoading(false);
          setError("Please Provide Valid Data and Try Again");
          setSuccess(null);
        });
    } else {
      api
        .post(`/Request/fuel?isDeleted=false`, result)
        .then((response) => {
          setIsLoading(false);
          setSuccess("Successfuly Sent");
          setError(null);
        })
        .catch((err) => {
          console.log(err.response.data);
          setIsLoading(false);
          setError("Please Provide Valid Data and Try Again");
          setSuccess(null);
        });
    }
  };

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h4 className="mb-3 text-center">{title}</h4>
          {request?.rejectReason && (
            <p className="text-danger">
              Kindly be informed that your request has been rejected due to the
              reason of "{request.rejectReason}". We advise that upon
              resubmission of your request, you consider modifying the reason to
              improve your chances of approval. Thank you for your understanding
              and cooperation.
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
                <Form.Label className="form-control-custom">
                  Vehicle Plate Number
                </Form.Label>
                <Form.Control
                  name="plateNumber"
                  value={plateNumber}
                  onChange={(event) => setPlateNumber(event.target.value)}
                  required
                  className="mb-3"
                ></Form.Control>{" "}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Plate Number.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="type">
                <Form.Label className="form-control-custom">
                  Type of Fuel
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
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label className="form-control-custom">
                  {" "}
                  Current Record on Counter
                </Form.Label>
                <Form.Control
                  type="number"
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
                  value={requestAmount}
                  onChange={(event) => setRequestAmount(event.target.value)}
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
            <Button className="btn-secondary me-2">Cancel</Button>
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
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Submission</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to submit this request?
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
export default FuelRequestingForm;
