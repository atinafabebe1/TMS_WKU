import ContentPasteSearchSharpIcon from "@mui/icons-material/ContentPasteSearchSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
import QuestionAnswerSharpIcon from "@mui/icons-material/QuestionAnswerSharp";
import CarCrashSharpIcon from "@mui/icons-material/CarCrashSharp";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import EmojiTransportationSharpIcon from "@mui/icons-material/EmojiTransportationSharp";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";

export const Side1 = () => {
  return (
    <ListGroup>
      <ListGroup.Item action href="/employee/RequestPermission">
        <ContentPasteSearchSharpIcon color="primary" />
        <span> </span>
        Request permission
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
  );
};

export const Side2 = () => {
  return (
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
  );
};
