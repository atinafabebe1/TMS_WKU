import { Row, Col, Form, Button, FormSelect, Modal } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import ContentPasteSearchSharpIcon from "@mui/icons-material/ContentPasteSearchSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
import QuestionAnswerSharpIcon from "@mui/icons-material/QuestionAnswerSharp";
import CarCrashSharpIcon from "@mui/icons-material/CarCrashSharp";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import EmojiTransportationSharpIcon from "@mui/icons-material/EmojiTransportationSharp";
import PersonRemoveSharpIcon from "@mui/icons-material/PersonRemoveSharp";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import DirectionsBusSharpIcon from "@mui/icons-material/DirectionsBusSharp";
import FormatColorFillSharpIcon from "@mui/icons-material/FormatColorFillSharp";
import FmdGoodSharpIcon from "@mui/icons-material/FmdGoodSharp";
import PinSharpIcon from "@mui/icons-material/PinSharp";
import LivingSharpIcon from "@mui/icons-material/LivingSharp";
import StartSharpIcon from "@mui/icons-material/StartSharp";
import CancelScheduleSendSharpIcon from "@mui/icons-material/CancelScheduleSendSharp";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import axios from "axios";

const VehicleRequest = () => {
  const [toggle, setToggle] = useState(true);
  const [from, setFromDate] = useState("");
  const [to, setToDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [reciever, setReciever] = useState("");
  const [users, setUsers] = useState([]);
  const [destination, setDestination] = useState("");
  const [validated, setValidated] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showVehicleSelectionModal, setShowVehicleSelectionModal] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowVehicleSelectionModal(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.get(
          "/VehicleRecord?select=unavailable,maxPerson,maxLoad,plateNumber,_id&isDeleted=false"
        );
        setVehicles(response.data?.data);
        setShowVehicleSelectionModal(true);
      } catch (error) {
        console.error(error);
      }
    }
    setValidated(true);
  };
  const handleReceiverClick = async () => {
    try {
      const response = await axios.get(
        "/User/getusers?role=ROLE_HEADOFDEPLOYMENT&select=id,firstName,lastName/"
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleVehicleSelection = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleSelectionModal(false);
  };

  const handleRequestSubmit = async () => {
    console.log(reciever);
    console.log("posting");
    try {
      await axios.post("/Request/vehicle", {
        date: {
          from,
          to,
        },
        purpose,
        destination,
        recieverId: reciever,
        plateNumber: selectedVehicle.plateNumber,
      });
      alert("Vehicle request submitted successfully!");
      setShowVehicleSelectionModal(false);
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while submitting the vehicle request. Please try again later."
      );
    }
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
            <ListGroup.Item action href="/employee/RequestPermission">
              <ContentPasteSearchSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/employee/makeCoplain">
              <FmdBadSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/employee/receiveResponse">
              <QuestionAnswerSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action active href="/employee/requestVehicle">
              <CarCrashSharpIcon color="white" />
            </ListGroup.Item>
            <ListGroup.Item action href="/employee/viewSchedule">
              <PendingActionsSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/employee/receiveVehicle">
              <EmojiTransportationSharpIcon color="primary" />
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action href="/employee/RequestPermission">
              <ContentPasteSearchSharpIcon color="primary" />
              <span> </span>
              Request Permission
            </ListGroup.Item>
            <ListGroup.Item action href="/employee/makeCoplain">
              <FmdBadSharpIcon color="primary" />
              <span> </span>
              Make complain
            </ListGroup.Item>
            <ListGroup.Item action href="/employee/receiveResponse">
              <QuestionAnswerSharpIcon color="primary" />
              <span> </span>
              Receive response
            </ListGroup.Item>
            <ListGroup.Item action active href="/employee/requestVehicle">
              <CarCrashSharpIcon color="white" />
              <span> </span>
              Request vehicle
            </ListGroup.Item>
            <ListGroup.Item action href="/employee/viewSchedule">
              <PendingActionsSharpIcon color="primary" />
              <span> </span>
              View schedule
            </ListGroup.Item>
            <ListGroup.Item action href="/employee/receiveVehicle">
              <EmojiTransportationSharpIcon color="primary" />
              <span> </span>
              Receive Vehicle
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="field">
        <div className="App">
          <div className="main">
            <h1>Vehicle Request Form</h1>
            <Form noValidate validated={validated}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={from}
                    onChange={(event) => setFromDate(event.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid date range.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    value={to}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid date range.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Row} controlId="formReceiver">
                  <Form.Label column sm={2}>
                    Receiver
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Select
                      value={reciever}
                      onChange={(e) => setReciever(e.target.value)}
                      onClick={handleReceiverClick}
                    >
                      <option>Select a receiver</option>
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.firstName} {user.lastName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom07">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Button onClick={handleSubmit}>Next</Button>
              <Modal
                show={showVehicleSelectionModal}
                onHide={() => setShowVehicleSelectionModal(false)}
              >
                <Form onSubmit={handleRequestSubmit}>
                  <Modal.Header closeButton>
                    <Modal.Title>Select a Vehicle</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ListGroup>
                      {vehicles.length > 0 &&
                        vehicles.map((vehicle) => (
                          <ListGroup.Item
                            key={vehicle._id}
                            onClick={() => setSelectedVehicle(vehicle)}
                          >
                            <p>Plate Number {vehicle.plateNumber}</p>
                            <p>Max Person {vehicle.maxPerson}</p>
                            <p>Max Load {vehicle.maxLoad}</p>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => setShowVehicleSelectionModal(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={!selectedVehicle}>
                      Request Vehicle
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VehicleRequest;
