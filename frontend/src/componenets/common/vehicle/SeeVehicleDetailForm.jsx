import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/api";

const SingleVehicleDetailInfo = ({ title, data, onSubmit }) => {
  //   const [plateNumber, setPlateNumber] = useState("");
  //   const [type, setType] = useState("car"); // set default value for vehicle type
  //   const [identificationNumber, setIdentificationNumber] = useState("");
  //   const [quantity, setQuantity] = useState("");
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
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

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
          setError(err.response.data?.error);
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
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          setError(err.response.data?.error);
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
                    value={proprietaryIdNumber}
                    onChange={(e) => setProprietaryIdNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="assignedTo">
                  <span> </span>
                  <Form.Label>Assigned to</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
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
                    disabled
                    accept="image/*"
                    name="vehicleimage"
                    value={vehicleImage}
                    onChange={(e) => setVehicleImage(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </Form>
          </Container>

          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <div className="d-flex justify-content-end my-4">
            <Button
              type="reset"
              variant="secondary"
              onClick={() => navigate(`/hd/vehicles`)}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleVehicleDetailInfo;
