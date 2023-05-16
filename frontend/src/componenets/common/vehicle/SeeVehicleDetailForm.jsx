import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import SuccessProvider from "../Provider/SuccessProvider";
import ErrorProvider from "../Provider/ErrorProvider";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/api";

const SingleVehicleDetailInfo = ({ title, data, onSubmit }) => {
  const [modelNo, setModelNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [motorNo, setMotorNo] = useState("");
  const [type, setType] = useState("");
  const [cC, setCC] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [typeOfFuel, setTypeOfFuel] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [maxPerson, setMaxPerson] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [maxLoad, setMaxLoad] = useState("");
  const [maxLitres, setMaxLitres] = useState("");
  const [proprietaryIdNumber, setProprietaryIdNumber] = useState("");
  const [drivers, setDrivers] = useState("");
  const [vehicleImage, setVehicleImage] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [onMaintenance, setOnMaintenance] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validated, setValidated] = useState(false);
  const [itemsWithVehicle, setItemsWithVehicle] = useState([
    { itemDetail: "", quantity: "" },
  ]);
  const navigate = useNavigate();

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
      setPurchaseDate(data.purchaseDate);
      setMaxPerson(data.maxPerson);
      setMaxLoad(data.maxLoad);
      setMaxLitres(data.maxLitres);
      setProprietaryIdNumber(data.proprietaryIdNumber);
      setVehicleImage(data.vehicleImage);
      setAssignedTo(data.assignedTo);
      setOnMaintenance(data.onMaintenance);
      setPropertyType(data.propertyType);
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
      setPurchaseDate(new Date().toISOString().slice(0, 10));
      setMaxPerson("");
      setMaxLoad("");
      setMaxLitres("");
      setItemsWithVehicle([{ itemDetail: "", quantity: "" }]);
      setProprietaryIdNumber("");
      setVehicleImage(null);
      setAssignedTo(null);
      setOnMaintenance(false);
      setPropertyType("");
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
    setPurchaseDate(new Date().toISOString().slice(0, 10));
    setMaxPerson("");
    setMaxLoad("");
    setMaxLitres("");
    setProprietaryIdNumber("");
    setVehicleImage(null);
    setAssignedTo(null);
    setOnMaintenance(false);
    setPropertyType("");
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
      purchaseDate,
      maxPerson,
      maxLoad,
      maxLitres,
      itemsWithVehicle,
      proprietaryIdNumber,
      vehicleImage,
      assignedTo,
      onMaintenance,
      propertyType,
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
  const fetchDriver = async () => {
    api
      .get("/user/getusers?select=role,firstName,lastName,email")
      .then((response) => {
        setDrivers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetch();
    fetchDriver();
  }, []);

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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
                      min={1}
                      maxLength={10}
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Price.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="date">
                    <span> </span>
                    <Form.Label>Purchased Date</Form.Label>

                    <Form.Control
                      type="date"
                      name="purchaseDate"
                      disabled
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
                      value={proprietaryIdNumber}
                      onChange={(e) => setProprietaryIdNumber(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Id.
                    </Form.Control.Feedback>
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
                  <Form.Group as={Col} controlId="role">
                    <Form.Label className="font-weight-bold">
                      Property Type
                    </Form.Label>
                    <Form.Control
                      as="select"
                      type="text"
                      placeholder="Choose"
                      disabled
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option value="">Choose</option>
                      <option value="University Owned">University Owned</option>
                      <option value="Rent">Rent</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Fuel Type.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                {/* <Form.Group as={Col} controlId="role">
                  <Form.Label className="font-weight-bold">Driver</Form.Label>
                  <Form.Control
                    as="select"
                    type="text"
                    placeholder="Choose Driver"
                    required
                    value={driver}
                    onChange={(e) => setDriver(e.target.value)}
                  >
                    <option value="">Select a Driver</option>
                    {Array.isArray(drivers) &&
                      drivers
                        .filter((driver) => driver.role === "ROLE_DRIVER")
                        .map((driver) => {
                          return (
                            <option
                              key={driver._id}
                              value={`${driver.firstName} ${driver.lastName} (${driver.email})`}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "150px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >{`${driver.firstName} ${driver.lastName}`}</span>
                              <span
                                style={{ color: "gray", marginLeft: "1rem" }}
                              >{`(${driver.email})`}</span>
                            </option>
                          );
                        })}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Driver.
                  </Form.Control.Feedback>
                </Form.Group> */}
              </Form>
            </Container>

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
    </div>
  );
};

export default SingleVehicleDetailInfo;
