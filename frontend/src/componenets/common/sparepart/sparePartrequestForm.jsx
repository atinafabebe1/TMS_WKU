import React, { useState, useEffect } from "react";
import ErrorProvider from "../errorProvider/ErrorProvider";
import SuccessProvider from "../errorProvider/SuccessProvider";
import Loading from "../../common/errorProvider/LoadingProvider";
import { Row, Col } from "react-bootstrap";
import { Form, Button, Modal } from "react-bootstrap";
import api from "../../../api/api";

const SparePartRequestingForm = ({ title, request, onSubmit }) => {
  const [plateNumber, setPlateNumber] = useState("");
  const [type, setType] = useState("car"); // set default value for vehicle type
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
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
      setUnitPrice(request.unitPrice);
      setTotalPrice(request.totalPrice);
    } else {
      setPlateNumber("");
      setType("car");
      setIdentificationNumber("");
      setQuantity("");
      setUnitPrice("");
      setTotalPrice("");
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
    setUnitPrice("");
    setTotalPrice("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = {
      plateNumber,
      type,
      identificationNumber,
      quantity,
      unitPrice,
      totalPrice,
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

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * unitPrice);
  };

  const handleUnitPriceChange = (event) => {
    const newUnitPrice = parseFloat(event.target.value);
    setUnitPrice(newUnitPrice);
    setTotalPrice(newUnitPrice * quantity);
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
                <Form.Label>Vehicle Plate Number</Form.Label>
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
                <Form.Label className="font-weight-bold">
                  Vehicle Type
                </Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  required
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="">Choose</option>
                  <option value="Bus">Bus</option>
                  <option value="Truck">Truck</option>
                  <option value="Pick Up">Pick Up</option>
                  <option value="Ambulace">Ambulace</option>
                  <option value="Automobile">Automobile</option>
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label> Spare Part Id</Form.Label>
                <Form.Control
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
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  required
                  className="mb-3"
                />{" "}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Quantity.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Unit Price</Form.Label>
                <Form.Control
                  type="number"
                  value={unitPrice}
                  onChange={handleUnitPriceChange}
                  required
                  className="mb-3"
                />{" "}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Price.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Total Price</Form.Label>
                <Form.Control
                  type="number"
                  value={totalPrice}
                  readOnly
                  required
                  className="mb-3"
                />{" "}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Price.
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
export default SparePartRequestingForm;
