import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';

const ScheduleTable = () => {
  const [schedules, setSchedules] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editedRowData, setEditedRowData] = useState(null);

  const navigate = useNavigate();
  let count = 1;

  useEffect(() => {
    // Fetch schedules from the server and update state
    const fetchSchedules = async () => {
      const response = await api.get('/schedule/work-day').then((res) => {
        setSchedules(res.data?.data);
      });
    };
    fetchSchedules();
  }, []);

  const handleCreateNewSchedule = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmCreateNewSchedule = () => {
    navigate('/hd/schedule/workday-new');
    handleCloseModal();
  };

  const handleEdit = (rowIndex) => {
    setIsEditing(rowIndex);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async (editedRowData) => {
    setIsEditing(false);
    console.log(editedRowData);
    //get edited row and update on database
    await api.put('/schedule/work-day', editedRowData);
  };

  const handleChange = (e, rowIndex, key) => {
    const updatedData = [...schedules];
    //update the row data
    if (key === 'departingAddress') {
      updatedData[rowIndex].departing.address = e.target.value;
    } else if (key === 'departingTime') {
      updatedData[rowIndex].departing.time = e.target.value;
    } else if (key === 'destinationAddress') {
      updatedData[rowIndex].destination.address = e.target.value;
    } else if (key === 'destinationTime') {
      updatedData[rowIndex].destination.time = e.target.value;
    } else {
      updatedData[rowIndex].vehicles = [{ plateNumber: e.target.value }];
    }
    //store the edited row data in state
    setEditedRowData(updatedData[rowIndex]);
    setSchedules(updatedData);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <h3 style={{ marginBottom: '20px' }}>Schedules</h3>

      <button onClick={handleCreateNewSchedule} className="btn btn-primary d-flex align-items-center">
        <FaPlus style={{ marginRight: '5px', fontSize: '1.1rem' }} />
        Create New Schedule
      </button>

      <p style={{ color: 'red', fontWeight: 'bold', marginTop: '20px' }}>
        WARNING: Editing the schedule may break certain constraints. Please be careful when making changes.
      </p>

      <Table striped bordered hover responsive style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Departure Address</th>
            <th>Departure Time</th>
            <th>Destination Address</th>
            <th>Destination Time</th>
            <th>Vehicles Assigned</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((row, rowIndex) => (
            <tr key={row._id}>
              <td>{count++}</td>
              <td>
                {isEditing === rowIndex ? (
                  <input type="text" value={row.departing.address} onChange={(e) => handleChange(e, rowIndex, 'departingAddress')} />
                ) : (
                  row.departing.address
                )}
              </td>
              <td>
                {isEditing === rowIndex ? (
                  <input type="text" value={row.departing.time} onChange={(e) => handleChange(e, rowIndex, 'departingTime')} />
                ) : (
                  row.departing.time
                )}
              </td>
              <td>
                {isEditing === rowIndex ? (
                  <input type="text" value={row.destination.address} onChange={(e) => handleChange(e, rowIndex, 'destinationAddress')} />
                ) : (
                  row.destination.address
                )}
              </td>
              <td>
                {isEditing === rowIndex ? (
                  <input type="text" value={row.destination.time} onChange={(e) => handleChange(e, rowIndex, 'destinationTime')} />
                ) : (
                  row.destination.time
                )}
              </td>
              <td>
                {isEditing === rowIndex ? (
                  <input
                    type="text"
                    value={row.vehicles.map((vehicle) => vehicle.plateNumber)}
                    onChange={(e) => handleChange(e, rowIndex, 'vehicles')}
                  />
                ) : (
                  row.vehicles.map((vehicle) => {
                    return `${vehicle.plateNumber}, `;
                  })
                )}
              </td>

              <td>
                {isEditing === rowIndex ? (
                  <>
                    <Button onClick={handleCancel} variant="danger">
                      Cancel
                    </Button>
                    <Button onClick={() => handleSave(editedRowData)}>Save</Button>
                  </>
                ) : (
                  <Button onClick={() => handleEdit(rowIndex)} disabled={isEditing !== false}>
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Before you create a new schedule, please note that any previous schedules will be removed. Are you sure you want to proceed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmCreateNewSchedule}>
            Create New Schedule
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ScheduleTable;
