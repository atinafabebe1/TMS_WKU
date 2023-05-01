import React from "react";
import { Button } from "react-bootstrap";
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
      <h1>Generate SparePart Report</h1>
      <Button variant="primary" onClick={handleButton1Click}>
        Weekly Report
      </Button>{" "}
      <Button variant="primary" onClick={handleButton2Click}>
        Monthly Report
      </Button>{" "}
      <Button variant="primary" onClick={handleButton3Click}>
        Half Year Report
      </Button>{" "}
      <Button variant="primary" onClick={handleButton4Click}>
        Yearly Report
      </Button>
    </div>
  );
};

export default SparePartsHomeReport;
