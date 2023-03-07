import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ListGroup from "react-bootstrap/ListGroup";
const UserInfo = () => {
  const [toggle, setToggle] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/user/register')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleUserActivation = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          isActive: !user.isActive
        }
      }
      return user;
    });
    setUsers(updatedUsers);
    axios.put(`/user/register/${userId}`, { isActive: updatedUsers.find(user => user.id === userId).isActive })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          role: newRole
        }
      }
      return user;
    });
    setUsers(updatedUsers);
    axios.put(`/user/register/${userId}`, { role: updatedUsers.find(user => user.id === userId).role })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
        <Form
            className="form">
          <Row className="mb-3" w-70>
      <h4>User Information</h4>
      <input
        type="text"
        placeholder="Search users"
        value={searchQuery}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <span></span>
            <th>Status</th>
            <span></span>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  {user.isActive ? (
                    <button onClick={() => handleUserActivation(user.id)}>
                      Deactivate
                    </button>
                  ) : (
                    <button onClick={() => handleUserActivation(user.id)}>
                      Activate
                    </button>
                  )}
                </td>
                <td>
                  <select
                    value={user.role}
                    onChange={(event) => handleRoleChange(user.id, event.target.value)}
                  >
                    <option value="ROLE_EMPLOYEE">ROLE_EMPLOYEE</option>
                  <option value="ROLE_DIRECTOR">ROLE_DIRECTOR</option>
                  <option value="ROLE_DRIVER">ROLE_DRIVER</option>
                  <option value="ROLE_FUELDISTRUBTOR">
                    ROLE_FUELDISTRUBTOR
                  </option>
                  <option value="ROLE_GARAGEDIRECTOR">
                    ROLE_GARAGEDIRECTOR
                  </option>
                  <option value="ROLE_HEADOFDEPLOYMENT">
                    ROLE_HEADOFDEPLOYMENT
                  </option>
                  <option value="ROLE_MECHANIC">ROLE_MECHANIC</option>
                  <option value="ROLE_VICEPRESIDENT">ROLE_VICEPRESIDENT</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </Row>
      </Form>
    </div>
    </div>
    </div>
  );
};

export default UserInfo;
