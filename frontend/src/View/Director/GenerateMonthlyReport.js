import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
const GenerateMonthlyReport = () => {
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
            <ListGroup.Item action active href="/director/generateMonthlyReport">
            <AssessmentIcon color="white" />
            </ListGroup.Item>
            <ListGroup.Item action  href="/director/approvePurchesingRequest">
            <PriceCheckIcon color="primary"/>
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
            <ListGroup.Item action active href="/director/generateMonthlyReport">
            <AssessmentIcon color="white" />
            <span> </span>
              Generate Report
            </ListGroup.Item>
            <ListGroup.Item action  href="/director/approvePurchesingRequest">
              <PriceCheckIcon color="primary"/>
              <span> </span>
              Approve Request
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="page"></div>
    </div>
  );
};
export default GenerateMonthlyReport;
