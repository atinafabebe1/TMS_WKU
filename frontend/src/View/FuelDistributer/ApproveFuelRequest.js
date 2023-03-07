import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
const FDApproveFuelRequest = () => {
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
            <ListGroup.Item action href="/fd/registerDailyFuel">
              <AssessmentIcon color="primary" />
              <span> </span>
              Register Daily Fuel
            </ListGroup.Item>
            <ListGroup.Item action active href="/fd/approveFuelRequest">
              <PriceCheckIcon color="white" />
              <span> </span>
              Approve Request
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action href="/fd/registerDailyFuel">
              <AssessmentIcon color="primary" />
              <span> </span>
              Register Daily Fuel
            </ListGroup.Item>
            <ListGroup.Item action active href="/fd/approveFuelRequest">
              <PriceCheckIcon color="white" />
              <span> </span>
              Approve Request
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="field">
        <div className="App">
          <h4>Approve fuel Request</h4>
        </div>
      </div>
    </div>
  );
};
export default FDApproveFuelRequest;
