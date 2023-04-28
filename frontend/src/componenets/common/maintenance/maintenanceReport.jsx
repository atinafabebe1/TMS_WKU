import { useEffect, useState } from 'react';
import api from '../../../api/api';

const MaintenanceReport = () => {
  const [maintenanceReports, setMaintenanceReports] = useState([]);

  useEffect(() => {
    async function fetchMaintenanceReports() {
      const response = await api.get('/MaintenanceReport');
      setMaintenanceReports(response.data);
      console.log(response.data);
    }
    fetchMaintenanceReports();
  }, []);

  return (
    <div>
      <h1>Maintenance Reports</h1>
      <ul>
        {maintenanceReports.map((maintenanceReport) => (
          <li key={maintenanceReport._id}>
            <p>Identification Number: {maintenanceReport.identificationNumber}</p>
            <p>Item Name: {maintenanceReport.itemName}</p>
            <p>Item Price (Birr): {maintenanceReport.itemPrice.birr}</p>
            <p>Item Price (Coin): {maintenanceReport.itemPrice.coin}</p>
            <p>Total Price (Birr): {maintenanceReport.totalPrice.birr}</p>
            <p>Total Price (Coin): {maintenanceReport.totalPrice.coin}</p>
            <p>
              Exchanged Maintenance Total Price (Birr):{' '}
              {maintenanceReport.exchangedMaintenanceTotalPrice.birr}
            </p>
            <p>
              Exchanged Maintenance Total Price (Coin):{' '}
              {maintenanceReport.exchangedMaintenanceTotalPrice.coin}
            </p>
            <p>Examination: {maintenanceReport.examination}</p>
            <p>
              Expert Worked: {maintenanceReport.expertWorked.firstName}{' '}
              {maintenanceReport.expertWorked.lastName}
            </p>
            <p>
              Expert Examined: {maintenanceReport.expertExamined.firstName}{' '}
              {maintenanceReport.expertExamined.lastName}
            </p>
            <p>
              Garage Director: {maintenanceReport.garageDirector.firstName}{' '}
              {maintenanceReport.garageDirector.lastName}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceReport;
