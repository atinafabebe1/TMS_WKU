import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import SuccessProvider from "../Provider/SuccessProvider";
import ErrorProvider from "../Provider/ErrorProvider";
import api from "../../../api/api";

const VehicleRegistrationForm = ({ title, data, onSubmit }) => {
  const [modelNo, setModelNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [motorNo, setMotorNo] = useState("");
  const [type, setType] = useState("");
  const [cC, setCC] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [typeOfFuel, setTypeOfFuel] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchasedDate, setPurchasedDate] = useState("");
  const [maxPerson, setMaxPerson] = useState("");
  const [maxLoad, setMaxLoad] = useState("");
  const [maxLitres, setMaxLitres] = useState("");
  const [proprietaryIdNumber, setProprietaryIdNumber] = useState("");
  const [driver, setDriver] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [onMaintenance, setOnMaintenance] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validated, setValidated] = useState(false);
  const [itemsWithVehicle, setItemsWithVehicle] = useState([
    { itemDetail: "", quantity: "" },
  ]);

  useEffect(() => {
    if (data) {
      setModelNo(data.modelNo);
      setChassisNo(data.chassisNo);
      setMotorNo(data.motorNo);
      setType(data.type);
      setCC(data.cC);
      setPurchasePrice(data.purchasePrice);
      setPlateNumber(data.plateNumber);
      setTypeOfFuel(data.typeOfFuel);
      setPurchasedDate(data.purchasedDate);
      setMaxPerson(data.maxPerson);
      setMaxLoad(data.maxLoad);
      setMaxLitres(data.maxLitres);
      setDriver(data.driver);
      setProprietaryIdNumber(data.proprietaryIdNumber);
      setVehicleImage(data.vehicleImage);
      setAssignedTo(data.assignedTo);
      setOnMaintenance(data.onMaintenance);
      setItemsWithVehicle(data.itemsWithVehicle);
    } else {
      setModelNo("");
      setChassisNo("");
      setMotorNo("");
      setType("");
      setCC("");
      setPurchasePrice("");
      setPlateNumber("");
      setTypeOfFuel("");
      setPurchasedDate("");
      setMaxPerson("");
      setMaxLoad("");
      setMaxLitres("");
      setDriver("");
      setItemsWithVehicle([{ itemDetail: "", quantity: "" }]);
      setProprietaryIdNumber("");
      setVehicleImage(null);
      setAssignedTo(null);
      setOnMaintenance(false);
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
    setModelNo("");
    setChassisNo("");
    setMotorNo("");
    setType("");
    setCC("");
    setPurchasePrice("");
    setPlateNumber("");
    setTypeOfFuel("");
    setPurchasedDate("");
    setMaxPerson("");
    setMaxLoad("");
    setMaxLitres("");
    setDriver("");
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
      type,
      cC,
      purchasePrice,
      plateNumber,
      typeOfFuel,
      purchasedDate,
      maxPerson,
      maxLoad,
      maxLitres,
      itemsWithVehicle,
      driver,
      proprietaryIdNumber,
      vehicleImage,
      assignedTo,
      onMaintenance,
    };
    if (data) {
      api
        .put(`/VehicleRecord/${data._id}?isDeleted=false`, result)
        .then((response) => {
          setSuccess(response.data?.message);
          setError(null);
          onSubmit();
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
          setSuccess("Successfully Registered");
          setError(null);
        })
        .catch((err) => {
          console.log(err.response.data);
          setError("Please Provide Valid Data and Try Again");
          setSuccess(null);
        });
    }
  };

  const handleItemsChange = (index, field, value) => {
    const newItems = [...itemsWithVehicle];
    newItems[index][field] = value;
    setItemsWithVehicle(newItems);
  };

  const handleAddItem = () => {
    setItemsWithVehicle([
      ...itemsWithVehicle,
      { itemDetail: "", quantity: "" },
    ]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...itemsWithVehicle];
    newItems.splice(index, 1);
    setItemsWithVehicle(newItems);
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Model Number.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Chassis Number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="role">
                    <Form.Label className="font-weight-bold">
                      Type Of Vehicle
                    </Form.Label>
                    <Form.Control
                      as="select"
                      type="text"
                      placeholder="Choose"
                      required
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Choose</option>
                      <option value="Bus">Bus</option>
                      <option value="Truck">Truck</option>
                      <option value="Pick Up">Pick Up</option>
                      <option value="Ambulace">Ambulace</option>
                      <option value="Automobile">Automobile</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please Select Valid Type.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Motor Number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <br />
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid CC.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Plate Number.
                    </Form.Control.Feedback>
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
                      <option value="">Choose</option>
                      <option value="diesel">Diesel</option>
                      <option value="benzene">Benzene</option>
                      <option value="motorOil">Motor Oil</option>
                      <option value="frenOil">Fren Oil</option>
                      <option value="grease">Grease</option>
                      <option value="otherOil">Other Oil</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Fuel Type.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Price.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Date.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Ammount.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Ammount.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Ammount.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Id.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="driver">
                    <span> </span>
                    <Form.Label>Driver</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={driver}
                      onChange={(e) => setDriver(e.target.value)}
                    ></Form.Control>
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
                <h5>Items With Vehicle</h5>
                <hr />
                <Row>
                  {itemsWithVehicle?.map((items, index) => (
                    <Form.Group key={index}>
                      <Form.Label>
                        <strong>Item #{index + 1}</strong>
                      </Form.Label>
                      <p>Item Detail</p>
                      <Form.Control
                        type="text"
                        value={items.itemDetail}
                        onChange={(event) =>
                          handleItemsChange(
                            index,
                            "itemDetail",
                            event.target.value
                          )
                        }
                        required
                        className="mb-3"
                      />{" "}
                      <p>Item Quantity</p>
                      <Form.Control
                        type="text"
                        value={items.quantity}
                        onChange={(event) =>
                          handleItemsChange(
                            index,
                            "quantity",
                            event.target.value
                          )
                        }
                        required
                        className="mb-3"
                      />
                      {index !== 0 && (
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveItem(index)}
                          className="mb-3 btn-sm"
                        >
                          Remove Item
                        </Button>
                      )}
                    </Form.Group>
                  ))}
                  <Button
                    variant="success"
                    onClick={handleAddItem}
                    className="mb-3 btn-sm"
                  >
                    Add Item
                  </Button>
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
export default VehicleRegistrationForm;
