import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import SuccessProvider from "../errorProvider/SuccessProvider";
import ErrorProvider from "../errorProvider/ErrorProvider";
import api from "../../../api/api";

const DailyFuelRegistrationForm = ({ title, data, onSubmit }) => {
  const [plateNumber, setPlateNumber] = useState("");
  const [mode, setMode] = useState("");
  const [typeOfFuel, setTypeOfFuel] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (data) {
      setPlateNumber(data.plateNumber);
      setTypeOfFuel(data.typeOfFuel);
      setMode(data.mode);
    } else {
      setPlateNumber("");
      setTypeOfFuel("");
      setMode("");
    }
  }, [data]);

  const handleConfirmation = (event) => {
    event.preventDefault();
    setShowModal(false);
    handleSubmit();
  };

  const handleClear = (event) => {
    setPlateNumber("");
    setTypeOfFuel("");
    setMode("");
  };

  const handleSubmit = async () => {
    const result = {
      plateNumber,
      typeOfFuel,
      mode,
    };
    if (data) {
      try {
        const response = await api.put(
          `/Report/daily-fuel-costs/${data._id}?isDeleted=false`,
          result
        );
        if (response.status === 200) {
          setSuccess(response.data?.message);
          setError("");
          onSubmit();
        }
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
        if (response.status === 200) {
          setSuccess(response.data?.message);
          setError("");
          setPlateNumber("");
          setTypeOfFuel("");
          setMode("");
        }
      } catch (err) {
        console.log(err.response.data);
        setError("Please Provide Valid Data and Try Again");
        setSuccess("");
      }
    }
  };

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h3 className="mb-3 text-center">{title}</h3>

          <Container breakpoint="lg">
            <Form className="form" onSubmit={handleConfirmation}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="platenumber">
                  <Form.Label>Plate Number</Form.Label>
                  <Form.Control
                    type="string"
                    required
                    min={0}
                    minLength={3}
                    maxLength={25}
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                  />
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
export default DailyFuelRegistrationForm;
