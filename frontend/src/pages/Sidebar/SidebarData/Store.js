import ListGroup from "react-bootstrap/ListGroup";

//sidebar icon from material UI
import DnsSharpIcon from "@mui/icons-material/DnsSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";

export const Side1 = () => {
  return (
    <ListGroup>
      <ListGroup.Item action href="/store/approvepurchasing">
        <DnsSharpIcon color="primary" />
        <span> </span>
        Approve Purchasing
      </ListGroup.Item>
      <ListGroup.Item action href="/store/generateReport">
        <CheckBoxSharpIcon color="primary" />
        <span> </span>
        Generate Report
      </ListGroup.Item>
    </ListGroup>
  );
};

export const Side2 = () => {
  return (
    <ListGroup>
      <ListGroup.Item action href="/store/approvepurchasing">
        <DnsSharpIcon color="primary" />
      </ListGroup.Item>
      <ListGroup.Item action href="/store/generateReport">
        <CheckBoxSharpIcon color="primary" />
      </ListGroup.Item>
    </ListGroup>
  );
};
