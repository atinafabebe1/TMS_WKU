import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import api from "../../../api/api";

const VehicleRequestListPage = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's vehicle requests from your server API
    api
      .get("/Request/vehicle")
      .then((response) => {
        console.log(response.data.data);
        setRequests(response.data.data);
      })
      .catch((error) =>
        console.error("Error fetching vehicle requests:", error)
      );
  }, []);

  const handleDeleteRequest = (id) => {
    // Delete the vehicle request with the specified ID from your server API
    api
      .delete(`/Request/vehicle/${id}`)
      .then(() => {
        // Filter out the deleted request from the local state
        setRequests(requests.filter((request) => request._id !== id));
      })
      .catch((error) =>
        console.error(`Error deleting vehicle request with ID ${id}:`, error)
      );
  };

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h1>My Vehicle Requests</h1>
        </Col>
        <Col className="text-end">
          <Link to="/employee/vehicle-request">
            <Button variant="primary">New Request</Button>
          </Link>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Driver</th>
            <th>Plate Number</th>
            <th>Destination</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((request) => (
            <tr key={request._id}>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>
                {request.driver?.firstName} {request.driver?.lastName}
              </td>
              <td>{request.plateNumber}</td>
              <td>{request.destination}</td>
              <td>{request.reason}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "rejected" && (
                  <Button
                    className="btn btn-sm"
                    variant="secondary"
                    onClick={() =>
                      navigate(`/employee/edit-vehicle-request/${request._id}`)
                    }
                  >
                    Resubmit
                  </Button>
                )}
                {request.status === "approved" && (
                  <Button className="btn btn-sm" variant="success" disabled>
                    Approved
                  </Button>
                )}
                {request.status === "pending" && (
                  <div>
                    <Button
                      className="btn btn-sm"
                      variant="primary"
                      onClick={() =>
                        navigate(
                          `/employee/edit-vehicle-request/${request._id}`
                        )
                      }
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      variant="danger"
                      onClick={() => handleDeleteRequest(request._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VehicleRequestListPage;
