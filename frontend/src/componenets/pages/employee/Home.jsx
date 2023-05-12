import React from "react";
import { Button, Card, Alert, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../api/api";

const EmployeeHome = () => {
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
          <h4
            style={{
              textAlign: "center",
              color: "#4682B4",
              paddingTop: "100px",
            }}
          >
            Enjoy reliable and convenient transportation services for
            students,faculty,
          </h4>
          <h5 style={{ textAlign: "center", color: "#4682B4" }}>
            and staff. Request transportation services for field trips
          </h5>
          <h5 style={{ textAlign: "center", color: "#4682B4" }}>
            and events with our convenient scheduling system
          </h5>
          <br />
          <div className="d-flex justify-content-center align-items-center">
            <div className="p-4">
              <Link to="/employee/request/vehicle">
                <Button className="align-items-center">
                  <strong>Explore Services</strong>
                </Button>
              </Link>
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

export default EmployeeHome;
