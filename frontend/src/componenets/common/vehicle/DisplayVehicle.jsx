import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import api from "../../../api/api";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [confirmPlateNumber, setConfirmPlateNumber] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        api.get("VehicleRecord").then((response) => {
          console.log(response);
          setVehicles(response.data?.data);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };
  

  const handleSave = (vehicle) => {
    const updatedVehicles = vehicles.map((v) =>
      v._id === vehicle._id ? vehicle : v
    );
    setVehicles(updatedVehicles);
    handleModalClose();
  };

  const handleDelete = async (vehicle) => {
    setConfirmPlateNumber("");
    setConfirmDelete(false);
    const confirmDeleteModal = window.confirm(
      `Are you sure you want to delete the vehicle with plate number ${vehicle.plateNumber}?`
    );
    if (confirmDeleteModal) {
      setSelectedVehicle(vehicle);
      setConfirmDelete(true);
      setShowModal(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (confirmPlateNumber !== selectedVehicle.plateNumber) {
      window.alert("Plate number does not match. Please try again.");
      return;
    }
    try {
      await api.delete(`VehicleRecord/${selectedVehicle._id}`);
      setVehicles((prevVehicles) =>
        prevVehicles.filter((v) => v._id !== selectedVehicle._id)
      );
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Chassis No</th>
            <th>Type of Fuel</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.plateNumber}</td>
              <td>{vehicle.chassisNo}</td>
              <td>{vehicle.typeOfFuel}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEdit(vehicle)}
                >
                  See More
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(vehicle)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {confirmDelete ? "Confirm Delete" : "Vehicle Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmDelete ? (
            <div>
              <p>
                Are you sure you want to delete the vehicle with plate number{" "}
                {selectedVehicle?.plateNumber}?
              </p>
              <p>Please enter the plate number to confirm:</p>
              <input
                type="text"
                value={confirmPlateNumber}
                onChange={(e) => setConfirmPlateNumber(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <p>Plate Number: {selectedVehicle?.plateNumber}</p>
              <p>Chassis No: {selectedVehicle?.chassisNo}</p>
              <p>Type of Fuel: {selectedVehicle?.typeOfFuel}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {confirmDelete ? (
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => handleSave(selectedVehicle)}
            >
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VehicleList;
