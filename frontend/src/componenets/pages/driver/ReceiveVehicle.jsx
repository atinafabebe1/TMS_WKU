import React, { useState, useEffect } from "react";
import { Alert, Table } from "react-bootstrap";
import api from "../../../api/api";
import { useAuth } from "../../../context/AuthContext";

const DriverReceiveVehicle = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [vehicleData, setVehicleData] = useState([]);

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

  console.log(vehicleData);
  return (
    <div className="p-4">
      <h2>Hi, I am a Driver</h2>
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
            {vehicleData.data.map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.plateNumber}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.proprietaryIdNumber}</td>
                <td>{vehicle.modelNo}</td>
                <td>{vehicle.propertyType}</td>
                <td>
                  <button>Perform Action</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DriverReceiveVehicle;
