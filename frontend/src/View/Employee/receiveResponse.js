import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ContentPasteSearchSharpIcon from "@mui/icons-material/ContentPasteSearchSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
import QuestionAnswerSharpIcon from "@mui/icons-material/QuestionAnswerSharp";
import CarCrashSharpIcon from "@mui/icons-material/CarCrashSharp";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import EmojiTransportationSharpIcon from "@mui/icons-material/EmojiTransportationSharp";

const ReceiveResponse = () => {
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
            <ListGroup.Item action  href="/employee/RequestPermission">
              <ContentPasteSearchSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action  href="/employee/makeCoplain">
              <FmdBadSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action active href="/employee/receiveResponse">
              <QuestionAnswerSharpIcon color="white" />
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
            <ListGroup.Item action  href="/employee/RequestPermission">
              <ContentPasteSearchSharpIcon color="primary" />
              <span> </span>
              Request Permission
            </ListGroup.Item>
            <ListGroup.Item action  href="/employee/makeCoplain">
              <FmdBadSharpIcon color="primary"/>
              <span> </span>
              Make complain
            </ListGroup.Item>
            <ListGroup.Item action active href="/employee/receiveResponse">
              <QuestionAnswerSharpIcon color="white" />
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
          <Form className="form">
            <h4>Response Page</h4>
     
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ReceiveResponse;
