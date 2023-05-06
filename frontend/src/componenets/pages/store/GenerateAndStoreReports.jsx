import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SparePartsHomeReport = () => {
  const navigate = useNavigate();

  const handleButton1Click = () => {
    navigate("/store/Report/generate-report-weekly");
  };

  const handleButton2Click = () => {
    navigate("/store/Report/generate-report-monthly");
  };

  const handleButton3Click = () => {
    navigate("/store/Report/generate-report-halfYear");
  };
  const handleButton4Click = () => {
    navigate("/store/Report/generate-report-yearly");
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h4 style={{ color: "#4169E1" }}>
          <strong>Generate Spare Part Report</strong>
        </h4>
      </div>
      <div className="d-flex justify-content-center">
        <Card style={{ marginRight: "20px" }}>
          <Card.Body>
            <Button variant="primary" onClick={handleButton1Click}>
              Weekly Report
            </Button>
          </Card.Body>
        </Card>

        <Card style={{ marginRight: "20px" }}>
          <Card.Body>
            <Button variant="primary" onClick={handleButton2Click}>
              Monthly Report
            </Button>
          </Card.Body>
        </Card>

        <Card style={{ marginRight: "20px" }}>
          <Card.Body>
            <Button variant="primary" onClick={handleButton3Click}>
              Half Year Report
            </Button>
          </Card.Body>
        </Card>

        <Card style={{ marginRight: "20px" }}>
          <Card.Body>
            <Button variant="primary" onClick={handleButton4Click}>
              Yearly Report
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SparePartsHomeReport;
