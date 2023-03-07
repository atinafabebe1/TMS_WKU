import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import EvStationSharpIcon from "@mui/icons-material/EvStationSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";

const FuelRequest = () => {
  const [toggle, setToggle] = useState(true);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState("");
  const [recieverId, setRecieverId] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [typeOfVehicle, setTypeOfVehicle] = useState("");
  const [typeOfFuel, setTypeOfFuel] = useState("");
  const [prevRecordOnCounter, setPrevRecordOnCounter] = useState("");
  const [currentRecordOnCounter, setCurrentRecordOnCounter] = useState("");
  const [sourceLocation, setSourceLocation] = useState("");
  const [distanceTraveled, setDistanceTraveled] = useState("");
  const [destination, setDestination] = useState("");
  const [amountOfFuelUsed, setAmountOfFuelUsed] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    //Post request here
  };
  return (
    <div className="view">
      <div className="sidebar">
        <div class="d-grid">
          <button
            onClick={() => setToggle(!toggle)}
            class="btn btn btn-outline-secondary mb-5"
          >
            Menu
          </button>
        </div>
        <hr></hr>
        {!toggle && (
          <ListGroup>
            <ListGroup.Item action href="/driver/maintenanceRequest">
              <EngineeringIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action active href="/driver/fuelRequest">
              <EvStationSharpIcon />
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/complain">
              <FmdBadSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/emergencyReport">
              <SummarizeSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/Schedule">
              <DepartureBoardIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/receiveVehicle">
              <CallReceivedOutlinedIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/transferVehicle">
              <MoveDownOutlinedIcon color="primary" />
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action href="/driver/maintenanceRequest">
              <EngineeringIcon color="primary" />
              <span> </span>
              Maintenance Request
            </ListGroup.Item>
            <ListGroup.Item action active href="/driver/fuelRequest">
              <EvStationSharpIcon />
              <span> </span>
              Fuel Request
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/complain">
              <FmdBadSharpIcon color="primary" />
              <span> </span>
              Make Complain
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/emergencyReport">
              <SummarizeSharpIcon color="primary" />
              <span> </span>
              Emergency Report
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/Schedule">
              <DepartureBoardIcon color="primary" />
              <span> </span>
              Schedule
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/receiveVehicle">
              <CallReceivedOutlinedIcon color="primary" />
              <span> </span>
              Receive Vehicle
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/transferVehicle">
              <MoveDownOutlinedIcon color="primary" />
              <span> </span>
              Transfer Vehicle
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="field">
        <div className="App">
          <Form
            className="form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Form.Group className="col col-sm-6" as={Col}>
                <Form.Label>User</Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={3}
                  maxLength={35}
                  validated={validated}
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid User.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Vehicle</Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={3}
                  maxLength={35}
                  validated={validated}
                  value={recieverId}
                  onChange={(e) => setRecieverId(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid receiver.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Vehicle</Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={3}
                  maxLength={35}
                  validated={validated}
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Vehicle.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group className="col col-sm-6" as={Col}>
                <Form.Label>Plate Number</Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={7}
                  maxLength={10}
                  validated={validated}
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Plate Number.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Select
                  defaultValue={"choose"}
                  required
                  validated={validated}
                  value={typeOfVehicle}
                  onChange={(e) => setTypeOfVehicle(e.target.value)}
                >
                  <option value="typeBus">BUS</option>
                  <option value="typeTruck">Truck</option>
                  <option value="typePickUp">Pick Up</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Fuel Type</Form.Label>
                <Form.Select
                  defaultValue={"choose"}
                  required
                  validated={validated}
                  value={typeOfFuel}
                  onChange={(e) => setTypeOfFuel(e.target.value)}
                >
                  <option value="FtypePetrol">Petrol</option>
                  <option value="FtypeDiesel">Diesel</option>
                  <option value="FtypeGasoline">Gasoline</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="distanceTravelled">
                <Form.Label>Distance Travelled in KM</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0}
                  max={10000}
                  validated={validated}
                  value={distanceTraveled}
                  onChange={(e) => setDistanceTraveled(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Distance.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="prevRecord">
                <Form.Label>Previous Record</Form.Label>
                <Form.Control
                  required
                  type="number"
                  min={0}
                  max={10000}
                  validated={validated}
                  value={prevRecordOnCounter}
                  onChange={(e) => setPrevRecordOnCounter(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Record.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="currentRecord">
                <Form.Label>Current Record</Form.Label>
                <Form.Control
                  required
                  type="number"
                  min={0}
                  max={1000}
                  validated={validated}
                  value={currentRecordOnCounter}
                  onChange={(e) => setCurrentRecordOnCounter(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Record.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="sourceLocation">
                <Form.Label>Source Location</Form.Label>
                <Form.Control
                  required
                  type="text"
                  minLength={3}
                  maxLength={35}
                  validated={validated}
                  value={sourceLocation}
                  onChange={(e) => setSourceLocation(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Source Location.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="destination">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  required
                  type="text"
                  minLength={3}
                  maxLength={35}
                  validated={validated}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Destination.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="fuelUsed">
                <Form.Label>Amount Fuel Used (L)</Form.Label>
                <Form.Control
                  required
                  min={0}
                  max={100000}
                  validated={validated}
                  value={amountOfFuelUsed}
                  onChange={(e) => setAmountOfFuelUsed(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Amount of fuel Used.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default FuelRequest;
