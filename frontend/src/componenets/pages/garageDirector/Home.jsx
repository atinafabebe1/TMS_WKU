import React from "react";
import { Button, Card, Alert, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../api/api";

const GDHome = () => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [dataCount2, setDataCount2] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  const handleDismiss = () => {
    setShowNotification(false);
  };

  const fetchRequestData = async () => {
    await api.get(`/Request/sparepart?status=pending`).then((response) => {
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
      .get(`/Request/sparepart?status=store-approved-to-buy`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setDataCount2(response.data.data.length);
      });
  };
  useEffect(() => {
    fetchRequestedData();
  }, []);

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
              <Link to="/gd/request/get-accessory-request">
                <Button className="align-items-center">
                  <strong>Explore Request</strong>
                </Button>
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="p-4">
              <Card>
                <Card.Header style={{ backgroundColor: "dark" }}>
                  Order
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                      Get Maintenance And Assign
                      <br />
                      For Mechanic
                    </h6>
                  </Card.Text>

                  <div className="text-center">
                    <Link to="/gd/maintenance/maintenance-orders">
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
                <Card.Header>Approval</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                      Check Maintained Vehicle Properly <br />
                      And Approve
                    </h6>
                  </Card.Text>

                  <div className="text-center">
                    <Link to="/gd/maintenance/approve-maintenance">
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
                <Card.Header>Report</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                      Report Completed And <br />
                      Approved Maintenance
                    </h6>
                  </Card.Text>

                  <div className="text-center">
                    <Link to="/gd/report/receive-maintenance-report">
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
          >
            <Alert variant="primary">
              {dataCount !== 0 && (
                <p>
                  <Badge bg="danger">{dataCount}</Badge> SparePart Requests
                  Pending for Your Response{" "}
                  <Link to="/gd/request/get-accessory-request">
                    <Badge bg="info">see more</Badge>
                  </Link>
                </p>
              )}
              {dataCount2 !== 0 && (
                <p>
                  <Badge bg="danger">{dataCount2} </Badge> Store Waiting for
                  your Approval to Buy{" "}
                  <Link to="/gd/request/get-accessory-request">
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

export default GDHome;
