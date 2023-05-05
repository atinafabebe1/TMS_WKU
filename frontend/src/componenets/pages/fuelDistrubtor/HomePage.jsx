import React from "react";
import { Button, Col, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const FDHomePage = () => {
  return (
    <div className="p-4">
      <div style={{ display: "flex" }}>
        <h2 style={{ color: "#6495ED" }}>Transport Management System</h2>
      </div>
      <div>
        <Container className="p-4">
          <Alert variant="primary">
            <p2>
              View Last Registered Fuel, track the change For Better Fuel
              Management.{" "}
              <Link to="/fd/registered-fuel">
                <Button variant="success">Explore</Button>
              </Link>
            </p2>
          </Alert>
        </Container>
      </div>
      <div style={{ alignItems: "center", paddingLeft: "80px" }}>
        <div style={{ display: "flex", paddingLeft: "80px" }}></div>
        <Container className="p-4">
          <Alert variant="primary">
            <p2>
              <strong style={{ color: "#4169E1" }}>
                {" "}
                WKU Transport Management System
              </strong>
              <br></br> Vehicles To Provide access to reliable and convenient
              transportation services.
            </p2>
          </Alert>
        </Container>

        <br></br>
      </div>
    </div>
  );
};

export default FDHomePage;
