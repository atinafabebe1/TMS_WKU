import React from "react";
import { Button, Card, Alert, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import api from "../../../api/api";
const VpHomePage = () => {
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
            Track and Approve Vehicle Request
          </h5>
          <br />

          <hr></hr>
          <div className="d-flex justify-content-center align-items-center">
            <div className="p-4">
              <Card>
                <Card.Header className="form-control-custom">
                  Request
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                      Explore Request
                    </h6>
                  </Card.Text>

                  <div className="text-center">
                    <Link to="/vp/request/vehicle">
                      <Button
                        variant="outline-success"
                        size="sm"
                        style={{ width: "250px" }}
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

export default VpHomePage;
