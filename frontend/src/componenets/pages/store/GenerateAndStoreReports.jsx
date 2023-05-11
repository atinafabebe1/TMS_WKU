import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ErrorProvider from "../../common/Provider/ErrorProvider";
const SparePartsHomeReport = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [season, setSeason] = useState("");
  const [error, setError] = useState("");

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleButtonClick = () => {
    // Convert the from and to dates to Date objects
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    // Calculate the time difference between the from and to dates in milliseconds
    const timeDiff = toDateObj.getTime() - fromDateObj.getTime();

    // Calculate the number of days in the time difference
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Get the selected report option
    const reportOption = season;

    // Determine the minimum and maximum number of days allowed for the selected report option
    let minDays, maxDays;
    switch (reportOption) {
      case "Weekly":
        minDays = 7;
        maxDays = 7;
        break;
      case "Monthly":
        minDays = 28;
        maxDays = 31;
        break;
      case "Yearly":
        minDays = 365;
        maxDays = 366;
        break;
      default:
        minDays = 0;
        maxDays = Infinity;
    }

    // If the time difference is less than the minimum or greater than the maximum allowed for the selected report option, show an error message
    if (diffDays < minDays) {
      setError(
        `The minimum allowed interval for ${reportOption} report is ${minDays} day(s).`
      );
    } else if (diffDays > maxDays) {
      setError(
        `The maximum allowed interval for ${reportOption} report is ${maxDays} day(s).`
      );
    } else {
      navigate(`/store/Report/generate-report/${fromDate}/${toDate}/${season}`);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h4 style={{ color: "#4169E1" }}>
          <strong>Generate Spare Part Report</strong>
        </h4>
      </div>
      {error && <ErrorProvider error={error} />}
      <div className="d-flex justify-content-center">
        <Card style={{ marginRight: "20px", width: "500px", height: "300px" }}>
          <Card.Body>
            <Form>
              <Form.Group controlId="sparePartsReportOption">
                <Form.Label>
                  <strong>Select Report Option:</strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={season}
                  onChange={handleSeasonChange}
                >
                  <option value="">Select Option</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="fromDate">
                <Form.Label>
                  <strong>From Date:</strong>
                </Form.Label>
                <Form.Control
                  type="date"
                  value={fromDate}
                  onChange={handleFromDateChange}
                />
              </Form.Group>
              <Form.Group controlId="toDate">
                <Form.Label>
                  <strong>To Date:</strong>
                </Form.Label>
                <Form.Control
                  type="date"
                  value={toDate}
                  onChange={handleToDateChange}
                />
              </Form.Group>
              <div style={{ paddingTop: "30px" }}>
                <Button variant="primary" onClick={handleButtonClick}>
                  Generate Report
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SparePartsHomeReport;
