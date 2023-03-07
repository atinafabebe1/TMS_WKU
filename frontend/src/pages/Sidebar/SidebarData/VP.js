import ContentPasteSearchSharpIcon from "@mui/icons-material/ContentPasteSearchSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
import QuestionAnswerSharpIcon from "@mui/icons-material/QuestionAnswerSharp";
import CarCrashSharpIcon from "@mui/icons-material/CarCrashSharp";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import EmojiTransportationSharpIcon from "@mui/icons-material/EmojiTransportationSharp";
import ListGroup from "react-bootstrap/ListGroup";

export const Side1 = () => {
  return (
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
  );
};

export const Side2 = () => {
  return (
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

      <ListGroup.Item action href="/vp/receiveResponse">
        <QuestionAnswerSharpIcon color="primary" />
      </ListGroup.Item>

      <ListGroup.Item action href="/vp/schedule">
        <PendingActionsSharpIcon color="primary" />
      </ListGroup.Item>
    </ListGroup>
  );
};
