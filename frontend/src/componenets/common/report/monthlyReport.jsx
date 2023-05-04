import React, { useState, useEffect } from "react";
import api from "../../../api/api";

const MonthlyReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getMonthlyReports = async () => {
      try {
        const res = await api.get("/monthlyReport");
        setReports(res.data);
        console.log(reports);
      } catch (error) {
        console.error(error);
      }
    };

    getMonthlyReports();
  }, []);

  return (
    <div>
      <h1>Monthly Reports</h1>
      <table>
        <thead>
          <tr>
            <th>Vehicle</th> 
            <th>Total Fuel Consumption</th>
            <th>Total Kilometers</th>
            <th>Total Fuel Cost</th>
            <th>Total Oil Cost</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report.vehicle}</td>
              <td>{report.totalFuelConsumptionInLiter}</td>
              <td>{report.totalKiloMeter}</td>
              <td>{report.totalFuelCost}</td>
              <td>{report.totalOilCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyReport;
