import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Tabs, Tab, Button, Table } from 'react-bootstrap';
import api from '../../../api/api';

const GDMaintenanceReportPage = () => {
  const [duration, setDuration] = useState('Daily');
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

      <Tabs activeKey={duration} onSelect={(selectedDuration) => setDuration(selectedDuration)}>
        <Tab eventKey="Daily" title="Daily" />
        <Tab eventKey="Weekly" title="Weekly" />
        <Tab eventKey="Monthly" title="Monthly" />
      </Tabs>

      <div>
        <h2>{duration} Reports</h2>
        {maintenanceReports.length === 0 ? (
          <p>No completed maintenance reports found.</p>
        ) : (
          <div>
            {maintenanceReports.map((report) => (
              <Card key={report._id} className="mb-3">
                <Card.Body>
                  <Card.Title className="text-primary">Plate Number: {report?.plateNumber}</Card.Title>
                  <Card.Text className="mb-4">Examination: {report.examination}</Card.Text>
                  <Card.Text className="mb-4">Status: {report.status}</Card.Text>

                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Spare Id</th>
                        <th>Spare Name</th>
                        <th>Item Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.spareparts.map((sparepart) => (
                        <tr key={sparepart.spareId}>
                          <td>{sparepart.spareId}</td>
                          <td>{sparepart.spareName}</td>
                          <td>{sparepart.itemPrice}</td>
                          <td>{sparepart.quantity}</td>
                          <td>{sparepart.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

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
