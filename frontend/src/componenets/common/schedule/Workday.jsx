import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

const ScheduleTable = () => {
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  let count = 1;

  useEffect(() => {
    // Fetch schedules from the server and update state
    const fetch = async () => {
      const response = await api.get("/schedule/work-day").then((res) => {
        console.log(res);
        setSchedules(res.data?.data);
      });
      console.log(response.data?.data?.vehicles);
    };
    fetch();
  }, []);

  const handleCreateNewSchedule = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmCreateNewSchedule = () => {
    navigate("/hd/schedule/workday-new");
    handleCloseModal();
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <h3 style={{ marginBottom: "20px" }}>Schedules</h3>
      <button
        onClick={handleCreateNewSchedule}
        className="btn btn-primary d-flex align-items-center"
      >
        <FaPlus style={{ marginRight: "5px", fontSize: "1.1rem" }} />
        Create New Schedule
      </button>
      <Table
        striped
        bordered
        hover
        responsive
        style={{ width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Departure Address</th>
            <th>Departure Time</th>
            <th>Destination Address</th>
            <th>Destination Time</th>
            <th>Vehicles Assigned</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule._id}>
              <td>{count++}</td>
              <td>{schedule.departing?.address}</td>
              <td>{schedule.departing?.time}</td>
              <td>{schedule.destination?.address}</td>
              <td>{schedule.destination?.time}</td>
              <td>
                {schedule.vehicles
                  .map((vehicle) => vehicle.plateNumber)
                  .join(", ")}
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
          Before you create a new schedule, please note that any previous
          schedules will be removed. Are you sure you want to proceed?
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
