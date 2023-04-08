import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import api from "../../../api/api";

const MaintenanceRequestPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch the user's vehicle requests from your server API
    api
      .get("/Request/maintenance")
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
      .delete(`/Request/maintenance/${id}`)
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
          <h1>My Maintenance Requests</h1>
        </Col>
        <Col className="text-end">
          <Link to="/driver/maintenance-request-form">
            <Button variant="primary">New Request</Button>
          </Link>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            
          <th>Plate Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((request) => (
            <tr key={request._id}>
             
              <td>{request.plateNumber}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>{request.status}</td>
              
              <td>
                {request.status === "rejected" && (
                  <Button
                    className="btn btn-sm"
                    variant="secondary"
                    onClick={() =>
                      window.location.replace(
                        `/driver/maintenance-request-form?_id=${request._id}`
                      )
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
                        window.location.replace(
                          `/driver/maintenance-request-form?_id=${request._id}`
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

export default MaintenanceRequestPage;
