import React from "react";
import { Button, Card, Alert, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import api from "../../../api/api";
const DriverHomePage = () => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [dataCount2, setDataCount2] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const { user } = useAuth();

  console.log(user.id);

  useEffect(() => {
    api
      .get(`/Vehiclerecord?driver=${user.id}`)
      .then((response) => {
        const filteredData = response.data.data.filter(
          (item) => item.assignedTo !== null
        );
        setData(filteredData);
        setDataCount(filteredData.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.id]);

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
            Remember to drive safely, follow traffic rules, and provide
            excellent service to our passengers
          </h5>
          <br />

          <div>
            {dataCount !== 0 && (
              <Container>
                <hr></hr>
                {data?.map((vehicle) => (
                  <Alert variant="primary">
                    <p2>
                      Dear Driver Your Vehicle is Currently assigned for{" "}
                      <strong>{vehicle.assignedTo}</strong>
                      {", "}So you have to take and Track action.
                    </p2>
                  </Alert>
                ))}
              </Container>
            )}
          </div>
          <br></br>
          <hr></hr>
          <div className="d-flex justify-content-center align-items-center">
            <div className="p-4">
              <Card>
                <Card.Header className="form-control-custom">Fuel</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                      Request For Fuel
                    </h6>
                  </Card.Text>

                  <div className="text-center">
                    <Link to="/driver/request/fuel">
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
            <div className="p-4">
              <Card>
                <Card.Header className="form-control-custom">
                  Maintenance
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                      Request For Maintenance
                    </h6>
                  </Card.Text>

                  <div className="text-center">
                    <Link to="/driver/request/maintenance">
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
            <div className="p-4">
              <Card>
                <Card.Header className="form-control-custom">
                  Report
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                      Report for Emergency
                    </h6>
                  </Card.Text>

                  <div className="text-center">
                    <Link to="/driver/report/emmergency">
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

export default DriverHomePage;
