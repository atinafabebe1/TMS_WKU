import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import SuccessProvider from "../errorProvider/SuccessProvider";
import ErrorProvider from "../errorProvider/ErrorProvider";
import api from "../../../api/api";

const VehicleRegistrationForm = ({ title, data, onSubmit }) => {
  const [modelNo, setModelNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [motorNo, setMotorNo] = useState("");
  const [cC, setCC] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [typeOfFuel, setTypeOfFuel] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchasedDate, setPurchasedDate] = useState("");
  const [maxPerson, setMaxPerson] = useState("");
  const [maxLoad, setMaxLoad] = useState("");
  const [maxLitres, setMaxLitres] = useState("");
  const [proprietaryIdNumber, setProprietaryIdNumber] = useState("");
  const [vehicleImage, setVehicleImage] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [onMaintenance, setOnMaintenance] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (data) {
      setModelNo(data.modelNo);
      setChassisNo(data.chassisNo);
      setMotorNo(data.motorNo);
      setCC(data.cC);
      setPurchasePrice(data.purchasePrice);
      setPlateNumber(data.plateNumber);
      setTypeOfFuel(data.typeOfFuel);
      setPurchasedDate(data.purchasedDate);
      setMaxPerson(data.maxPerson);
      setMaxLoad(data.maxLoad);
      setMaxLitres(data.maxLitres);
      setProprietaryIdNumber(data.proprietaryIdNumber);
      setVehicleImage(data.vehicleImage);
      setAssignedTo(data.assignedTo);
      setOnMaintenance(data.onMaintenance);
    } else {
      setModelNo("");
      setChassisNo("");
      setMotorNo("");
      setCC("");
      setPurchasePrice("");
      setPlateNumber("");
      setTypeOfFuel("");
      setPurchasedDate("");
      setMaxPerson("");
      setMaxLoad("");
      setMaxLitres("");
      setProprietaryIdNumber("");
      setVehicleImage(null);
      setAssignedTo(null);
      setOnMaintenance(false);
    }
  }, [data]);

  const handleConfirmation = (event) => {
    event.preventDefault();
    setShowModal(false);
    handleSubmit();
  };
  const handleClear = (event) => {
    setModelNo("");
    setChassisNo("");
    setMotorNo("");
    setCC("");
    setPurchasePrice("");
    setPlateNumber("");
    setTypeOfFuel("");
    setPurchasedDate("");
    setMaxPerson("");
    setMaxLoad("");
    setMaxLitres("");
    setProprietaryIdNumber("");
    setVehicleImage(null);
    setAssignedTo(null);
    setOnMaintenance(false);
  };

  const handleSubmit = async () => {
    const result = {
      modelNo,
      chassisNo,
      motorNo,
      cC,
      purchasePrice,
      plateNumber,
      typeOfFuel,
      purchasedDate,
      maxPerson,
      maxLoad,
      maxLitres,
      proprietaryIdNumber,
      vehicleImage,
      assignedTo,
      onMaintenance,
    };
    if (data) {
      api
        .put(`/VehicleRecord/${data._id}?isDeleted=false`, result)
        .then((response) => {
          if (response.status === 200) {
            // check for status code instead of text
            setSuccess(response.data?.message);
            setError(null);
            onSubmit();
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          setError("Please Provide Valid Data and Try Again");
          setSuccess(null);
        });
      try {
        await api.put(`/VehicleRecord/${data._id}`);
        const response = await api.get("/VehicleRecord");
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      api
        .post(`/VehicleRecord?isDeleted=false`, result)
        .then((response) => {
          if (response.status === 200) {
            setSuccess(response.data?.message);
            setError(null);

            setModelNo("");
            setChassisNo("");
            setMotorNo("");
            setCC("");
            setPurchasePrice("");
            setPlateNumber("");
            setTypeOfFuel("");
            setPurchasedDate("");
            setMaxPerson("");
            setMaxLoad("");
            setMaxLitres("");
            setProprietaryIdNumber("");
            setVehicleImage(null);
            setAssignedTo(null);
            setOnMaintenance(false);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          setError("Please Provide Valid Data and Try Again");
          setSuccess(null);
        });
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
                <h5>Vehicle Information</h5>
                <hr></hr>
                <br></br>
                <Form.Group as={Col} controlId="modelnumber">
                  <Form.Label>Model Number</Form.Label>
                  <span> </span>
                  <Form.Control
                    type="number"
                    required
                    min={1000}
                    max={9999}
                    value={modelNo}
                    onChange={(e) => setModelNo(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="chassisnumber">
                  <span> </span>
                  <Form.Label>Chassis Number</Form.Label>

                  <Form.Control
                    type="number"
                    required
                    min={100000}
                    max={999999}
                    value={chassisNo}
                    onChange={(e) => setChassisNo(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="motornumber">
                  <span> </span>
                  <Form.Label>Motor Number</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    minLength={3}
                    maxLength={25}
                    value={motorNo}
                    onChange={(e) => setMotorNo(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="cc">
                  <span> </span>
                  <Form.Label>CC</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    minLength={3}
                    maxLength={25}
                    value={cC}
                    onChange={(e) => setCC(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="platenumber">
                  <span> </span>
                  <Form.Label>plate Number</Form.Label>
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
                    <option value="diesel">Diesel</option>
                    <option value="benzene">Benzene</option>
                    <option value="motorOil">Motor Oil</option>
                    <option value="frenOil">Fren Oil</option>
                    <option value="grease">Grease</option>
                    <option value="otherOil">Other Oil</option>
                  </Form.Control>
                </Form.Group>
              </Row>
              <br></br>
              <h5>Purchasing Information</h5>
              <hr></hr>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="purchaseprice">
                  <span> </span>
                  <Form.Label>Purchased Price</Form.Label>

                  <Form.Control
                    type="number"
                    required
                    min={1}
                    maxLength={10}
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="duedate">
                  <span> </span>
                  <Form.Label>Purchased Date</Form.Label>

                  <Form.Control
                    type="date"
                    name="purchasedDate"
                    required
                    value={purchasedDate}
                    onChange={(e) => setPurchasedDate(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <br></br>
              <h5>Maximum Load Capacity</h5>
              <hr></hr>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="person">
                  <span> </span>
                  <Form.Label>Person</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxperson"
                    required
                    min={0}
                    max={80}
                    value={maxPerson}
                    onChange={(e) => setMaxPerson(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="person">
                  <span> </span>
                  <Form.Label>Normal Load (KG)</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxload"
                    required
                    min={0}
                    max={5000}
                    value={maxLoad}
                    onChange={(e) => setMaxLoad(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="Adress">
                  <span> </span>
                  <Form.Label>Litres</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxlitres"
                    required
                    min={0}
                    max={5000}
                    value={maxLitres}
                    onChange={(e) => setMaxLitres(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <br></br>

              <h5>Proprietary Information</h5>
              <hr></hr>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="proprietaryIdNumber">
                  <span> </span>
                  <Form.Label>Proprietary Id Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="proprietaryIdNumber"
                    required
                    value={proprietaryIdNumber}
                    onChange={(e) => setProprietaryIdNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="assignedTo">
                  <span> </span>
                  <Form.Label>Assigned to</Form.Label>
                  <Form.Control
                    type="text"
                    minLength={3}
                    maxLength={100}
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="vehicleimage">
                  <span> </span>
                  <Form.Label>Vehicle Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    name="vehicleimage"
                    value={vehicleImage}
                    onChange={(e) => setVehicleImage(e.target.value)}
                  />
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
export default VehicleRegistrationForm;
