import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
const ApprovePurchesingRequest = () => {
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
            <ListGroup.Item action href="/director/manageUser">
              <ManageAccountsIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/director/generateMonthlyReport">
            <AssessmentIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action active href="/director/approvePurchesingRequest">
            <PriceCheckIcon color="white"/>
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
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
            <ListGroup.Item action active href="/director/approvePurchesingRequest">
              <PriceCheckIcon color="white"/>
              <span> </span>
              Approve Request
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="page">
        <p>Lets Approve purchesing Request</p>
      </div>
    </div>
  );
};
export default ApprovePurchesingRequest;
