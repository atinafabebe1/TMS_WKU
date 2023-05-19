import React, { useState, useEffect } from "react";
import { Table, Button, Tab, Nav, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/api";

const TransferVehicle = ({ link }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/Request/transfer")
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error Fetching Report:", error));
  }, []);

  useEffect(() => {
    data.forEach((item) => {
      console.log(item.user); // Log item.user value in the console
    });
  }, [data]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await api.get(`/user/getuser/${user?.id}`);
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   if (user?.id) {
  //     fetchUserData();
  //   }
  // }, [user]);

  return (
    <div className="p-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>sender</th>
            <th>Plate Number</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="7">Loading...</td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id}>
                <td>{item.user}</td>
                <td>{item.plateNumber}</td>
                <td>{item.description}</td>
                <td>{new Date(item.updatedAt).toLocaleString()}</td>
                <td>{item.status}</td>
                <td>
                  <Button variant="info" size="sm">
                    See More
                  </Button>{" "}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TransferVehicle;
