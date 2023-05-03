import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

const PublicScheduleTable = () => {
  const [schedules, setSchedules] = useState([]);

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
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };


  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
    <div className="w-100 d-flex justify-content-end">
      <Button onClick={handleHomeClick} className="btn-sm">
        Home
      </Button>
    </div>

      <h3 style={{ marginBottom: "20px" }}>Schedules</h3>
  
  
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
   
    </div>
  );
};

export default PublicScheduleTable;
