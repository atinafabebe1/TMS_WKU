import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MDBContainer } from "mdb-react-ui-kit";
import EngineeringIcon from "@mui/icons-material/Engineering";
import EvStationSharpIcon from "@mui/icons-material/EvStationSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";

const DrReceiveVehicle = () => {
  const [toggle, setToggle] = useState(true);
  const [validated, setValidated] = useState(false);
  const [deliverer, setDeliverer] = useState("");
  const [receiver, setReceiver] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [date, setDate] = useState("");
  const [modelofVehicle, setModelofVehicle] = useState("");
  const [platenumber, setPlatenumber] = useState("");
  const [status, setStatus] = useState("");

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
        <hr />
        {!toggle && (
          <ListGroup>
            {" "}
            <ListGroup.Item action href="/driver/maintenanceRequest">
              <EngineeringIcon color="primary" />
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
            <ListGroup.Item action active href="/driver/receiveVehicle">
              <CallReceivedOutlinedIcon />
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
            <ListGroup.Item action active href="/driver/receiveVehicle">
              <CallReceivedOutlinedIcon />
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
          <MDBContainer>
            <Form
              className="form"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <Row className="mb-3">
                <h3>Vehicle Receive Form</h3>
              </Row>
              <Row className="mb-3">
                <h5>Vehicle Receive information</h5>
                <hr />
                <br />
                <Form.Group
                  as={Col}
                  controlId="deliverer"
                  className="col col-sm-6"
                >
                  <Form.Label>Deliverer</Form.Label>
                  <Form.Control
                    required
                    type="name"
                    minLength={3}
                    maxLength={35}
                    value={deliverer}
                    onChange={(e) => setDeliverer(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid deliverer.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="receiver">
                  <Form.Label>Receiver</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={receiver}
                    minLength={3}
                    maxLength={35}
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid receiver.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="cc">
                  <Form.Label>Vehicle</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    minLength={3}
                    maxLength={25}
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid vehicle.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="duedate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="purchaseddates"
                    checkValidity
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid date.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="modelof vehicle">
                  <Form.Label>Model of Vehicle</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    minLength={5}
                    maxLength={15}
                    checkValidity
                    value={modelofVehicle}
                    onChange={(e) => setModelofVehicle(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid model of vehicle.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="platenumber">
                  <Form.Label>Plate Number</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    minLength={7}
                    maxLength={15}
                    checkValidity
                    value={platenumber}
                    onChange={(e) => setPlatenumber(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid plate number.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="Status">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    as={Col}
                    defaultValue="Choose..."
                    required
                    checkValidity
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Waiting Approval">Waiting Approval</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Approved">Approved</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please Choose a valid Status.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </Form>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
};
export default DrReceiveVehicle;
