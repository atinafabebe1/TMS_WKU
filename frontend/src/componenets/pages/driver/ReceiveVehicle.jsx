import React, { useState, useEffect } from "react";
import { Alert, Table, Button, Modal, Form } from "react-bootstrap";
import api from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";

const DriverReceiveVehicle = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [vehicleData, setVehicleData] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferPlateNumber, setTransferPlateNumber] = useState(null);
  const [transferDescription, setTransferDescription] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/user/getuser/${user?.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user?.id) {
      fetchUserData();
    }
  }, [user]);

  const plateNumber = userData?.driverinfo?.vehiclePlateNumber;

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await api.get(`/VehicleRecord`, {
          params: { plateNumber: plateNumber },
        });

        setVehicleData(response.data);
      } catch (error) {
        console.error("Error fetching Vehicle Data:", error);
      }
    };

    if (plateNumber) {
      fetchVehicleData();
    }
  }, [plateNumber]);

  const handleUpdate = async (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = async () => {
    try {
      await api.put(`/VehicleRecord/${selectedVehicleId}`, {
        driver: user?.id,
      });

      console.log("Vehicle updated successfully.");
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }

    setShowConfirmationModal(false);
  };

  const handleCloseModal = () => {
    setSelectedVehicleId(null);
    setShowConfirmationModal(false);
    setShowTransferModal(false);
    setTransferPlateNumber("");
    setTransferDescription("");
  };

  const handleTransfer = (plateNumber) => {
    setTransferPlateNumber(plateNumber);
    setShowTransferModal(true);
  };

  const handleTransferConfirmation = async () => {
    try {
      // Perform transfer action using transferPlateNumber and transferDescription
      await api.post(`/Request/transfer`, {
        plateNumber: transferPlateNumber,
        description: transferDescription,
      });

      console.log("Vehicle transfer requested successfully.");
    } catch (error) {
      console.error("Error while transfer vehicle request:", error);
    }

    handleCloseModal();
  };

  return (
    <div className="p-4">
      <h4>Your Vehicle Detail Information</h4>
      {userData?.driverinfo?.vehiclePlateNumber === "not-Assigned" ? (
        <Alert variant="info">Vehicle Not Assigned For You</Alert>
      ) : (
        <>
          <p>
            Your Vehicle Plate Number:{" "}
            {userData?.driverinfo?.vehiclePlateNumber}
          </p>
        </>
      )}
      <div>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Plate Number</th>
              <th>Type</th>
              <th>Proprietary Id Number</th>
              <th>Model Number</th>
              <th>Property Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicleData?.data?.map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.plateNumber}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.proprietaryIdNumber}</td>
                <td>{vehicle.modelNo}</td>
                <td>{vehicle.propertyType}</td>
                <td>
                  {vehicle.driver === "null" && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdate(vehicle._id)}
                    >
                      Receive
                    </Button>
                  )}
                  {vehicle.driver !== "null" && (
                    <div>
                      <Button variant="info" size="sm" disabled>
                        Received
                      </Button>{" "}
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleTransfer(vehicle.plateNumber)}
                      >
                        Transfer
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showConfirmationModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you have received this vehicle?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmation}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showTransferModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Plate Number:</Form.Label>
            <Form.Control type="text" value={transferPlateNumber} disabled />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={transferDescription}
              onChange={(e) => setTransferDescription(e.target.value)}
              placeholder="Enter transfer description"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleTransferConfirmation}>
            Transfer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DriverReceiveVehicle;
