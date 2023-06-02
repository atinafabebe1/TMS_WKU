import React from "react";
import { Button, Card, Alert, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../api/api";

const VpHomePage = () => {
  const [complains, setComplains] = useState([]);
  const [requests, setRequest] = useState([]);
  const [dataCount2, setDataCount2] = useState(0);

  const fetchRequestData = async () => {
    await api.get(`/Request/vehicle`).then((response) => {
      console.log(response.data.data);
      const pendingRequests = response.data.data.filter(
        (request) => request.status === "pending"
      );
      setRequest(pendingRequests);
      setDataCount2(pendingRequests.length);
    });
  };

  useEffect(() => {
    fetchRequestData();
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
          <h5 style={{ textAlign: "center", color: "#4682B4" }}>
            Get And Track Request To Provide Reliable and Ontime Response To
            User
          </h5>
          <hr></hr>
          <br />
          <div className="d-flex justify-content-center align-items-center">
            <div className="p-4">
              <Link to="/vp/request/vehicle">
                <Button className="align-items-center">
                  <strong>Explore Request</strong>
                </Button>
              </Link>
              <hr></hr>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <div className="p-4">
              <Card>
                <Card.Header className="form-control-custom" style={{ backgroundColor: "dark" }}>
                  Request For Vehicle
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
                    <Link to="">
                      <Button
                        variant="success"
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
                <Card.Header className="form-control-custom">Approval</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                      Check Requested Vehicle Properly <br />
                      And Approve
                    </h6>
                  </Card.Text>
                  {dataCount2 !== 0 && (
                    <Container>
                      <Alert variant="primary">
                        <p2>
                          <Badge bg="danger">{dataCount2} </Badge>{" "}
                          <span> </span> New Vehicle Request is On Pending Check
                          on your Side{" "}
                          <Link to="/vp/request/vehicle">
                            <Badge bg="info">See more</Badge>
                          </Link>
                        </p2>
                      </Alert>
                    </Container>
                  )}
                  <div className="text-center">
                    <Link to="">
                      <Button
                        variant="success"
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
                <Card.Header className="form-control-custom">Make A Complain</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                      Create For A Complain
                      <br />
                    </h6>
                  </Card.Text>

                  <div className="text-center">
                    <Link to="/vp/request/vehicle-request">
                      <Button
                        variant="success"
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
      </div>

      <div style={{ alignItems: "center", paddingLeft: "80px" }}>
        <br></br>
      </div>
    </div>
  );
};

export default VpHomePage;
