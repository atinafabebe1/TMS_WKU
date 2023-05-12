import React, { useState, useEffect } from "react";
import api from "../../../api/api";

import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const BarCharts = () => {
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
      <BarChart
        width={1000}
        height={300}
        data={groupedData}
        margin={{
          top: 5,
          right: 30,
          left: 40,
          bottom: 5,
        }}
        barSize={40}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 20 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="2 2" />
        <Bar
          dataKey="Vehicles"
          name="Number of Vehicles"
          fill="#8884d8"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </div>
  );
};

export default BarCharts;
