import React, { useState, useEffect } from "react";
import ErrorProvider from "../errorProvider/ErrorProvider";
import SuccessProvider from "../errorProvider/SuccessProvider";
import Loading from "../../common/errorProvider/LoadingProvider";

import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Modal,
} from "react-bootstrap";
import api from "../../../api/api";

const SparePartRequestingForm = ({ title, request, onSubmit }) => {
  const [plateNumber, setPlateNumber] = useState("");
  const [type, setType] = useState("car"); // set default value for vehicle type
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (request) {
      setPlateNumber(request.plateNumber);
      setType(request.type);
      setIdentificationNumber(request.identificationNumber);
      setQuantity(request.quantity);
    } else {
      setPlateNumber("");
      setType("car");
      setIdentificationNumber("");
      setQuantity("");
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
    setType("car");
    setIdentificationNumber("");
    setQuantity("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = {
      plateNumber,
      type,
      identificationNumber,
      quantity,
    };
    if (request) {
      api
        .put(`/Request/sparePart/${request._id}?isDeleted=false`, result)
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

      // try {
      //   await api.put(`/Request/sparePart/${request._id}`, {
      //     status: "pending",
      //   });
      //   const response = await api.get("/Request/sparePart");
      //   console.log(response.data.data);
      // } catch (error) {
      //   console.log(error);
      // }
    } else {
      api
        .post(`/Request/sparePart?isDeleted=false`, result)
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
          <h1 className="mb-3 text-center">{title}</h1>
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
            <FormGroup>
              <FormLabel>Vehicle Plate Number</FormLabel>
              <FormControl
                name="plateNumber"
                value={plateNumber}
                onChange={(event) => setPlateNumber(event.target.value)}
                required
                className="mb-3"
              ></FormControl>{" "}
              <Form.Control.Feedback type="invalid">
                Please provide a valid Plate Number.
              </Form.Control.Feedback>
            </FormGroup>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label className="font-weight-bold">Vehicle Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                required
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="car">Car</option>
                <option value="truck">Truck</option>
                <option value="motorcycle">Motor Cycle</option>
                <option value="bus">Bus</option>
              </Form.Control>
            </Form.Group>
            <FormGroup>
              <FormLabel> Spare Part Id</FormLabel>
              <FormControl
                type="text"
                value={identificationNumber}
                onChange={(event) =>
                  setIdentificationNumber(event.target.value)
                }
                required
                className="mb-3"
              />{" "}
              <Form.Control.Feedback type="invalid">
                Please provide a valid SparePart Id.
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <FormLabel>Quantity</FormLabel>
              <FormControl
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                required
                className="mb-3"
              />{" "}
              <Form.Control.Feedback type="invalid">
                Please provide a valid Quantity.
              </Form.Control.Feedback>
            </FormGroup>
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
export default SparePartRequestingForm;
