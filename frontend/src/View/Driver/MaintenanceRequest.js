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
//import Nav from 'react-bootstrap/Nav';
const RegisterUser = () => {
  const [toggle, setToggle] = useState(true);
  const [validated, setValidated] = useState(false);
  const [date, setDate] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [VehicleType, setVehicleType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    //Post request
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
            <ListGroup.Item action active href="/driver/maintenanceRequest">
              <EngineeringIcon />
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/fuelRequest">
              <EvStationSharpIcon color="primary" />
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
            <ListGroup.Item action active href="/driver/maintenanceRequest">
              <EngineeringIcon />
              <span> </span>
              Maintenance Request
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/fuelRequest">
              <EvStationSharpIcon color="primary" />
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
            <Row className="mb-3" w-70>
              <h4>Detail Information</h4>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                controlId="platenumber"
                className="col col-sm-6"
              >
                <Form.Label>Plate Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="plate number"
                  required
                  minLength={7}
                  maxLength={15}
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Plate Number.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="formGridVehicleType"
                className="col col-sm-6"
              >
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Select
                  value={VehicleType}
                  required
                  onChange={(e) => setVehicleType(e.target.value)}
                  defaultValue="Choose..."
                >
                  <option value="typeBus">BUS</option>
                  <option value="typeTruck">Truck</option>
                  <option value="typePickUp">Pick Up</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="reqdate"
                  required
                  placeholder="Request Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Date.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                size="lg"
                className="col col-sm-30"
                controlId="Description"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  required
                  minLength={200}
                  maxLength={700}
                  rows={4}
                  placeholder="Write your description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Description.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <span> </span>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default RegisterUser;
