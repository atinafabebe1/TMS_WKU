import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import api from '../../../api/api';

const GDMaintenanceReportPage = () => {
  const [duration, setDuration] = useState('daily');
  const [maintenanceReports, setMaintenanceReports] = useState([]);

  useEffect(() => {
    fetchMaintenanceReports();
  }, [duration]);

  const fetchMaintenanceReports = async () => {
    try {
      const response = await api.get(`/maintenanceReports/maintenance-reports/${duration}`);
      // Filter reports with status "completed"
      const completedReports = response.data.filter((report) => report.status === 'completed');
      setMaintenanceReports(completedReports);
    } catch (error) {
      console.error('Failed to fetch maintenance reports:', error);
    }
  };

  return (
    <div>
      <h1>Maintenance Reports</h1>

      <div>
        <label htmlFor="duration">Duration:</label>
        <select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div>
        <h2>Reports:</h2>
        {maintenanceReports.length === 0 ? (
          <p>No completed maintenance reports found.</p>
        ) : (
          <div>
            {maintenanceReports.map((report) => (
              <Card key={report._id} className="mb-3">
                <Card.Body>
                  <Card.Title className="text-primary">Plate Number: {report.plateNumber}</Card.Title>
                  <Card.Text className="mb-4">Examination: {report.examination}</Card.Text>
                  <Card.Text className="mb-4">Status: {report.status}</Card.Text>

                  <Row>
                    {report.spareparts.map((sparepart) => (
                      <Col key={sparepart.spareId} md={4}>
                        <Card className="mb-3">
                          <Card.Body>
                            <Card.Title>Spare Name: {sparepart.spareName}</Card.Title>
                            <Card.Text>Item Price: {sparepart.itemPrice}</Card.Text>
                            <Card.Text>Quantity: {sparepart.quantity}</Card.Text>
                            <Card.Text>Total Price: {sparepart.totalPrice}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <Card.Text className="mt-4">Exchanged Total Cost: {report.exchangedMaintenanceTotalPrice}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GDMaintenanceReportPage;
