import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/api";

const TransferVehicle = ({ link }) => {
  const [data, setData] = useState([]);
  const [transfer, setTransfer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [sender, setSender] = useState({});
  const [selectedRequest, setSelectedRequest] = useState("");
  const [user, setUser] = useState({});
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchDrivers();
    fetchTransfer();
  }, []);

  const fetchTransfer = async () => {
    try {
      const response = await api.get("/Request/transfer?status=Pending");
      setTransfer(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error Fetching Transfer Requests:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/VehicleRecord");
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error Fetching Vehicle Records:", error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await api.get("/user/getusers?select=role,firstName");
      setDrivers(response.data.data);
    } catch (error) {
      console.error("Error Fetching Drivers:", error);
    }
  };

  const handleCompleteTransfer = async (transfer) => {
    try {
      const response = await api.put(`/Request/transfer/${transfer._id}`, {
        status: "Approved",
      });
      console.log(response.data);
      fetchTransfer();
    } catch (error) {
      console.error("Error completing transfer:", error);
    }
  };

  const handleApproveTransfer = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDriverNameChange = (event, item) => {
    setSelectedDriver(event.target.value);
    setSender(item.user);
  };

  const handleUpdateDriverInfo = async () => {
    try {
      const vehicle = data.find(
        (item) => item.plateNumber === selectedVehicle.plateNumber
      );
      if (!vehicle) {
        console.error("Selected vehicle not found");
        return;
      }

      const vehicleResponse = await api.put(`/VehicleRecord/${vehicle._id}`, {
        driver: selectedDriver,
      });

      const userResponse = await api.put(`/user/${selectedDriver}`, {
        driverinfo: {
          vehiclePlateNumber: vehicle.plateNumber,
        },
      });
      const senderResponse = await api.put(`/user/${sender}`, {
        driverinfo: {
          vehiclePlateNumber: "not-Assigned",
        },
      });

      if (userResponse.data.success) {
        setSuccess(userResponse.data.message);
        setError(null);
      } else {
        setError(userResponse.data.error);
        setSuccess(null);
      }

      setShowModal(false);
      fetchData(); // Refresh the data after updating the driver info
    } catch (error) {
      console.error("Error updating driver info:", error);
    }
  };

  const filteredVehicles = data.filter(
    (vehicle) => vehicle.plateNumber === selectedVehicle?.plateNumber
  );

  return (
    <div className="p-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Plate Number</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="7">Loading...</td>
            </tr>
          ) : transfer.length > 0 ? (
            transfer.map((item) => (
              <tr key={item._id}>
                <td>{item.user}</td>
                <td>{item.plateNumber}</td>
                <td>{item.description}</td>
                <td>{new Date(item.updatedAt).toLocaleString()}</td>
                <td>{item.status}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApproveTransfer(item)}
                  >
                    Transfer
                  </Button>{" "}
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleCompleteTransfer(item)}
                  >
                    Complete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No New Request Available.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for updating driver info */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Driver Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="driverName">
            <Form.Label>Driver Name:</Form.Label>
            <Form.Control
              as="select"
              onChange={(event) =>
                handleDriverNameChange(event, selectedVehicle)
              }
              value={selectedDriver}
            >
              <option value="">Select driver</option>
              {Array.isArray(drivers) &&
                drivers
                  .filter((driver) => driver.role === "ROLE_DRIVER")
                  .map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.firstName}
                    </option>
                  ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateDriverInfo}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TransferVehicle;
