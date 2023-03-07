import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MDBContainer } from "mdb-react-ui-kit";
import React, { useState } from "react";

//material icon import
import EngineeringIcon from "@mui/icons-material/Engineering";
import EvStationSharpIcon from "@mui/icons-material/EvStationSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined";
import AssignmentIndSharpIcon from "@mui/icons-material/AssignmentIndSharp";
import AppRegistrationSharpIcon from "@mui/icons-material/AppRegistrationSharp";
import GpsFixedSharpIcon from "@mui/icons-material/GpsFixedSharp";
import DepartureBoardSharpIcon from "@mui/icons-material/DepartureBoardSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
//main body icon import
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import GarageRoundedIcon from "@mui/icons-material/GarageRounded";
import PersonRemoveSharpIcon from "@mui/icons-material/PersonRemoveSharp";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import DirectionsBusSharpIcon from "@mui/icons-material/DirectionsBusSharp";
import EmojiTransportationTwoToneIcon from "@mui/icons-material/EmojiTransportationTwoTone";
import PinSharpIcon from "@mui/icons-material/PinSharp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TransferVehicle = () => {
  const [toggle, setToggle] = useState(true);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
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
            <ListGroup.Item action href="/hod/registerVehicle">
              <AppRegistrationSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action active href="/hod/assignVehicle">
              <AssignmentIndSharpIcon color="white" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/approveFuelRequest">
              <EvStationSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/approveMaintenance">
              <EngineeringIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/generateReport">
              <SummarizeSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/complain">
              <FmdBadSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/vehicleTraking">
              <GpsFixedSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/transferVehicle">
              <MoveDownOutlinedIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/scheduling">
              <DepartureBoardSharpIcon color="primary" />
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action href="/hod/registerVehicle">
              <AppRegistrationSharpIcon color="primary" />
              <span> </span>
              Register Vehicle
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/assignVehicle">
              <AssignmentIndSharpIcon color="primary" />
              <span> </span>
              Assign Vehicle
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/approveFuelRequest">
              <EvStationSharpIcon color="primary" />
              <span> </span>
              Approve Fuel Request
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/approveMaintenance">
              <EngineeringIcon color="primary" />
              <span> </span>
              Approve Maintenance
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/generateReport">
              <SummarizeSharpIcon color="primary" />
              <span> </span>
              Generate Report
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/complain">
              <FmdBadSharpIcon color="primary" />
              <span> </span>
              Complain
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/vehicleTraking">
              <GpsFixedSharpIcon color="primary" />
              <span> </span>
              Vehicle Tracking
            </ListGroup.Item>
            <ListGroup.Item action active href="/hod/transferVehicle">
              <MoveDownOutlinedIcon />
              <span> </span>
              Transfer Vehicle
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/scheduling">
              <DepartureBoardSharpIcon color="primary" />
              <span> </span>
              Scheduling
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="field">
        <div className="App">
          <MDBContainer breakpoint="lg">
            <Form
              className="form"
              noValidate
              validated={validated}
              checkValidity
              onSubmit={handleSubmit}
            >
              <Row className="mb-3">
                <h3>Vehicle Transfer Form</h3>
              </Row>
              <Row className="mb-3">
                <h5>Vehicle Transfer information</h5>
                <hr></hr>
                <br></br>
                <Form.Group as={Col} controlId="user" className="col col-sm-6">
                  <PersonRemoveSharpIcon color="primary" />
                  <span> </span>
                  <Form.Label>User</Form.Label>
                  <Form.Control
                    type="id"
                    required
                    minLength={3}
                    maxLength={25}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="chassisnumber">
                  <PersonAddSharpIcon color="primary" />
                  <span> </span>
                  <Form.Label>Reciever</Form.Label>
                  <Form.Control
                    type="id"
                    required
                    minLength={3}
                    maxLength={25}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="cc">
                  <DirectionsBusSharpIcon color="primary" />
                  <span> </span>
                  <Form.Label>Vehicle</Form.Label>
                  <Form.Control
                    type="id"
                    required
                    minLength={3}
                    maxLength={25}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="duedate">
                  <EventRoundedIcon color="primary" />
                  <span> </span>

                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="purchaseddates" required />
                </Form.Group>
                <Form.Group as={Col} controlId="modelof vehicle">
                  <GarageRoundedIcon color="primary" />
                  <span> </span>
                  <Form.Label>Model of Vehicle</Form.Label>
                  <Form.Control
                    type="name"
                    required
                    minLength={3}
                    maxLength={25}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="platenumber">
                  <PinSharpIcon color="primary" />
                  <span> </span>
                  <Form.Label>Plate Number</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    minLength={7}
                    maxLength={12}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="Status">
                  <EmojiTransportationTwoToneIcon color="primary" />
                  <span> </span>
                  <Form.Label>Status</Form.Label>
                  <Form.Select as={Col} defaultValue={"Choose..."} required>
                    <option value="Waiting Approval">Waiting Approval</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Approved">Approved</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">
                Done <CheckCircleIcon color="white" />
              </Button>
            </Form>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
};
export default TransferVehicle;
