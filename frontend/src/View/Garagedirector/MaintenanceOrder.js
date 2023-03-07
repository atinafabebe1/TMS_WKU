import ListGroup from "react-bootstrap/ListGroup";

//sidebar icon from material UI
import FilterFramesSharpIcon from "@mui/icons-material/FilterFramesSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import DnsSharpIcon from "@mui/icons-material/DnsSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";

import React, { useState } from "react";
const GDMaintenanceOrder = () => {
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
        )}
        {toggle && (
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
        )}
      </div>
      <div className="page">
        <p>Garage Director Maintenance Order SIDE</p>
      </div>
    </div>
  );
};
export default GDMaintenanceOrder;
