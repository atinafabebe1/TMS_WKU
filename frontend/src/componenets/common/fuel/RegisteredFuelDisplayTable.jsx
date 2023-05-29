import { Table, Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../../api/api";

const RegisteredFuel = ({ fuels }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("");
  const [selectedFuel, setselectedFuel] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleShowModal = (fuel) => {
    setselectedFuel(fuel);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setselectedFuel(null);
    setShowModal(false);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };

  const filteredFuels = fuels.filter((fuel) => {
    const createdAtDate = new Date(fuel.createdAt);
    if (!(createdAtDate instanceof Date && !isNaN(createdAtDate))) {
      return false;
    }

    return (
      fuel.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      createdAtDate
        .toLocaleString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  const handleUpdate = async () => {
    const updatedFuel = {
      ...selectedFuel,
      mode: mode,
    };
    await api
      .put(`/Report/daily-fuel-costs/${selectedFuel._id}`, updatedFuel)
      .then((response) => {
        selectedFuel(updatedFuel);
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
        setShowModal(false);
      });
    setShowModal(false);
  };
  return (
    <div className="p-4">
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search by Plate Number or Registered Date"
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
            <th>Ammount</th>
            <th>Price</th>
            <th>Status</th>
            <th>Registered Date </th>
          </tr>
        </thead>
        <tbody>
          {filteredFuels.slice(startIndex, startIndex + 7).map((fuel) => (
            <tr key={fuel._id}>
              <td>{fuel.plateNumber}</td>
              <td>{fuel.typeOfFuel}</td>
              <td>{fuel.mode}</td>
              <td>{fuel.approvedAmount}</td>
              <td>{fuel.price}</td>
              <td>{fuel.status}</td>
              <td>{new Date(fuel.createdAt).toLocaleString()}</td>
              <td>
                {fuel.createdAt !== fuel.updatedAt && (
                  <>
                    <p>Edited in {new Date(fuel.updatedAt).toLocaleString()}</p>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Mode Of Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Col} controlId="mode">
              <Form.Label>Mode</Form.Label>
              <Form.Control
                as="select"
                type="text"
                autoFocus
                placeholder="Choose"
                min={0}
                minLength={3}
                maxLength={25}
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="Choose">Choose</option>
                <option value="Coupon">Coupon</option>
                <option value="Cash">Cash</option>
                <option value="Fuel">Fuel</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-sm"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="btn btn-sm"
            onClick={() => handleUpdate(selectedFuel)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex justify-content-center align-items-center w-100">
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
          disabled={startIndex + 7 >= fuels.length}
          block
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RegisteredFuel;
