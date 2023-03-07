import { Container, Card, CardGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
const ManageUser = () => {
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
            <ListGroup.Item action active href="/director/manageUser">
              <ManageAccountsIcon color="white" />
            </ListGroup.Item>
            <ListGroup.Item action  href="/director/generateMonthlyReport">
            <AssessmentIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action  href="/director/approvePurchesingRequest">
            <PriceCheckIcon color="primary"/>
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action active href="/director/manageUser">
            <ManageAccountsIcon color="primary" />
            <span> </span>
              Manage User
            </ListGroup.Item>
            <ListGroup.Item action  href="/director/generateMonthlyReport">
            <AssessmentIcon color="primary" />
            <span> </span>
              Generate Report
            </ListGroup.Item>
            <ListGroup.Item action  href="/director/approvePurchesingRequest">
              <PriceCheckIcon color="white"/>
              <span> </span>
              Approve Request
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="field">
        <div className="App">
          <Container className="p-4">
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>Add new user to system</Card.Title>
                  <Link to={"/director/registerUser"}>
                    <Button variant="primary">Add New</Button>
                  </Link>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>View user information</Card.Title>
                  <Link to={"/Director/userInfo"}>
                    <Button variant="primary">View Info</Button>
                  </Link>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>View New Information</Card.Title>
                  <Link to={"/director/whatsNew"}>
                    <Button variant="primary">Whats new</Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardGroup>
          </Container>
        </div>
      </div>
    </div>
  );
};
export default ManageUser;
