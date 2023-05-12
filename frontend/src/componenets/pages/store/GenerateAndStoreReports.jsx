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

  const handlegenerateReport = () => {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    const timeDiff = toDateObj.getTime() - fromDateObj.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const reportOption = season;
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
                  required
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
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
                  required
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="toDate">
                <Form.Label>
                  <strong>To Date:</strong>
                </Form.Label>
                <Form.Control
                  type="date"
                  required
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Form.Group>
              <div style={{ paddingTop: "30px" }}>
                <Button
                  variant="primary"
                  onClick={handlegenerateReport}
                  disabled={!fromDate || !toDate || !season}
                >
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
