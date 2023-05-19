import React, { useState, useEffect } from "react";
import { Alert, Form, Button, Modal, Row, Col } from "react-bootstrap";
import api from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";

const TransferVehicleRequest = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [vehicleData, setVehicleData] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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
        <div className="text-center">
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <h1>Transfer Vehicle</h1>
              <Form>
                <Form.Group controlId="newDriver">
                  <Form.Label>Select Receiver</Form.Label>
                  <Form.Control as="select">
                    <option value="">Select</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="plateNumber">
                  <Form.Label>Vehicle</Form.Label>
                  <Form.Control as="select" className="mb-3">
                    <option value="">Select a Vehicle</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginTop: "10px" }}
                >
                  Transfer
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>

      <Modal show={showConfirmationModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure You have received this vehicle?</p>
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
    </div>
  );
};

export default TransferVehicleRequest;
