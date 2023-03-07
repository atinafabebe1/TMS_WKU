import ListGroup from "react-bootstrap/ListGroup";

//sidebar icon from material UI
import FilterFramesSharpIcon from "@mui/icons-material/FilterFramesSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import DnsSharpIcon from "@mui/icons-material/DnsSharp";
import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";

export const Side1 = () => {
  return (
    <ListGroup>
      <ListGroup.Item action href="/mechanic/receiveMaintenanceOrder">
        <FilterFramesSharpIcon color="primary" />
        <span> </span>
        Maintenance Order
      </ListGroup.Item>
      <ListGroup.Item action href="/mechanic/sendMaintenanceReport">
        <SummarizeSharpIcon color="primary" />
        <span> </span>
        Maintenance Report
      </ListGroup.Item>
      <ListGroup.Item action href="/mechanic/sparePartRequest">
        <DnsSharpIcon color="primary" />
        <span> </span>
        SparePart Request
      </ListGroup.Item>
      <ListGroup.Item action href="/mechanic/approveMaintenance">
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
      <ListGroup.Item action href="/mechanic/receiveMaintenanceOrder">
        <FilterFramesSharpIcon color="primary" />
      </ListGroup.Item>
      <ListGroup.Item action href="/mechanic/sendMaintenanceReport">
        <SummarizeSharpIcon color="primary" />
      </ListGroup.Item>
      <ListGroup.Item action href="/mechanic/sparePartRequest">
        <DnsSharpIcon color="primary" />
      </ListGroup.Item>
      <ListGroup.Item action href="/mechanic/approveMaintenance">
        <AddTaskSharpIcon color="primary" />
      </ListGroup.Item>
    </ListGroup>
  );
};
