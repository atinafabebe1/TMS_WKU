import React, { useState, useEffect } from "react";
import { Table, Button, Col, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import api from "../../../api/api";

const EmmergencyReport = ({ link }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/EmergencyReport")
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error Fetching Report:", error));
  }, []);
  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h4 className="form-control-custom">Your Last Emergency Reports</h4>
        </Col>
        <Col className="text-end">
          <Link to="/driver/report/emmergency/create">
            <Button variant="primary">Create New</Button>
          </Link>
        </Col>
      </Row>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search by Plate Number"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Type</th>
            <th>Address</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          ) : data.length > 0 ? (
            data.slice(startIndex, startIndex + 7).map((item) => (
              <tr key={item._id}>
                <td>{item.plateNumber}</td>
                <td>{item.type}</td>
                <td>{item.address}</td>
                <td>{item.detailedDescription}</td>
                <td>{new Date(item.date).toLocaleString()}</td>{" "}
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    disabled={item.status === "Received"}
                    onClick={() =>
                      navigate(`/driver/report/emmergency/edit/${item._id}`)
                    }
                  >
                    Edit
                  </Button>{" "}
                  {item.status === "Received" && (
                    <Button
                      variant="success"
                      size="sm"
                      disabled={item.status === "Received"}
                      onClick={() =>
                        navigate(`/driver/report/emmergency/edit/${item._id}`)
                      }
                    >
                      Received
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ paddingBottom: "70px" }}
      >
        <Button
          variant="primary"
          className="btn-sm mx-2"
          onClick={handlePrevious}
          disabled={startIndex === 0}
          block
        >
          Previous
        </Button>
        <Button
          variant="primary"
          className="btn-sm mx-2"
          onClick={handleNext}
          disabled={startIndex + 7 >= data.length}
          block
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EmmergencyReport;
