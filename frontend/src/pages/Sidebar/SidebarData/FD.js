import AssessmentIcon from "@mui/icons-material/Assessment";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ListGroup from "react-bootstrap/ListGroup";
export const Side1 = () => {
  return (
    <ListGroup>
      <ListGroup.Item action href="/fd/registerDailyFuel">
        <AssessmentIcon color="primary" />
        <span> </span>
        Register Daily Fuel
      </ListGroup.Item>
      <ListGroup.Item action href="/fd/approveFuelRequest">
        <PriceCheckIcon color="primary" />
        <span> </span>
        Approve Request
      </ListGroup.Item>
    </ListGroup>
  );
};

export const Side2 = () => {
  return (
    <ListGroup>
      <ListGroup.Item action href="/fd/registerDailyFuel">
        <AssessmentIcon color="primary" />
      </ListGroup.Item>
      <ListGroup.Item action href="/fd/approveFuelRequest">
        <PriceCheckIcon color="primary" />
      </ListGroup.Item>
    </ListGroup>
  );
};
