import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import Papa from "papaparse";

//import Nav from 'react-bootstrap/Nav';
const RegisterUserCSV = () => {
  const [toggle, setToggle] = useState(true);
  const [csvFile, setCsvFile] = useState(null);
  const [users, setUsers] = useState([]);

  const handleFileUpload = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleFileParse = () => {
    Papa.parse(csvFile, {
      header: true,
      complete: (result) => {
        setUsers(result.data);
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      for (let i = 0; i < users.length; i++) {
        const { name, email, password } = users[i];
        await fetch("/user/register", { name, email, password });
      }

      alert("Users registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to register users!");
    }
  };

  return (
    <div className="view">
      <div className="sidebar">
        <div className="d-grid">
          <button
            onClick={() => setToggle(!toggle)}
            className="btn btn-outline-secondary mb-5"
          >
            Menu
          </button>
        </div>
        <hr></hr>
        {!toggle && (
          <ListGroup>
            <ListGroup.Item action active href="/director/manageUser">
              <ManageAccountsIcon color="white" />
            </ListGroup.Item>
            <ListGroup.Item action href="/director/generateMonthlyReport">
              <AssessmentIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/director/approvePurchesingRequest">
              <PriceCheckIcon color="primary" />
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action active href="/director/manageUser">
              <ManageAccountsIcon color="primary" />
              <span> </span>
              Manage User
            </ListGroup.Item>
            <ListGroup.Item action href="/director/generateMonthlyReport">
              <AssessmentIcon color="primary" />
              <span> </span>
              Generate Report
            </ListGroup.Item>
            <ListGroup.Item action href="/director/approvePurchesingRequest">
              <PriceCheckIcon color="white" />
              <span> </span>
              Approve Request
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="field">
        <div className="App">
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="csvFile">Upload CSV File:</label>
            <input
              type="file"
              id="csvFile"
              accept=".csv"
              onChange={handleFileUpload}
            />
            <button type="button" onClick={handleFileParse}>
              Parse CSV
            </button>

            {users.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>userName</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>email</th>
                    <th>phoneNumber</th>
                    <th>password</th>
                    <th>address</th>
                    <th>role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.userName}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.password}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.password}</td>
                      <td>{user.address}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <button type="submit" disabled={users.length === 0}>
              Register Users
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterUserCSV;
