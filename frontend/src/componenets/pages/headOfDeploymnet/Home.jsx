import React from "react";
import { Button, Col, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PieCharts from "../../common/Graph/pieCharts";
import BarCharts from "../../common/Graph/BarCharts";
import VerticalBarCharts from "../../common/Graph/VerticalBar";
const Example = () => {
  return (
    <div className="p-4">
      <div style={{ display: "flex" }}>
        <h2 style={{ color: "#6495ED" }}>Transport Management System</h2>

        <Col className="text-end">
          <Link to="/hd/vehicles">
            <Button variant="primary">Get Vehicles Detail</Button>
          </Link>
        </Col>
      </div>
      <div>
        <Container className="p-4">
          <Alert variant="primary">
            <p2>
              View assigned routes and schedules, track the shuttle in
              real-time, and view Requested Information to Manage Better.{" "}
              <Link to="/hd/request/vehicle">
                <Button variant="success">Explore</Button>
              </Link>
            </p2>
          </Alert>
        </Container>
      </div>
      <div style={{ alignItems: "center", paddingLeft: "80px" }}>
        <div style={{ display: "flex", paddingLeft: "80px" }}>
          <div>
            <PieCharts />
          </div>
          <div style={{ paddingLeft: "80px" }}>
            <VerticalBarCharts />
          </div>
        </div>
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
        <div>
          <BarCharts />
        </div>
      </div>
    </div>
  );
};

export default Example;
