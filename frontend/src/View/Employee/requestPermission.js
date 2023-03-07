import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ContentPasteSearchSharpIcon from "@mui/icons-material/ContentPasteSearchSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
import QuestionAnswerSharpIcon from "@mui/icons-material/QuestionAnswerSharp";
import CarCrashSharpIcon from "@mui/icons-material/CarCrashSharp";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import EmojiTransportationSharpIcon from "@mui/icons-material/EmojiTransportationSharp";
import Person2SharpIcon from "@mui/icons-material/Person2Sharp";
import AddPhotoAlternateSharpIcon from "@mui/icons-material/AddPhotoAlternateSharp";

const RequestPermission = () => {
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
            <ListGroup.Item action active href="/employee/RequestPermission">
              <ContentPasteSearchSharpIcon color="white" />
            </ListGroup.Item>
            <ListGroup.Item action href="/employee/makeCoplain">
              <FmdBadSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/employee/receiveResponse">
              <QuestionAnswerSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/employee/requestVehicle">
              <CarCrashSharpIcon color="primary" />
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
            <ListGroup.Item action active href="/employee/RequestPermission">
              <ContentPasteSearchSharpIcon color="white" />
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
            <ListGroup.Item action href="/employee/requestVehicle">
              <CarCrashSharpIcon color="primary" />
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
          <Form
            className="form"
            noValidate
            validated={validated}
            checkValidity
            onSubmit={handleSubmit}
          >
            <h4>Request To Drive</h4>
            <hr></hr>
            <Row className="mb-3">
              <Form.Group controlId="sender">
                <Form.Label>
                  <Person2SharpIcon color="primary" />
                  <span> </span>Sender
                </Form.Label>
                <Form.Control type="id" required minLength={3} maxLength={35} />
                <Form.Control.Feedback type="invalid">
                  Please provide valid sender Id.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="licenseImage">
                <AddPhotoAlternateSharpIcon color="primary" />
                <span> </span>
                <Form.Label>License Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="vehicleimage"
                  required
                />
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
export default RequestPermission;
