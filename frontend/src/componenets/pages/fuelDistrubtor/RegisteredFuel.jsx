import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import api from "../../../api/api";
import RegisteredFuel from "../../common/fuel/RegisteredFuelDisplayTable";

const DetailFuelInfo = ({ link }) => {
  const [fuels, setFuels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/Report/daily-fuel-costs")
      .then((response) => {
        console.log(response.data.data);
        setFuels(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching fuel info:", error));
  }, []);

  function handleTabSelect(tabName) {
    setActiveTab(tabName);
  }

  const RegisteredFuels = fuels.filter((fuel) => fuel.isDeleted === false);

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h5 style={{ color: "GrayText" }}>
            Last Registered Fuel Information
          </h5>
        </Col>
      </Row>

      <RegisteredFuel fuels={RegisteredFuels} />
    </div>
  );
};

export default DetailFuelInfo;
