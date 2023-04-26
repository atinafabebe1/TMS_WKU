import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const ApprovedVehicleDisplayTable = ({ vehicles }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    return vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!vehicles) {
    return <p>No Vehicle found.</p>;
  }

  return (
    <>
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
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>ChassisNo </th>
            <th>Proprietary Id Number</th>
            <th>Model Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles?.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.plateNumber}</td>
              <td>{vehicle.chassisNo}</td>
              <td>{vehicle.proprietaryIdNumber}</td>
              <td>{vehicle.modelNo}</td>
              <td>
                {vehicle.assignedTo !== null && (
                  <>
                    <Button className="btn btn-sm" variant="warning" disabled>
                      This Vehicle Have Permission to Leave
                    </Button>{" "}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ApprovedVehicleDisplayTable;
