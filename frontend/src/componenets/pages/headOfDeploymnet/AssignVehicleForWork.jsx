import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from "react-bootstrap";
import api from "../../../api/api";

function AssignVehicleForWork() {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("VehicleRecord");
        console.log(response);
        setVehicles(response.data?.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/user/getusers')
      .then(response => response.json())
      .then(data => {
        const driverUsers = data.filter(user => user.role === 'ROLE_DRIVER');
        setUsers(driverUsers);
      })
      .catch(error => console.error(error));
  }, []);

const HandleAssign=async ()=>{
  

}


  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>List of Unassigned Vehicles For Work</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Model</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.plateNumber}</td>
              <td>{vehicle.modelNo}</td>
              <td>
                <Button
                  variant="outline-success"
                  className="btn-sm mx-2"
                  disabled={vehicle.UnAssignedVehicleList === "true"}
                  onClick={() => setShowModal(true)}
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
            <h5><strong>List Of Driver to assign Vehicle</strong></h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h1>Driver Users</h1>
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
          <Button variant="success" onClick={HandleAssign}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AssignVehicleForWork;