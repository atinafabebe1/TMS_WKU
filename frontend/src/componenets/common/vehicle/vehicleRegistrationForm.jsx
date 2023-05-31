import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorProvider from "../Provider/ErrorProvider";
import SuccessProvider from "../Provider/SuccessProvider";
import api from "../../../api/api";

const VehicleRegistrationForm = ({ title, data, onSubmit }) => {
  const [vehicleData, setVehicleData] = useState({
    modelNo: "",
    chassisNo: "",
    motorNo: "",
    type: "",
    cC: "",
    plateNumber: "",
    typeOfFuel: "",
    purchasePrice: "",
    maxPerson: "",
    purchaseDate: "",
    maxLoad: "",
    maxLitres: "",
    proprietaryIdNumber: "",
    drivers: "",
    vehicleImage: null,
    propertyType: "",
    itemsWithVehicle: [{ itemDetail: "", quantity: "" }],
  });

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setVehicleData(data);
    } else {
      setVehicleData({
        modelNo: "",
        chassisNo: "",
        motorNo: "",
        type: "",
        cC: "",
        plateNumber: "",
        typeOfFuel: "",
        purchasePrice: "",
        maxPerson: "",
        purchaseDate: "",
        maxLoad: "",
        maxLitres: "",
        proprietaryIdNumber: "",
        drivers: "",
        vehicleImage: null,
        propertyType: "",
        itemsWithVehicle: [{ itemDetail: "", quantity: "" }],
      });
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
    setVehicleData({
      modelNo: "",
      chassisNo: "",
      motorNo: "",
      type: "",
      cC: "",
      plateNumber: "",
      typeOfFuel: "",
      purchasePrice: "",
      maxPerson: "",
      purchaseDate: "",
      maxLoad: "",
      maxLitres: "",
      proprietaryIdNumber: "",
      drivers: "",
      vehicleImage: null,
      propertyType: "",
      itemsWithVehicle: [{ itemDetail: "", quantity: "" }],
    });
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => {
      const itemsWithVehicle = [...prevData.itemsWithVehicle];
      itemsWithVehicle[index] = { ...itemsWithVehicle[index], [name]: value };
      return { ...prevData, itemsWithVehicle };
    });
  };

  const handleRemoveItem = (index) => {
    setVehicleData((prevData) => {
      const itemsWithVehicle = [...prevData.itemsWithVehicle];
      itemsWithVehicle.splice(index, 1);
      return { ...prevData, itemsWithVehicle };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (data) {
      try {
        await api.put(`/VehicleRecord/${data._id}`, vehicleData);
        setSuccess("Vehicle details updated successfully.");
        setError("");
        setTimeout(() => {
          navigate("/hd/vehicles"); // Navigate to the desired page after 6 seconds
        }, 6000);
      } catch (error) {
        setError("Error");
      }
    } else {
      try {
        await api.post("/VehicleRecord", vehicleData);
        setSuccess("Please ProvidevProvideProvide Valid Data and Try Again");
        setError("");
        setTimeout(() => {
          navigate("/hd/vehicles"); // Navigate to the desired page after 6 seconds
        }, 6000);
      } catch (error) {
        setError("Please Provide Valid Data and Try Again");
      }
    }
  };
  console.log(vehicleData);
  const renderItemFields = () => {
    return vehicleData.itemsWithVehicle.map((item, index) => (
      <div key={index}>
        <Row className="mb-3">
          <h6>Item #{index + 1}</h6>
          <Form.Group as={Col}>
            <Form.Label className="form-control-custom">Item Detail</Form.Label>

            <Form.Control
              type="text"
              name="itemDetail"
              value={item.itemDetail}
              onChange={(e) => handleItemChange(e, index)}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="form-control-custom">Quantity</Form.Label>

            <Form.Control
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(e, index)}
              required
            />
          </Form.Group>
        </Row>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleRemoveItem(index)}
        >
          Remove Item
        </Button>
      </div>
    ));
  };

  return (
    <Container>
      <h3
        className="form-control-custom"
        style={{ textAlign: "center", padding: "10px" }}
      >
        {title}
      </h3>
      <hr></hr>
      <Form
        style={{ padding: "10px" }}
        noValidate
        validated={validated}
        onSubmit={(e) => e.preventDefault()}
      >
        <Row>
          <Col>
            <Form.Group controlId="modelNo">
              <Form.Label className="form-control-custom">
                Model Number
              </Form.Label>
              <Form.Control
                type="number"
                required
                min={1000}
                max={9999}
                name="modelNo"
                value={vehicleData.modelNo}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the model number.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="chassisNo">
              <Form.Label className="form-control-custom">
                Chassis Number
              </Form.Label>
              <Form.Control
                type="number"
                required
                min={100000}
                max={999999}
                name="chassisNo"
                value={vehicleData.chassisNo}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the chassis number.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="type">
              <Form.Label className="form-control-custom">Type</Form.Label>
              <Form.Control
                as="select"
                type="text"
                placeholder="Choose"
                required
                name="type"
                value={vehicleData.type}
                onChange={handleInputChange}
              >
                <option value="">Choose</option>
                <option value="Bus">Bus</option>
                <option value="Truck">Truck</option>
                <option value="Pick Up">Pick Up</option>
                <option value="Ambulace">Ambulace</option>
                <option value="Automobile">Automobile</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide the vehicle type.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Form.Group as={Col} controlId="motornumber">
            <span> </span>
            <Form.Label className="form-control-custom">
              Motor Number
            </Form.Label>
            <Form.Control
              min={0}
              type="number"
              required
              minLength={3}
              maxLength={25}
              name="motorNo"
              value={vehicleData.motorNo}
              onChange={handleInputChange}
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
            <Form.Label className="form-control-custom">CC</Form.Label>
            <Form.Control
              type="number"
              required
              minLength={3}
              maxLength={25}
              name="cC"
              value={vehicleData.cC}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid CC.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="platenumber">
            <span> </span>
            <Form.Label className="form-control-custom">
              Plate Number
            </Form.Label>
            <Form.Control
              type="string"
              required
              minLength={3}
              maxLength={25}
              name="plateNumber"
              value={vehicleData.plateNumber}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Plate Number.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="role">
            <Form.Label className="form-control-custom">
              Type Of Fuel
            </Form.Label>
            <Form.Control
              as="select"
              type="text"
              placeholder="Choose"
              name="typeOfFuel"
              required
              value={vehicleData.typeOfFuel}
              onChange={handleInputChange}
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

          <Form.Group as={Col} controlId="purchaseprice">
            <span> </span>
            <Form.Label className="form-control-custom">
              Purchased Price
            </Form.Label>

            <Form.Control
              type="number"
              required
              min={10000}
              maxLength={10}
              name="purchasePrice"
              value={vehicleData.purchasePrice}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Price.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <br></br>
        <h5 className="form-control-custom">Maximum Load Capacity</h5>
        <hr></hr>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="person">
            <span> </span>
            <Form.Label className="form-control-custom">Person</Form.Label>
            <Form.Control
              type="number"
              required
              min={0}
              max={80}
              name="maxPerson"
              value={vehicleData.maxPerson}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Ammount.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="person">
            <span> </span>
            <Form.Label className="form-control-custom">
              Normal Load (KG)
            </Form.Label>
            <Form.Control
              type="number"
              name="maxLoad"
              required
              min={0}
              max={5000}
              value={vehicleData.maxLoad}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Ammount.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="Adress">
            <span> </span>
            <Form.Label className="form-control-custom">Litres</Form.Label>
            <Form.Control
              type="number"
              name="maxLitres"
              required
              min={0}
              max={5000}
              value={vehicleData.maxLitres}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Ammount.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <br></br>

        <h5 className="form-control-custom">Proprietary Information</h5>
        <hr></hr>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="proprietaryIdNumber">
            <span> </span>
            <Form.Label className="form-control-custom">
              Proprietary Id Number
            </Form.Label>
            <Form.Control
              type="number"
              name="proprietaryIdNumber"
              required
              value={vehicleData.proprietaryIdNumber}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Id.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="vehicleimage">
            <span> </span>
            <Form.Label className="form-control-custom">
              Vehicle Image
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="vehicleimage"
              value={vehicleData.vehicleImage}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="role">
            <Form.Label className="form-control-custom">
              Property Type
            </Form.Label>
            <Form.Control
              as="select"
              type="text"
              placeholder="Choose"
              required
              name="propertyType"
              value={vehicleData.propertyType}
              onChange={handleInputChange}
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
        <h5 className="form-control-custom">Items With Vehicle</h5>
        <hr />
        {renderItemFields()}
        <div style={{ paddingTop: "10px" }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              setVehicleData((prevData) => ({
                ...prevData,
                itemsWithVehicle: [
                  ...prevData.itemsWithVehicle,
                  { itemDetail: "", quantity: "" },
                ],
              }))
            }
          >
            Add Item
          </Button>
          {error && <ErrorProvider error={error} />}
          {success && <SuccessProvider success={success} />}
        </div>
      </Form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Row>
          <Col>
            <Button
              variant="secondary"
              onClick={(e) => {
                navigate("/hd/vehicles");
              }}
            >
              Cancel
            </Button>{" "}
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Submit
            </Button>{" "}
            <Button variant="danger" onClick={handleClear}>
              Clear
            </Button>{" "}
          </Col>
        </Row>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="form-control-custom">
            Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="form-control-custom">
          Are you sure you want to submit the form?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmation}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default VehicleRegistrationForm;
