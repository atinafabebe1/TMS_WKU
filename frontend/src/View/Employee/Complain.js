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
import SubtitlesSharpIcon from "@mui/icons-material/SubtitlesSharp";
import DescriptionSharpIcon from "@mui/icons-material/DescriptionSharp";
const Complain = () => {
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
            <ListGroup.Item action href="/employee/RequestPermission">
              <ContentPasteSearchSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action active href="/employee/makeCoplain">
              <FmdBadSharpIcon color="white" />
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
            <ListGroup.Item action href="/employee/RequestPermission">
              <ContentPasteSearchSharpIcon color="primary" />
              <span> </span>
              Request permission
            </ListGroup.Item>
            <ListGroup.Item action active href="/employee/makeCoplain">
              <FmdBadSharpIcon color="white" />
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
            <h4>Make a Complain</h4>
            <hr></hr>
            <Row className="mb-3">
              <Form.Group controlId="sender">
                <Form.Label>
                  <Person2SharpIcon color="primary" />
                  <span> </span>Sender
                </Form.Label>
                <Form.Control type="id" required minLength={3} maxLength={35} />
                <Form.Control.Feedback type="invalid">
                  Please provide valid sender.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formGridVehicleType">
                <Form.Label>
                  <SubtitlesSharpIcon color="primary" />
                  <span> </span>Title
                </Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={5}
                  maxLength={100}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide valid Title.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>
                <DescriptionSharpIcon color="primary" />
                <span> </span>Description
              </Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={4}
                placeholder="Write your description"
                required
                maxLength={2000}
                minLength={200}
              />
              <Form.Control.Feedback type="invalid">
                Please provide valid Description.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Complain;
