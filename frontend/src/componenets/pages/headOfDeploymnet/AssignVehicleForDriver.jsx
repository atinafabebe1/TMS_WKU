import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import api from '../../../api/api';

function UnAssignedVehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('VehicleRecord');
        setVehicles(response.data?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/user/getusers');
        const driverUsers = response.data.filter(user => user.role === 'ROLE_DRIVER');
        setUsers(driverUsers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleAssign = async () => {
    try {
      const response = await api.put(`/VehicleRecord/${selectedVehicle.id}/assign`, {
        driverId: selectedDriver.id
      });
      if (response.status === 200) {
        setShowModal(false);
        setSelectedVehicle(null);
        setSelectedDriver(null);
        // Update the assigned vehicle in the vehicles array to reflect the new assignment
        setVehicles(vehicles.map(vehicle => {
          if (vehicle.id === selectedVehicle.id) {
            return {
              ...vehicle,
              assignedDriver: selectedDriver
            };
          }
          return vehicle;
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedVehicle(null);
    setSelectedDriver(null);
  };

  const handleAssignClick = vehicle => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleDriverSelect = driver => {
    setSelectedDriver(driver);
  };

  return (
    <div>
      <h1>List of Unassigned Vehicles For Work</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Model</th>
            <th>Assigned Driver</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.id}>
              <td>{vehicle.plateNumber}</td>
              <td>{vehicle.modelNo}</td>
              <td>{vehicle.assignedDriver ? vehicle.assignedDriver.name : 'None'}</td>
              <td>
                <Button
                  variant="outline-success"
                  className="btn-sm mx-2"
                  disabled={vehicle.assignedDriver !== null}
                  onClick={() => handleAssignClick(vehicle)}
                >
                  Assign
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>List Of Driver to assign Vehicle</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Select a driver to assign to {selectedVehicle ? selectedVehicle.plateNumber : null}</h2>
          <ul>
            {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAssign}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UnAssignedVehicleList;
