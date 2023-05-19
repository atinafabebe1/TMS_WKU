import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import api from "../../../api/api";

const UserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/user/me");
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(users);
  return (
    <div>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Driver Vehicle</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.userName}</td>
              <td>{user.driverVehicle}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserPage;
