import api from "../../../api/api";
import React, { useState, useEffect } from "react";

function VehicleRecordList() {
  const [vehicleRecords, setVehicleRecords] = useState([]);

  useEffect(() => {
    api
      .get("VehicleRecord")
      .then((response) => response.json())
      .then((data) => {
        // Group the data by type
        const groupedData = data.reduce((acc, record) => {
          if (!acc[record.type]) {
            acc[record.type] = [];
          }
          acc[record.type].push(record);
          return acc;
        }, {});

        // Set the grouped data to state
        setVehicleRecords(groupedData);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {Object.entries(vehicleRecords).map(([type, records]) => (
        <div key={type}>
          <h2>{type}</h2>
          <ul>
            {records.map((record) => (
              <li key={record._id}>{record.plateNumber}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default VehicleRecordList;
