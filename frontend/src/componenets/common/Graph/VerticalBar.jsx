import React, { useState, useEffect } from "react";
import api from "../../../api/api";
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
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get(`/Vehiclerecord?isDeleted=false`)
      .then((response) => {
        const counts = response.data.data.reduce((acc, vehicle) => {
          const type = vehicle.type;
          const assignedTo = vehicle.assignedTo;
          if (!acc[type]) {
            acc[type] = { Available: 0, Unavailable: 0 };
          }
          if (assignedTo === null) {
            acc[type].Available++;
          } else {
            acc[type].Unavailable++;
          }
          return acc;
        }, {});

        const data = Object.keys(counts).map((key) => ({
          name: key,
          Available: counts[key].Available,
          Unavailable: counts[key].Unavailable,
        }));

        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
