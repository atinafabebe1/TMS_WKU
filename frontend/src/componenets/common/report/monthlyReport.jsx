import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import { Container, Table, Button } from 'react-bootstrap';
import Loading from '../Provider/LoadingProvider';

const MonthlyReportList = () => {
  const [reports, setReports] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/monthly');
      setReports(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
  };

  const getTableHeaders = () => {
    if (activeCategory === 'fuel') {
      return (
        <>
          <th>Vehicle</th>
          <th>Total Fuel Consumption (Liters)</th>
          <th>Average Kilometer Per Liter</th>
          <th>Total Fuel Cost</th>
          <th>Total Oil Cost</th>
        </>
      );
    } else if (activeCategory === 'maintenance') {
      return (
        <>
          <th>Vehicle</th>
          <th>Service Cost</th>
          <th>Tier Cost</th>
          <th>Tier Maintenance Cost</th>
          <th>Total Fee</th>
        </>
      );
    } else if (activeCategory === 'spareParts') {
      return (
        <>
          <th>Vehicle</th>
          <th>Spare Part Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total Price</th>
        </>
      );
    } 
  };

  const getTableCells = (report) => {
    if (activeCategory === 'fuel') {
      return (
        <>
          <td>{report.vehicle}</td>
          <td>{report.totalfuelConsumptionInLiter}</td>
          <td>{report.averageKilometerPerLiter}</td>
          <td>{report.totalFuelCost}</td>
          <td>{report.totalOilCost}</td>
        </>
      );
    } else if (activeCategory === 'maintenance') {
      return (
        <>
          <td>{report.vehicle}</td>
          <td>{report.serviceCost}</td>
          <td>{report.tierCost}</td>
          <td>{report.tierMaintenanceCost}</td>
          <td>{report.totalFee}</td>
        </>
      );
    } else if (activeCategory === 'spareParts') {
      return (
        <>
          <td>{report.vehicle}</td>
          <td>{report.sparePartName}</td>
          <td>{report.quantity}</td>
          <td>{report.unitPrice}</td>
          <td>{report.totalPrice}</td>
        </>
      );
    } 
  };

  const filteredReports =
    activeCategory === 'all'
      ? reports
      : reports.filter((report) => report.category === activeCategory);

  return (
    <Container>
      <h2 className="form-control-custom">Monthly Report List</h2>
      <div>
        <Button
          variant="primary"
          onClick={() => handleCategoryFilter('fuel')}
          active={activeCategory === 'fuel'}
        >
          Fuel
        </Button>{" "}
        <Button
          variant="primary"
          onClick={() => handleCategoryFilter('maintenance')}
          active={activeCategory === 'maintenance'}
        >
          Maintenance
        </Button>{" "}
        <Button
          variant="primary"
          onClick={() => handleCategoryFilter('spareParts')}
          active={activeCategory === 'spareParts'}
        >
          Spare Parts
        </Button>
      </div>
      {isLoading && <Loading />}
      <Table className="form-control-custom" striped bordered>
        <thead>
          <tr>{getTableHeaders()}</tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr key={report._id}>{getTableCells(report)}</tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MonthlyReportList;
