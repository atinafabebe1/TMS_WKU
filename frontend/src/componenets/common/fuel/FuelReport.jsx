import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import api from '../../../api/api';

const FuelReport = () => {
  const [duration, setDuration] = useState('Daily');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFuelRequestReport();
  }, [duration]);

  const fetchFuelRequestReport = async () => {
    try {
      const response = await api.get(`/Request/fuelRequests/report/${duration}`);
      setReportData(response.data.data || []); // Handle undefined response or set an empty array as fallback
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
                <td>{data.vehiclePlateNumber}</td>
                <td>{data.typeOfFuel}</td>
                <td>{data.approvedAmount}</td>
                <td>{data.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default FuelReport;
