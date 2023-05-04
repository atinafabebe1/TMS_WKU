import React from "react";
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
  const data = [
    { name: "Bus", Vehicles: 20 },
    { name: "Pickup", Vehicles: 15 },
    { name: "Truck", Vehicles: 10 },
    { name: "Car", Vehicles: 50 },
    { name: "Carer", Vehicles: 90 },
    { name: "sew", Vehicles: 40 },
    { name: "man", Vehicles: 90 },
    { name: "ret", Vehicles: 40 },
  ];

  return (
    <div className="App">
      <BarChart
        width={1000}
        height={300}
        data={data}
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
