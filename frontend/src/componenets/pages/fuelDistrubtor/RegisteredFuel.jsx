import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/api";
import RegisteredFuel from "../../common/fuel/RegisteredFuelDisplayTable";

const DetailFuelInfo = ({ link }) => {
  const [fuels, setFuels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
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
    <>
      <Row className="mb-4">
        <Col>
          <h3>Last Registered Fuel Info</h3>
        </Col>
        <Col className="text-end">
          <Link to="/fd/register-daily-fuel">
            <Button variant="primary">Add New Record</Button>
          </Link>
        </Col>
      </Row>

      <RegisteredFuel fuels={RegisteredFuels} />
    </>
  );
};

export default DetailFuelInfo;
