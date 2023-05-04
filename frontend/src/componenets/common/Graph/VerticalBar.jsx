import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const VerticalBarCharts = () => {
  const data = [
    {
      name: "Pick Up",
      Available: 59,
      Unavailable: 10,
    },
    {
      name: "Bus",
      Available: 24,
      Unavailable: 2,
    },
    {
      name: "Truck",
      Available: 13,
      Unavailable: 0,
    },
    {
      name: "Car",
      Available: 14,
      Unavailable: 1,
    },
  ];

  return (
    <div>
      <ComposedChart
        layout="vertical"
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="band" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Available" barSize={20} fill="#413ea0" />
        <Line dataKey="Unavailable" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
};

export default VerticalBarCharts;
