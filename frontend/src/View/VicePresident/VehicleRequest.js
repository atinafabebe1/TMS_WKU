import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
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
const VPRequestVehicle = () => {
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
            <ListGroup.Item action href="/vp/approveVehicleRequest">
              <ContentPasteSearchSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action active href="/vp/requestVehicle">
              <CarCrashSharpIcon color="white" />
            </ListGroup.Item>
            <ListGroup.Item action href="/vp/receiveVehicle">
              <EmojiTransportationSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/vp/complain">
              <FmdBadSharpIcon color="primary" />
            </ListGroup.Item>

            <ListGroup.Item action href="/vp/receiveResponse">
              <QuestionAnswerSharpIcon color="primary" />
            </ListGroup.Item>

            <ListGroup.Item action href="/vp/schedule">
              <PendingActionsSharpIcon color="primary" />
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action href="/vp/approveVehicleRequest">
              <ContentPasteSearchSharpIcon color="primary" />
              <span> </span>
              Approve Vehicle
            </ListGroup.Item>
            <ListGroup.Item action active href="/vp/requestVehicle">
              <CarCrashSharpIcon color="white" />
              <span> </span>
              Request Vehicle
            </ListGroup.Item>
            <ListGroup.Item action href="/vp/receiveVehicle">
              <EmojiTransportationSharpIcon color="primary" />
              <span> </span>
              Receive Vehicle
            </ListGroup.Item>
            <ListGroup.Item action href="/vp/complain">
              <FmdBadSharpIcon color="primary" />
              <span> </span>
              Make Complain
            </ListGroup.Item>

            <ListGroup.Item action href="/vp/receiveResponse">
              <QuestionAnswerSharpIcon color="primary" />
              <span> </span>
              Receive Response
            </ListGroup.Item>

            <ListGroup.Item action href="/vp/schedule">
              <PendingActionsSharpIcon color="primary" />
              <span> </span>
              View Schedule
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
            checkValidity
            onSubmit={handleSubmit}
          >
            <Row className="mb-3" w-70>
              <h4>Detail Information</h4>
              <hr></hr>
              <Form.Group size="lg" as={Col} controlId="sender">
                <Form.Label>
                  <PersonRemoveSharpIcon color="primary" />
                  <span> </span>Sender
                </Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={3}
                  maxLength={35}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="receiver">
                <Form.Label>
                  <PersonAddSharpIcon color="primary" />
                  <span> </span>Receiver
                </Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={3}
                  maxLength={35}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="vehicle">
                <Form.Label>
                  <DirectionsBusSharpIcon color="primary" />
                  <span> </span>Vehicle
                </Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={3}
                  maxLength={35}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>
                  <FormatColorFillSharpIcon color="primary" />
                  <span> </span>Type
                </Form.Label>
                <Form.Select defaultValue={"Choose..."} required>
                  <option value="Car">Car</option>
                  <option value="Truck">Truck</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="platenumber">
                <Form.Label>
                  <PinSharpIcon color="primary" />
                  <span> </span>Plate Number
                </Form.Label>
                <Form.Control
                  type="number"
                  required
                  minLength={7}
                  maxLength={12}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="destination">
                <Form.Label>
                  <FmdGoodSharpIcon color="primary" />
                  <span> </span>Destination
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  minLength={3}
                  maxLength={65}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="purpose">
                <Form.Label>
                  <LivingSharpIcon color="primary" />
                  <span> </span>Purpose
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  minLength={3}
                  maxLength={200}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="date">
                <Form.Label>
                  <StartSharpIcon color="primary" />
                  <span> </span>From
                </Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
              <Form.Group as={Col} controlId="date">
                <Form.Label>
                  <CancelScheduleSendSharpIcon color="primary" />
                  <span> </span>To
                </Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Send<span> </span>
              <SendSharpIcon color="white" />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default VPRequestVehicle;
