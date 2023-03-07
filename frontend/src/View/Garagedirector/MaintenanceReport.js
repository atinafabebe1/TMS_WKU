//form from react bootstrap
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

//sidebar icon from material UI
import FilterFramesSharpIcon from "@mui/icons-material/FilterFramesSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import DnsSharpIcon from "@mui/icons-material/DnsSharp";
//import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";
import React, { useState } from "react";

const GDMaintenanceReports = () => {
  const [toggle, setToggle] = useState(true);
  const maintenanceReports = [
    {
      id: 1,
      date: "2022-03-01",
      vehicleId: "SP 123",
      description: "Gear Changed",
      cost: 50
    },
    {
      id: 2,
      date: "2022-02-15",
      vehicleId: "SP 789",
      description: "Tire replacement",
      cost: 200
    },
    // more maintenance reports...
  ];
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // fetch maintenance reports from server or API and set the state
    setReports(maintenanceReports);
  }, []);
  const [query, setQuery] = useState('');
  const filteredReports = reports.filter(report =>
    report.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="view">
      <div className="sidebar">
        <div class="d-grid">
          <button
            onClick={() => setToggle(!toggle)}
            class="btn btn btn-outline-secondary mb-5"
          >
            Menu
          </button>
        </div>
        <hr></hr>
        {!toggle && (
           <ListGroup>
           <ListGroup.Item action href="/gd/maintenanceorder">
             <FilterFramesSharpIcon color="primary" />
           </ListGroup.Item>
           <ListGroup.Item action href="/gd/maintenancereport">
             <SummarizeSharpIcon color="primary" />
           </ListGroup.Item>
           <ListGroup.Item action href="/gd/accessoryrequest">
             <DnsSharpIcon color="primary" />
           </ListGroup.Item>
           <ListGroup.Item action href="/gd/approvemaintenance">
             <CheckBoxSharpIcon color="primary" />
           </ListGroup.Item>
         </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action href="/gd/maintenanceorder">
              <FilterFramesSharpIcon color="primary" />
              <span> </span>
              Maintenance Order
            </ListGroup.Item>
            <ListGroup.Item action href="/gd/maintenancereport">
              <SummarizeSharpIcon color="primary" />
              <span> </span>
              Maintenance Report
            </ListGroup.Item>
            <ListGroup.Item action href="/gd/accessoryrequest">
              <DnsSharpIcon color="primary" />
              <span> </span>
              Accessory Request
            </ListGroup.Item>
            <ListGroup.Item action href="/gd/approvemaintenance">
              <CheckBoxSharpIcon color="primary" />
              <span> </span>
              Approve Maintenance
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="field">
        <div className="App">
          <Form
            className="form">
               <Row className="mb-3" w-70>
            <h4>Maintenance Report Detail Information</h4>
            <input
              type="text"
              placeholder="Search by description..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <table>
      <thead>
        <tr>
          <th>ID</th>
          <span></span>
          <th>Date</th>
          <span></span>
          <th>Vehicle ID</th>
          <span></span>
          <th>Description</th>
          <span></span>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <span></span>
                    <td>{report.date}</td>
                    <span></span>
                    <td>{report.vehicleId}</td>
                    <span></span>
                    <td>{report.description}</td>
                    <span></span>
                    <td>{report.cost}</td>
                  </tr>
                ))}
              </tbody>
    </table>
    </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default GDMaintenanceReports;
