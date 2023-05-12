import React, { useState, useEffect } from "react";
import api from "../../../api/api";
import { PieChart, Pie, Tooltip } from "recharts";

const PieCharts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get(`/Vehiclerecord?isDeleted=false`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const groupedData = data.reduce((acc, vehicle) => {
    const index = acc.findIndex((item) => item.name === vehicle.type);
    if (index !== -1) {
      acc[index].Vehicles++;
    } else {
      acc.push({ name: vehicle.type, Vehicles: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="App">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="Vehicles"
          isAnimationActive={false}
          data={groupedData}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieCharts;
