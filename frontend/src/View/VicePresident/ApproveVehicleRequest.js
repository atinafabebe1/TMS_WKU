import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import ContentPasteSearchSharpIcon from "@mui/icons-material/ContentPasteSearchSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
import QuestionAnswerSharpIcon from "@mui/icons-material/QuestionAnswerSharp";
import CarCrashSharpIcon from "@mui/icons-material/CarCrashSharp";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import EmojiTransportationSharpIcon from "@mui/icons-material/EmojiTransportationSharp";

const ApproveVehicleRequest = () => {
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
    <>
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
              <ListGroup.Item action active href="/vp/approveVehicleRequest">
                <ContentPasteSearchSharpIcon color="white" />
              </ListGroup.Item>

              <ListGroup.Item action href="/employee/receiveResponse">
                <QuestionAnswerSharpIcon color="primary" />
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

              <ListGroup.Item action href="/vp/receiveResponse">
                <QuestionAnswerSharpIcon color="primary" />
              </ListGroup.Item>

              <ListGroup.Item action href="/vp/schedule">
                <PendingActionsSharpIcon color="primary" />
              </ListGroup.Item>
            </ListGroup>
          )}
          {toggle && (
            <>
              <ListGroup>
                <ListGroup.Item action active href="/vp/approveVehicleRequest">
                  <ContentPasteSearchSharpIcon color="white" />
                  <span> </span>
                  Approve Vehicle
                </ListGroup.Item>
                <CarCrashSharpIcon color="primary" />
                <span> </span>
                Request Vehicle
                {/* </ListGroup.Item> */}
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
            </>
          )}
        </div>
        <div className="field">
          <div className="App">
            <h4>Approve Vehicle Request</h4>
          </div>
        </div>
      </div>
    </>
  );
};
export default ApproveVehicleRequest;
