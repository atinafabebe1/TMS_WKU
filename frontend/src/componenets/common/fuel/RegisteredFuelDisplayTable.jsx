import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisteredFuel = ({ fuels }) => {
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentRequest, setCurrentRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (fuel) => {
    setCurrentRequest(fuel);
    setShowModal(fuel);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFuels = fuels.filter((fuel) => {
    return fuel.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
            <th>Type Of Fuel </th>
            <th>Mode </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFuels?.map((fuel) => (
            <tr key={fuel._id}>
              <td>{fuel.plateNumber}</td>
              <td>{fuel.typeOfFuel}</td>
              <td>{fuel.mode}</td>
              <td>
                {fuel.isDeleted === false && (
                  <>
                    <Button className="btn btn-sm" variant="info">
                      See Detail
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

export default RegisteredFuel;
