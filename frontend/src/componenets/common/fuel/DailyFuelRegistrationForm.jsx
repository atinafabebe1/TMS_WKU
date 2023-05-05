import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import SuccessProvider from "../errorProvider/SuccessProvider";
import ErrorProvider from "../errorProvider/ErrorProvider";
import api from "../../../api/api";

const DailyFuelRegistrationForm = ({ title, data, onSubmit }) => {
  const [plateNumber, setPlateNumber] = useState("");
  const [mode, setMode] = useState("");
  const [typeOfFuel, setTypeOfFuel] = useState("");
  const [ammount, setAmmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (data) {
      setPlateNumber(data.plateNumber);
      setTypeOfFuel(data.typeOfFuel);
      setMode(data.mode);
      setAmmount(data.ammount);
    } else {
      setPlateNumber("");
      setTypeOfFuel("");
      setMode("");
      setAmmount("");
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
    handleSubmit();
  };

  const handleClear = (event) => {
    setPlateNumber("");
    setTypeOfFuel("");
    setAmmount("");
    setMode("");
  };

  const handleSubmit = async () => {
    const result = {
      plateNumber,
      typeOfFuel,
      mode,
      ammount,
    };
    if (data) {
      try {
        const response = await api.put(
          `/Report/daily-fuel-costs/${data._id}?isDeleted=false`,
          result
        );
        setSuccess("Successfuly Updated");
        setError("");
        onSubmit();
      } catch (err) {
        console.log(err.response.data);
        setError("Please Provide Valid Data and Try Again");
        setSuccess("");
      }
    } else {
      try {
        const response = await api.post(
          `/Report/daily-fuel-costs?isDeleted=false`,
          result
        );

        setSuccess("Successfuly Registered");
        setError("");
        setPlateNumber("");
        setTypeOfFuel("");
        setMode("");
        setAmmount("");
      } catch (err) {
        console.log(err.response.data);
        setError("Please Provide Valid Data and Try Again");
        setSuccess("");
      }
    }
  };

  return (
    <div className="p-4">
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
                  <Form.Group as={Col} controlId="platenumber">
                    <Form.Label>Plate Number</Form.Label>
                    <Form.Control
                      type="string"
                      required
                      minLength={9}
                      maxLength={9}
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Plate Number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="ammount">
                    <Form.Label>Ammount of Fuel (L)</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      min={0}
                      max={500}
                      value={ammount}
                      onChange={(e) => setAmmount(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Ammount.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="mode">
                    <Form.Label>Mode</Form.Label>
                    <Form.Control
                      as="select"
                      type="text"
                      placeholder="Choose"
                      min={0}
                      minLength={3}
                      maxLength={25}
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <option value="Choose">Choose</option>
                      <option value="Coupon">Coupon</option>
                      <option value="Cash">Cash</option>
                      <option value="Fuel">Fuel</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="role">
                    <Form.Label className="font-weight-bold">
                      Type Of Fuel
                    </Form.Label>
                    <Form.Control
                      as="select"
                      type="text"
                      placeholder="Choose"
                      required
                      value={typeOfFuel}
                      onChange={(e) => setTypeOfFuel(e.target.value)}
                    >
                      <option value="Choose">Choose</option>
                      <option value="diesel">Diesel</option>
                      <option value="benzene">Benzene</option>
                      <option value="motorOil">Motor Oil</option>
                      <option value="frenOil">Fren Oil</option>
                      <option value="grease">Grease</option>
                      <option value="otherOil">Other Oil</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
              </Form>
            </Container>

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
                Register
              </Button>
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Submission</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to Register This Fuel?</Modal.Body>
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
        </div>
      </div>
    </div>
  );
};
export default DailyFuelRegistrationForm;
