import ListGroup from "react-bootstrap/ListGroup";

//sidebar icon from material UI
import DnsSharpIcon from "@mui/icons-material/DnsSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";

import React, { useState } from "react";
const ApprovePurchasing = () => {
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
            <ListGroup.Item action href="/store/approvepurchasing">
              <DnsSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/store/generateReport">
              <CheckBoxSharpIcon color="primary" />
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
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
        )}
      </div>
      <div className="page">
        <p> STORE SIDE</p>
      </div>
    </div>
  );
};
export default ApprovePurchasing;
