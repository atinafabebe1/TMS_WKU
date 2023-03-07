import ListGroup from "react-bootstrap/ListGroup";

//sidebar icon from material UI
import FilterFramesSharpIcon from "@mui/icons-material/FilterFramesSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import DnsSharpIcon from "@mui/icons-material/DnsSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";

export const Side1 = () => {
  return (
    <ListGroup>
      <ListGroup.Item action href="/gd/maintenanceorder">
        <FilterFramesSharpIcon color="primary" />
        <span> </span>
        Maintenance Order
      </ListGroup.Item>
      <ListGroup.Item action href="/gd/maintenancereport">
        <SummarizeSharpIcon color="primary" />
        <span> </span>
        Maintenance Report
      </ListGroup.Item>
      <ListGroup.Item action href="/gd/accessoryrequest">
        <DnsSharpIcon color="primary" />
        <span> </span>
        Accessory Request
      </ListGroup.Item>
      <ListGroup.Item action href="/gd/approvemaintenance">
        <CheckBoxSharpIcon color="primary" />
        <span> </span>
        Approve Maintenance
      </ListGroup.Item>
    </ListGroup>
  );
};

export const Side2 = () => {
  return (
    <ListGroup>
      <ListGroup.Item action href="/gd/maintenanceorder">
        <FilterFramesSharpIcon color="primary" />
      </ListGroup.Item>
      <ListGroup.Item action href="/gd/maintenancereport">
        <SummarizeSharpIcon color="primary" />
      </ListGroup.Item>
      <ListGroup.Item action href="/gd/accessoryrequest">
        <DnsSharpIcon color="primary" />
      </ListGroup.Item>
      <ListGroup.Item action href="/gd/approvemaintenance">
        <CheckBoxSharpIcon color="primary" />
      </ListGroup.Item>
    </ListGroup>
  );
};
