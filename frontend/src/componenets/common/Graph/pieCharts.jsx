import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";

const PieCharts = () => {
  const data = [
    { name: "Bus", Vehicles: 20 },
    { name: "Pickup", Vehicles: 15 },
    { name: "Truck", Vehicles: 10 },
    { name: "Car", Vehicles: 50 },
  ];

  return (
    <div className="App">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="Vehicles"
          isAnimationActive={false}
          data={data}
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
