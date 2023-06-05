import React, { useState, useEffect } from 'react';
import { Container, Table, Tab, Nav } from 'react-bootstrap';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
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

  const pieChartData = reportData.map((data) => ({
    plateNumber: data.plateNumber,
    approvedAmount: data.approvedAmount,
    typeOfFuel: data.typeOfFuel,
  }));

  const barChartData = reportData.map((data) => ({
    plateNumber: data.plateNumber,
    approvedAmount: data.approvedAmount,
    typeOfFuel: data.typeOfFuel,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>{`Plate Number: ${data.plateNumber}`}</p>
          <p>{`Approved Amount: ${data.approvedAmount}`}</p>
          <p>{`Fuel Type: ${data.typeOfFuel}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <Container>
      <h1>Fuel Request Report</h1>
      <Tab.Container id="duration-tabs" defaultActiveKey="Daily">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="Daily" onClick={() => setDuration('Daily')}>
              Daily
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Weekly" onClick={() => setDuration('Weekly')}>
              Weekly
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Monthly" onClick={() => setDuration('Monthly')}>
              Monthly
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="Daily"></Tab.Pane>
          <Tab.Pane eventKey="Weekly"></Tab.Pane>
          <Tab.Pane eventKey="Monthly"></Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      {reportData.length === 0 ? (
        <div>No fuel Reports found</div>
      ) : (
        
        <Tab.Container id="tabs-fuel-report" defaultActiveKey="pie-chart">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="pie-chart">Pie Chart</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bar-chart">Bar Chart</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="table">Table</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="pie-chart">
              <PieChart width={400} height={300}>
                <Pie
                  data={pieChartData}
                  dataKey="approvedAmount"
                  nameKey="plateNumber"
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
                    {`${pieChartData[activeSlice].plateNumber}: ${pieChartData[activeSlice].approvedAmount}`}
                  </text>
                )}
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </Tab.Pane>
            <Tab.Pane eventKey="bar-chart">
              <BarChart width={600} height={300} data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="plateNumber" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="approvedAmount" fill="#8884d8" />
              </BarChart>
            </Tab.Pane>
            <Tab.Pane eventKey="table">
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
                  {reportData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.plateNumber}</td>
                      <td>{data.typeOfFuel}</td>
                      <td>{data.approvedAmount}</td>
                      <td>{data.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      )}
    </Container>
  );
};

export default FuelReport;
