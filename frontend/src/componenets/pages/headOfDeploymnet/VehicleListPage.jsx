import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import api from "../../../api/api";

const VehicleListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [datas, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's spare Part requests from your server API
    api
      .get("VehicleRecord")
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching Vehicles:", error));
  }, []);
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };
  const handleShowModal = (data) => {
    setShowModal(true);
    setSelectedVehicle(data);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = datas.filter((data) => {
    return data.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h1>List of Available Vehicle</h1>
        </Col>
        <Col className="text-end">
          <Link to="/hd/vehicles/Receive">
            <Button variant="primary">Add New</Button>
          </Link>
        </Col>
      </Row>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search by plate number or status"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Form>
      {isLoading && <h4>Loading...</h4>}
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
          {filteredRequests?.map((data) => (
            <tr key={data._id}>
              <td>{data.plateNumber}</td>
              <td>{data.chassisNo}</td>
              <td>{data.proprietaryIdNumber}</td>
              <td>{data.modelNo}</td>
              <td>
                <Button
                  className="btn btn-sm"
                  variant="primary"
                  onClick={handleShowModal}
                >
                  See More
                </Button>{" "}
                <Button className="btn btn-sm" variant="success">
                  Assign
                </Button>{" "}
                <Button
                  className="btn btn-sm"
                  variant="warning"
                  onClick={() =>
                    navigate(`/hd/vehicles/edit-vehicle/${data._id}`)
                  }
                >
                  Edit
                </Button>{" "}
                <Button className="btn btn-sm" variant="danger">
                  delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={showModal}
        onHide={handleModalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {confirmDelete ? "Confirm Delete" : "Vehicle Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th scope="col">Plate Number:</th>
                  <th scope="col"> {selectedVehicle?.plateNumber}</th>
                </tr>
                <tr>
                  <th scope="col">Chassis No:</th>
                  <th scope="col"> {selectedVehicle?.chassisNo}</th>
                </tr>
                <tr>
                  <th scope="col">Type of Fuel: </th>
                  <th scope="col"> {selectedVehicle?.typeOfFuel}</th>
                </tr>
                <tr>
                  <th scope="col">Model Number: </th>
                  <th scope="col"> {selectedVehicle?.modelNo}</th>
                </tr>
                <tr>
                  <th scope="col">Motor Number: </th>
                  <th scope="col"> {selectedVehicle?.motorNo}</th>
                </tr>
                <tr>
                  <th scope="col">CC: </th>
                  <th scope="col"> {selectedVehicle?.cC}</th>
                </tr>
                <tr>
                  <th scope="col">Purchase Price: </th>
                  <th scope="col"> {selectedVehicle?.purchasePrice}</th>
                </tr>
                <tr>
                  <th scope="col">Purchase Date: </th>
                  <th scope="col"> {selectedVehicle?.purchasedDate}</th>
                </tr>
                <tr>
                  <th scope="col">Maximum load of person: </th>
                  <th scope="col"> {selectedVehicle?.maxPerson}</th>
                </tr>
                <tr>
                  <th scope="col">Maximum load of Litres: </th>
                  <th scope="col"> {selectedVehicle?.maxLitres}</th>
                </tr>
                <tr>
                  <th scope="col">Maximum load: </th>
                  <th scope="col"> {selectedVehicle?.maxLoad}</th>
                </tr>
                <tr>
                  <th scope="col">Proprietary Id Number: </th>
                  <th scope="col"> {selectedVehicle?.proprietaryIdNumber}</th>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {confirmDelete ? (
            <Button variant="danger">Delete</Button>
          ) : (
            <Button variant="primary">Edit</Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VehicleListPage;
