import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ContentPasteSearchSharpIcon from "@mui/icons-material/ContentPasteSearchSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
import QuestionAnswerSharpIcon from "@mui/icons-material/QuestionAnswerSharp";
import CarCrashSharpIcon from "@mui/icons-material/CarCrashSharp";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import EmojiTransportationSharpIcon from "@mui/icons-material/EmojiTransportationSharp";

const VPReceiveResponse = () => {
  const [toggle, setToggle] = useState(true);
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
            <ListGroup.Item action href="/vp/requestVehicle">
              <CarCrashSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/vp/receiveVehicle">
              <EmojiTransportationSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/vp/complain">
              <FmdBadSharpIcon color="primary" />
            </ListGroup.Item>

            <ListGroup.Item action active href="/vp/receiveResponse">
              <QuestionAnswerSharpIcon color="white" />
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
            <ListGroup.Item action href="/vp/requestVehicle">
              <CarCrashSharpIcon color="primary" />
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

            <ListGroup.Item action active href="/vp/receiveResponse">
              <QuestionAnswerSharpIcon color="white" />
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
          <Form className="form">
            <h4>Response Page</h4>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default VPReceiveResponse;
