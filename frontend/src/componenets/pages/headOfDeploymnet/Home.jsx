import React from "react";
import { Button, Col, Alert, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import PieCharts from "../../common/Graph/pieCharts";
import BarCharts from "../../common/Graph/BarCharts";
import VerticalBarCharts from "../../common/Graph/VerticalBar";
import { useState, useEffect } from "react";
import api from "../../../api/api";
const Example = () => {
  const [complains, setComplains] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const fetchComplainData = async () => {
    await api.get(`/Complain?status=Pending`).then((response) => {
      console.log(response.data.data);
      setComplains(response.data.data);
      setDataCount(response.data.data.length);
    });
  };
  useEffect(() => {
    fetchComplainData();
  }, []);

  return (
    <div className="p-4">
      <div style={{ display: "flex" }}>
        <h2 style={{ color: "#6495ED" }}>Transport Management System</h2>

        <Col className="text-end">
          <Link to="/hd/vehicles">
            <Button variant="primary">Get Vehicles</Button>
          </Link>
        </Col>
      </div>
      <div>
        {dataCount !== 0 && (
          <Container className="p-4">
            <Alert variant="primary">
              <p2>
                <Badge bg="danger">{dataCount}</Badge> Complains Waiting for
                your Response{" "}
                <Link to="/hd/complain">
                  <Badge bg="success">Resolve</Badge>
                </Link>
              </p2>
            </Alert>
          </Container>
        )}
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
