import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ListGroup from "react-bootstrap/ListGroup";
export const Side1 = () => {
  return (
    <ListGroup>
      <ListGroup.Item action href="/director/manageUser">
        <ManageAccountsIcon color="primary" />
        <span> </span>
        Manage User
      </ListGroup.Item>
      <ListGroup.Item action href="/director/generateMonthlyReport">
        <AssessmentIcon color="primary" />
        <span> </span>
        Generate Report
      </ListGroup.Item>
      <ListGroup.Item action href="/director/approvePurchesingRequest">
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
      <ListGroup.Item action href="/director/manageUser">
        <ManageAccountsIcon color="primary" />
      </ListGroup.Item>
      <ListGroup.Item action href="/director/generateMonthlyReport">
        <AssessmentIcon color="primary" />
      </ListGroup.Item>
      <ListGroup.Item action href="/director/approvePurchesingRequest">
        <PriceCheckIcon color="primary" />
      </ListGroup.Item>
    </ListGroup>
  );
};
