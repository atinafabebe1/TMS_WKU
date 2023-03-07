import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
const GuardApprovePermission = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="view">
      <div className="sidebar">
        <div class="d-grid">
          <button
            onClick={() => setToggle(!toggle)}
            class="btn btn-outline-secondary mb-5"
          >
            Menu
          </button>
        </div>
        <hr></hr>
        {!toggle && (
          <ListGroup>
            <ListGroup.Item action active href="/guard/approvePermission">
              <PriceCheckIcon color="white" />
              <span> </span>
              Guard Approve Permission
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action active href="/guard/approvePermission">
              <PriceCheckIcon color="white" />
              <span> </span>
              Guard Approve Permission
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="field">
        <div className="App">
          <h4> Approve Permission</h4>
        </div>
      </div>
    </div>
  );
};
export default GuardApprovePermission;
