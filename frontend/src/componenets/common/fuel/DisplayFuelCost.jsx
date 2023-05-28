import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import api from "../../../api/api";

const FuelCostListPage = () => {
  const [datas, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("Resources")
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h3 className="form-control-custom">List of Available Fuel Cost</h3>
        </Col>
        <Col className="text-end">
          <Link to="/hd/fuel/register">
            <Button variant="primary" size="sm">
              Add New
            </Button>
          </Link>
        </Col>
      </Row>

      {isLoading && <h4>Loading...</h4>}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>type</th>
            <th>amount </th>
            <th>unitPrice</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {datas?.map((data) => (
            <tr key={data._id}>
              <td>{data.type}</td>
              <td>{data.amount}</td>
              <td>{data.unitPrice}</td>
              <td>
                {" "}
                <Button
                  className="btn btn-sm"
                  variant="warning"
                  onClick={() => navigate(`/hd/fuel/edit-fuel/${data._id}`)}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FuelCostListPage;
