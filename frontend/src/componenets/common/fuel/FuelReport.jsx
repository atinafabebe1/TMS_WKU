import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import api from '../../../api/api';

const FuelReport = () => {
  const [duration, setDuration] = useState('Daily');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlice, setActiveSlice] = useState(null);

  useEffect(() => {
    fetchFuelRequestReport();
  }, [duration]);

  const fetchFuelRequestReport = async () => {
    try {
      const response = await api.get(`/Request/fuelRequests/report/${duration}`);
      setReportData(response.data.data || []);
      setLoading(false);
    } catch (error) {
      setError('Error retrieving fuel request report');
      setLoading(false);
    }
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const pieChartData = reportData.map(data => ({
    name: data.plateNumber,
    value: data.approvedAmount,
  }));

  return (
    <Container>
      <h1>Fuel Request Report</h1>
      <div>
        <label htmlFor="duration">Duration:</label>
        <select id="duration" value={duration} onChange={handleDurationChange}>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      {reportData.length === 0 ? (
        <div>No fuel requests found</div>
      ) : (
        <div>
          <PieChart width={400} height={300}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
              onMouseEnter={(data, index) => setActiveSlice(index)}
              onMouseLeave={() => setActiveSlice(null)}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={index} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
            {activeSlice !== null && (
              <text
                x={200}
                y={150}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: '18px', fontWeight: 'bold' }}
              >
                {`${pieChartData[activeSlice].name}: ${pieChartData[activeSlice].value}`}
              </text>
            )}
          </PieChart>

          <Table bordered>
            <thead>
              <tr>
                <th>Vehicle Plate Number</th>
                <th>Type of Fuel</th>
                <th>Approved Amount</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((data) => (
                <tr key={data.user}>
                  <td>{data.plateNumber}</td>
                  <td>{data.typeOfFuel}</td>
                  <td>{data.approvedAmount}</td>
                  <td>{data.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default FuelReport;
