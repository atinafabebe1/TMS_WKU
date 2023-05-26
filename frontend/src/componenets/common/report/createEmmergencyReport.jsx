import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Card, Container } from "react-bootstrap";
import ErrorProvider from "../Provider/ErrorProvider";
import SuccessProvider from "../Provider/SuccessProvider";

import api from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../../common/css/formStyles.css";
const CreateEmergencyReport = ({ title, data }) => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [reportData, setReportData] = useState({
    plateNumber: "",
    type: "",
    date: "",
    time: "",
    address: "",
    injuries: "",
    death: "",
    damagedProperties: "",
    detailedDescription: "",
    witnesses: [{ name: "", address: "", phoneNumber: "" }],
    passengersPresentDuringAccident: [{ name: "", address: "" }],
    traffic: {
      name: "",
      site: "",
      address: "",
    },
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/user/getuser/${user.id}`);
        setUserData(response.data);
        setReportData((prevData) => ({
          ...prevData,
          plateNumber: response.data?.driverinfo?.vehiclePlateNumber || "",
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      setReportData(data);
    } else {
      setReportData({
        plateNumber: "",
        type: "",
        date: "",
        time: "",
        address: "",
        injuries: "",
        death: "",
        damagedProperties: "",
        detailedDescription: "",
        witnesses: [{ name: "", address: "", phoneNumber: "" }],
        passengersPresentDuringAccident: [{ name: "", address: "" }],
        traffic: {
          name: "",
          site: "",
          address: "",
        },
      });
    }
  }, [data]);

  const handleClear = (e) => {
    setReportData({
      plateNumber: "",
      type: "",
      date: "",
      time: "",
      address: "",
      injuries: "",
      death: "",
      damagedProperties: "",
      detailedDescription: "",
      witnesses: [{ name: "", address: "", phoneNumber: "" }],
      passengersPresentDuringAccident: [{ name: "", address: "" }],
      traffic: {
        name: "",
        site: "",
        address: "",
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWitnessChange = (e, index) => {
    const { name, value } = e.target;
    setReportData((prevData) => {
      const witnesses = JSON.parse(JSON.stringify(prevData.witnesses));
      witnesses[index] = { ...witnesses[index], [name]: value };
      return { ...prevData, witnesses };
    });
  };

  const handleRemoveWitness = (index) => {
    setReportData((prevData) => {
      const witnesses = [...prevData.witnesses];
      witnesses.splice(index, 1);
      return { ...prevData, witnesses };
    });
  };

  const handlePassengerChange = (e, index) => {
    const { name, value } = e.target;
    setReportData((prevData) => {
      const passengers = JSON.parse(
        JSON.stringify(prevData.passengersPresentDuringAccident)
      );
      passengers[index] = { ...passengers[index], [name]: value };
      return { ...prevData, passengersPresentDuringAccident: passengers };
    });
  };

  const handleRemovePassenger = (index) => {
    setReportData((prevData) => {
      const passengers = [...prevData.passengersPresentDuringAccident];
      passengers.splice(index, 1);
      return { ...prevData, passengersPresentDuringAccident: passengers };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (data) {
      response = await api
        .put(`/EmergencyReport/${data._id}`, reportData)
        .then((response) => {
          setSuccess("Successfuly Updated");
          setError(null);
          setTimeout(() => {
            navigate("/driver/report/emmergency"); // Navigate to the desired page after 6 seconds
          }, 6000); // Navigate to the desired page
        })
        .catch((err) => {
          console.log(err.response.data);
          setError(err.response.data);
          setSuccess(null);
        });
    } else {
      response = await api.post("/EmergencyReport", reportData);
      setTimeout(() => {
        navigate("/driver/report/emmergency"); // Navigate to the desired page after 6 seconds
      }, 6000); // Navigate to the desired page
      setSuccess("Successfuly Sent");
    }
  };

  const renderWitnessFields = () => {
    return reportData.witnesses.map((witness, index) => (
      <div key={index}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className="form-control-custom">Name</Form.Label>

            <Form.Control
              type="text"
              name="name"
              value={witness.name}
              onChange={(e) => handleWitnessChange(e, index)}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="form-control-custom">Address</Form.Label>

            <Form.Control
              type="text"
              name="address"
              value={witness.address}
              onChange={(e) => handleWitnessChange(e, index)}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="form-control-custom">
              Phone Number
            </Form.Label>

            <Form.Control
              type="text"
              name="phoneNumber"
              value={witness.phoneNumber}
              onChange={(e) => handleWitnessChange(e, index)}
              required
            />
          </Form.Group>
        </Row>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleRemoveWitness(index)}
        >
          Remove Witness
        </Button>
      </div>
    ));
  };

  const renderPassengerFields = () => {
    return reportData.passengersPresentDuringAccident.map(
      (passenger, index) => (
        <div key={index}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="form-control-custom">Name</Form.Label>

              <Form.Control
                type="text"
                name="name"
                value={passenger.name}
                onChange={(e) => handlePassengerChange(e, index)}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="form-control-custom">Address</Form.Label>

              <Form.Control
                type="text"
                name="address"
                value={passenger.address}
                onChange={(e) => handlePassengerChange(e, index)}
                required
              />
            </Form.Group>
          </Row>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleRemovePassenger(index)}
          >
            Remove Passenger
          </Button>
        </div>
      )
    );
  };

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-primary text-light">
              Emergency Reporting Form.
            </Card.Header>
            <Card.Body>
              <div>
                <Form onSubmit={handleSubmit}>
                  <h5
                    style={{
                      textAlign: "center",
                      color: "#4682B4",
                      padding: "30px",
                    }}
                  >
                    Emergency Reporting For Your Vehicle With Plate Number.
                    <strong> {reportData.plateNumber}</strong>
                  </h5>
                  <Row className="mb-3">
                    <Form.Group controlId="formDate" as={Col}>
                      <Form.Label className="form-control-custom">
                        Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={reportData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formTime" as={Col}>
                      <Form.Label className="form-control-custom">
                        Time
                      </Form.Label>
                      <Form.Control
                        type="time"
                        name="time"
                        value={reportData.time}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formAddress" as={Col}>
                      <Form.Label className="form-control-custom">
                        Address
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        minLength={3}
                        maxLength={100}
                        value={reportData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Row>
                  <br />
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label className="form-control-custom">
                        Type
                      </Form.Label>

                      <Form.Select
                        name="type"
                        value={reportData.type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a type</option>
                        <option value="Accident">Accident</option>
                        <option value="Fire">Fire</option>
                        <option value="Natural Disaster">
                          Natural Disaster
                        </option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label className="form-control-custom">
                        Injuries
                      </Form.Label>

                      <Form.Control
                        type="number"
                        name="injuries"
                        min={0}
                        max={100}
                        value={reportData.injuries}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label className="form-control-custom">
                        Death
                      </Form.Label>

                      <Form.Control
                        type="number"
                        name="death"
                        min={0}
                        max={100}
                        value={reportData.death}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label className="form-control-custom">
                        Damaged Properties (Birr)
                      </Form.Label>

                      <Form.Control
                        type="number"
                        name="damagedProperties"
                        min={0}
                        max={10000000}
                        value={reportData.damagedProperties}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Row>
                  <br />
                  <Form.Group className="mb-3">
                    <Form.Label className="form-control-custom">
                      Provide Detail Description
                    </Form.Label>

                    <Form.Control
                      as="textarea"
                      name="detailedDescription"
                      minLength={200}
                      maxLength={1000}
                      value={reportData.detailedDescription}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </Form.Group>
                  <br />
                  <br />
                  <h5 style={{ color: "#4682B4" }}>Witnesses</h5>
                  {renderWitnessFields()}
                  <div style={{ paddingTop: "10px" }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        setReportData((prevData) => ({
                          ...prevData,
                          witnesses: [
                            ...prevData.witnesses,
                            { name: "", address: "" },
                          ],
                        }))
                      }
                    >
                      Add Witness
                    </Button>
                  </div>
                  <br />
                  <h5 style={{ color: "#4682B4" }}>
                    Passengers Present During Accident
                  </h5>
                  {renderPassengerFields()}
                  <div style={{ paddingTop: "10px" }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        setReportData((prevData) => ({
                          ...prevData,
                          passengersPresentDuringAccident: [
                            ...prevData.passengersPresentDuringAccident,
                            { name: "", address: "" },
                          ],
                        }))
                      }
                    >
                      Add Passenger
                    </Button>
                  </div>
                  <br />
                  <h4>Traffic</h4>
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label className="form-control-custom">
                        Name
                      </Form.Label>

                      <Form.Control
                        type="text"
                        name="name"
                        minLength={3}
                        maxLength={30}
                        value={reportData.traffic.name}
                        onChange={(e) =>
                          setReportData((prevData) => ({
                            ...prevData,
                            traffic: {
                              ...prevData.traffic,
                              name: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label className="form-control-custom">
                        Site
                      </Form.Label>

                      <Form.Control
                        type="text"
                        name="site"
                        value={reportData.traffic.site}
                        onChange={(e) =>
                          setReportData((prevData) => ({
                            ...prevData,
                            traffic: {
                              ...prevData.traffic,
                              site: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label className="form-control-custom">
                        Address
                      </Form.Label>

                      <Form.Control
                        type="text"
                        name="address"
                        value={reportData.traffic.address}
                        onChange={(e) =>
                          setReportData((prevData) => ({
                            ...prevData,
                            traffic: {
                              ...prevData.traffic,
                              address: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </Form.Group>
                  </Row>
                  {error && <ErrorProvider error={error} />}
                  {success && <SuccessProvider success={success} />}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <Button
                      variant="secondary"
                      size="medium"
                      onClick={() => navigate("/driver/report/emmergency")}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      size="medium"
                      onClick={handleClear}
                    >
                      Clear
                    </Button>

                    {data ? (
                      <Button variant="primary" size="medium" type="submit">
                        Update
                      </Button>
                    ) : (
                      <Button variant="primary" size="medium" type="submit">
                        Submit
                      </Button>
                    )}
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEmergencyReport;
