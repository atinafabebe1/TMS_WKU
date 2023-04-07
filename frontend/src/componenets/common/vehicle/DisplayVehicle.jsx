import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import api from "../../../api/api";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [confirmPlateNumber, setConfirmPlateNumber] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("VehicleRecord");
        console.log(response);
        setVehicles(response.data?.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
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

  // const handleDelete = async (vehicle) => {
  //   setConfirmPlateNumber("");
  //   setConfirmDelete(false);
  //   const confirmDeleteModal = window.confirm(
  //     `Are you sure you want to delete the vehicle with plate number ${vehicle.plateNumber}?`
  //   );
  //   if (confirmDeleteModal) {
  //     setSelectedVehicle(vehicle);
  //     setConfirmDelete(true);
  //     setShowModal(true);
  //   }
  // };

  const handleDelete = async (vehicle) => {
    setConfirmPlateNumber("");
    setConfirmDelete(false);
    const confirmDeleteModal = window.confirm(
      `Are you sure you want to delete the vehicle with plate number ${vehicle.plateNumber}?`
    );
    setSelectedVehicle(vehicle);
    setConfirmDelete(true);
    if (confirmDeleteModal) {
      try {
        const response = await api.delete(
          `/VehicleRecord/${vehicle.plateNumber}`
        );
        if (response.ok) {
          alert("Vehicle record successfully deleted.");
        } else {
          alert("Failed to delete vehicle record.");
        }
      } catch (error) {
        alert(`An error occurred while deleting the vehicle record: ${error}`);
      }
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
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Table striped bordered hover>
        {isLoading && (
          <p>
            <strong>Loading...</strong>
          </p>
        )}
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
              <td>{vehicle.modelNo}</td>
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
              Edit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VehicleList;
