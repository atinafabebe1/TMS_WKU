import React from "react";
import { Button, Col, Alert, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import api from "../../../api/api";
const StoreHome = () => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [dataCount2, setDataCount2] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const fetchRequestData = async () => {
    await api.get(`/Request/sparepart?status=approved`).then((response) => {
      console.log(response.data.data);
      setData(response.data.data);
      setDataCount(response.data.data.length);
    });
  };
  useEffect(() => {
    fetchRequestData();
  }, []);
  const fetchRequestedData = async () => {
    await api
      .get(`/Request/sparepart?status=Garage-approved-to-buy`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setDataCount2(response.data.data.length);
      });
  };
  useEffect(() => {
    fetchRequestedData();
  }, []);
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
          <h4 style={{ textAlign: "center", color: "#4682B4" }}>
            Get And Track Request To Provide Reliable and
          </h4>
          <h5 style={{ textAlign: "center", color: "#4682B4" }}>
            Ontime Response To User
          </h5>
          <br />
          <div className="d-flex justify-content-center align-items-center">
            <div className="p-4">
              <Link to="/store/approve/sparePart-purchasing-request">
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
          >
            <Alert variant="primary">
              {dataCount !== 0 && (
                <p>
                  <Badge bg="danger">{dataCount}</Badge> Approved Spare Part
                  Request Waiting to Complete{" "}
                  <Link to="/store/approve/sparePart-purchasing-request">
                    <Badge bg="info">Complete</Badge>
                  </Link>
                </p>
              )}
              {dataCount2 !== 0 && (
                <p>
                  <Badge bg="danger">{dataCount2} </Badge> Approved to Buy
                  Request{" "}
                  <Link to="/store/approve/sparePart-purchasing-request">
                    <Badge bg="info">See more</Badge>
                  </Link>
                </p>
              )}

              <Button
                className="ms-auto"
                variant="primary"
                onClick={handleDismiss}
              >
                Clear
              </Button>
            </Alert>
          </Container>
        )}
      </div>

      <div style={{ alignItems: "center", paddingLeft: "80px" }}>
        <br></br>
      </div>
    </div>
  );
};

export default StoreHome;
