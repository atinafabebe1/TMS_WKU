import React from "react";
import { Button, Card, Alert, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import api from "../../../api/api";
const MechanicHome = () => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [dataCount2, setDataCount2] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  const handleDismiss = () => {
    setShowNotification(false);
  };
  return (
    <div className="p-4">
      <div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 style={{ textAlign: "center", color: "#4682B4" }}>
            Get And Track Request up on Update
          </h5>
          <h5 style={{ textAlign: "center", color: "#4682B4" }}>
            To Track Changes in Your Request
          </h5>
          <hr></hr>
          <br />
          <div className="d-flex justify-content-center align-items-center">
            <div className="p-4">
              <Link to="/mechanic/request/accessory">
                <Button className="align-items-center">
                  <strong>Explore Request</strong>
                </Button>
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="p-4">
              <Card>
                <Card.Header className="bg-secondary text-light">
                  Order
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                      Get Maintenance Assigned For <br />
                      You And Accept
                    </h6>
                  </Card.Text>

                  <div className="text-center">
                    <Link to="/mechanic/maintenance/receive-maintenance-order">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        style={{ width: "200px" }}
                      >
                        See More
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="p-4">
              <Card>
                <Card.Header className="bg-secondary text-light">
                  Approval
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                      Check Maintained Vehicle Properly <br />
                      And Approve
                    </h6>
                  </Card.Text>

                  <div className="text-center">
                    <Link to="/mechanic/maintenance/approve-maintenance">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        style={{ width: "200px" }}
                      >
                        See More
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="p-4">
              <Card>
                <Card.Header className="bg-secondary text-light">
                  Report
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                      Report Completed And <br />
                      Approved Maintenance
                    </h6>
                  </Card.Text>

                  <div className="text-center">
                    <Link to="/mechanic/maintenance/send-maintenance-report">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        style={{ width: "200px" }}
                      >
                        See More
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        {showNotification && (
          <Container
            style={{
              width: "400px",
              position: "fixed",
              bottom: "50px",
              right: "10px",
              zIndex: "9999",
            }}
          ></Container>
        )}
      </div>

      <div style={{ alignItems: "center", paddingLeft: "80px" }}>
        <br></br>
      </div>
    </div>
  );
};

export default MechanicHome;
