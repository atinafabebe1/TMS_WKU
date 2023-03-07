import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import EngineeringIcon from "@mui/icons-material/Engineering";
import EvStationSharpIcon from "@mui/icons-material/EvStationSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";

const DrComplain = () => {
  const [toggle, setToggle] = useState(true);
  const [validated, setValidated] = useState(false);
  const [sender, setSender] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
            <ListGroup.Item action href="/driver/maintenanceRequest">
              <EngineeringIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/fuelRequest">
              <EvStationSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action active href="/driver/complain">
              <FmdBadSharpIcon />
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
            <ListGroup.Item action href="/driver/fuelRequest">
              <EvStationSharpIcon color="primary" />
              <span> </span>
              Fuel Request
            </ListGroup.Item>
            <ListGroup.Item action active href="/driver/complain">
              <FmdBadSharpIcon />
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
            checkValidity
            onSubmit={handleSubmit}
          >
            <h4>Make a Complain</h4>

            <Row className="mb-3">
              <Form.Group controlId="sender" form-text-color="text-muted">
                <Form.Label>Sender</Form.Label>
                <Form.Control
                  className="w-150"
                  type="text"
                  minLength={8}
                  maxLength={10}
                  checkValidity
                  required
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide valid sender.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formGridVehicleType">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className="w-200"
                  type="name"
                  minLength={20}
                  maxLength={35}
                  checkValidity
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide valid title.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group as={Row} className="mb-3" controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                rows={4}
                minLength={200}
                maxLength={700}
                placeholder="Write your description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a description.
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="btn btn-primary mb-3"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default DrComplain;
