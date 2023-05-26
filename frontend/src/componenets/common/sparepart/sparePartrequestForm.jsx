import React, { useState, useEffect } from "react";
import ErrorProvider from "../Provider/ErrorProvider";
import SuccessProvider from "../Provider/SuccessProvider";
import Loading from "../../common/Provider/LoadingProvider";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Form, Button, Modal } from "react-bootstrap";
import api from "../../../api/api";
import "../css/formStyles.css";

const SparePartRequestingForm = ({ title, request, onSubmit }) => {
  const [plateNumber, setPlateNumber] = useState("");
  const [sparePartName, setSparePartName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [status, setStatus] = useState("");
  const [rejectedReason, setRejectedReason] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (request) {
      setPlateNumber(request.plateNumber);
      setSparePartName(request.sparePartName);
      setQuantity(request.quantity);
      setUnitPrice(request.unitPrice);
      setTotalPrice(request.totalPrice);
      setStatus("pending");
      setRejectedReason(null);
    } else {
      setPlateNumber("");
      setSparePartName("");
      setQuantity("");
      setUnitPrice("");
      setTotalPrice("");
      setStatus("pending");
      setRejectedReason(null);
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
    setPlateNumber("");
    setSparePartName("");
    setQuantity("");
    setUnitPrice("");
    setTotalPrice("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = {
      plateNumber,
      sparePartName,
      quantity,
      unitPrice,
      totalPrice,
      status,
      rejectedReason,
    };
    if (request) {
      api
        .put(`/Request/sparePart/${request._id}?isDeleted=false`, result)
        .then((response) => {
          setIsLoading(false);
          setSuccess("Successfully Updated");
          setError(null);

          setTimeout(() => {
            navigate("/mechanic/request/accessory"); // Navigate to the desired page after 6 seconds
          }, 6000);
        })
        .catch((err) => {
          console.log(err.response.data);
          setIsLoading(false);
          setError("Please Provide Valid Data and Try Again");
          setSuccess(null);
        });
    } else {
      api
        .post(`/Request/sparePart`, result)
        .then((response) => {
          setIsLoading(false);
          setSuccess("Successfully Sent");
          setError(null);
          setTimeout(() => {
            navigate("/mechanic/request/accessory"); // Navigate to the desired page after 6 seconds
          }, 6000); // Navigate to the desired page
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
    <Container className="my-3">
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-primary text-light">
              SparePart Requesting Form
            </Card.Header>
            <Card.Body>
              <div>
                {request && request.rejectedReason !== null && (
                  <p className="text-danger">
                    Kindly be informed that your request has been rejected due
                    to the reason of{" "}
                    <strong> "{request.rejectedReason}"</strong>. We advise that
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
                      <Form.Label className="form-control-custom">
                        {" "}
                        SparePart Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={sparePartName}
                        onChange={(event) =>
                          setSparePartName(event.target.value)
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
                  </Row>
                  <Row>
                    <Form.Group as={Col}>
                      <Form.Label className="form-control-custom">
                        Quantity
                      </Form.Label>
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

                    <Form.Group as={Col}>
                      <Form.Label className="form-control-custom">
                        Unit Price
                      </Form.Label>
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
                      <Form.Label className="form-control-custom">
                        Total Price
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min={0}
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
                  <Button
                    className="btn-secondary me-2"
                    onClick={() => navigate("/mechanic/request/accessory")}
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
                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm Submission</Modal.Title>
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
                      <Button variant="primary" onClick={handleConfirmation}>
                        Submit
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
export default SparePartRequestingForm;
