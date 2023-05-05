import React from "react";
import { Button, Col, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const FDHomePage = () => {
  return (
    <div className="p-4">
      <div style={{ display: "flex" }}>
        <h2 style={{ color: "#6495ED", paddingLeft: "20px" }}>
          Transport Management System
        </h2>
      </div>

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
  );
};

export default FDHomePage;
