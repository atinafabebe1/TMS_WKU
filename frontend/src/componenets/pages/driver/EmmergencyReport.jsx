import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import api from "../../../api/api";
import "../../common/css/formStyles.css";
const EmergencyReport = () => {
  const [reportData, setReportData] = useState({
    plateNumber: "",
    type: "",
    date: "",
    time: "",
    work: "",
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

    try {
      const response = await api.post("/EmergencyReport", reportData);
      console.log(response.data);
      setReportData({
        plateNumber: "",
        type: "",
        date: "",
        time: "",
        work: "",
        address: "",
        injuries: "",
        death: "",
        damagedProperties: "",
        detailedDescription: "",
        witnesses: [],
        passengersPresentDuringAccident: [],
        traffic: {
          name: "",
          site: "",
          address: "",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderWitnessFields = () => {
    return reportData.witnesses.map((witness, index) => (
      <div key={index}>
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">Name</Form.Label>

          <Form.Control
            type="text"
            name="name"
            value={witness.name}
            onChange={(e) => handleWitnessChange(e, index)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">Address</Form.Label>

          <Form.Control
            type="text"
            name="address"
            value={witness.address}
            onChange={(e) => handleWitnessChange(e, index)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">Phone Number</Form.Label>

          <Form.Control
            type="text"
            name="phoneNumber"
            value={witness.phoneNumber}
            onChange={(e) => handleWitnessChange(e, index)}
            required
          />
        </Form.Group>
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
          <Form.Group className="mb-3">
            <Form.Label className="form-control-custom">Name</Form.Label>

            <Form.Control
              type="text"
              name="name"
              value={passenger.name}
              onChange={(e) => handlePassengerChange(e, index)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="form-control-custom">Address</Form.Label>

            <Form.Control
              type="text"
              name="address"
              value={passenger.address}
              onChange={(e) => handlePassengerChange(e, index)}
              required
            />
          </Form.Group>
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
    <div className="p-4 d-flex justify-content-center">
      <Form onSubmit={handleSubmit} className="w-50">
        <h3 style={{ textAlign: "center", color: "#4682B4", padding: "10px" }}>
          Emergency Reporting Form.
        </h3>
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">
            Vehicle Plate Number
          </Form.Label>
          <Form.Control
            type="text"
            name="plateNumber"
            value={reportData.plateNumber}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDate" className="mb-3">
          <Form.Label className="form-control-custom">Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={reportData.date}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formTime" className="mb-3">
          <Form.Label className="form-control-custom">Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={reportData.time}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAddress" className="mb-3">
          <Form.Label className="form-control-custom">Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={reportData.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">Type</Form.Label>

          <Form.Control
            type="text"
            name="type"
            value={reportData.type}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">Work</Form.Label>

          <Form.Control
            type="text"
            name="work"
            value={reportData.work}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">Injuries</Form.Label>

          <Form.Control
            type="number"
            name="injuries"
            value={reportData.injuries}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">Injuries</Form.Label>

          <Form.Control
            type="number"
            name="death"
            value={reportData.death}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">
            Damaged Properties (Birr)
          </Form.Label>

          <Form.Control
            type="number"
            name="damagedProperties"
            value={reportData.damagedProperties}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">
            Detailed Description
          </Form.Label>

          <Form.Control
            as="textarea"
            name="detailedDescription"
            value={reportData.detailedDescription}
            onChange={handleInputChange}
            rows={3}
            required
          />
        </Form.Group>

        <h5 style={{ color: "#4682B4" }}>Witnesses</h5>
        {renderWitnessFields()}
        <div style={{ paddingTop: "10px" }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              setReportData((prevData) => ({
                ...prevData,
                witnesses: [...prevData.witnesses, { name: "", address: "" }],
              }))
            }
          >
            Add Witness
          </Button>
        </div>
        <h5 style={{ color: "#4682B4" }}>Passengers Present During Accident</h5>
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
        <h4>Traffic</h4>
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">Name</Form.Label>

          <Form.Control
            type="text"
            name="name"
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
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">Site</Form.Label>

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
        <Form.Group className="mb-3">
          <Form.Label className="form-control-custom">Address</Form.Label>

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
        <div style={{ paddingBottom: "70px" }}>
          {" "}
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default EmergencyReport;
