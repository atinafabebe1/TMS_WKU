import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import api from "../../../api/api";

const SparePartRequestListPage = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's spare Part requests from your server API
    api
      .get("/Request/sparePart")
      .then((response) => {
        console.log(response.data.data);
        setRequests(response.data.data);
        setIsLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching Spare Part requests:", error)
      );
  }, []);

  const handleDeleteRequest = (id) => {
    // Delete the SparePart request with the specified ID from your server API
    api
      .delete(`/Request/sparePart/${id}`)
      .then(() => {
        // Filter out the deleted request from the local state
        setRequests(requests);
      })
      .catch((error) =>
        console.error(`Error deleting spare Part request with ID ${id}:`, error)
      );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = requests.filter((request) => {
    return (
      request.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h1>My Spare Part Requests</h1>
        </Col>
        <Col className="text-end">
          <Link to="/mechanic/request/create-accessory">
            <Button variant="primary">New Request</Button>
          </Link>
        </Col>
      </Row>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search by plate number or status"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Form>
      {isLoading && <h4>Loading...</h4>}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>ID </th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests?.map((request) => (
            <tr key={request._id}>
              <td>{request.plateNumber}</td>
              <td>{request.type}</td>
              <td>{request.identificationNumber}</td>
              <td>{request.quantity}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "canceled" && (
                  <Button
                    className="btn btn-sm"
                    variant="secondary"
                    onClick={() =>
                      navigate(
                        `/mechanic/request/edit-vehicle-request/${request._id}`
                      )
                    }
                  >
                    Resubmit
                  </Button>
                )}
                {request.status === "completed" && (
                  <Button
                    className="btn btn-sm"
                    variant="success"
                    disabled
                    onClick={() =>
                      navigate(
                        `/mechanic/request/edit-vehicle-request/${request._id}`
                      )
                    }
                  >
                    Completed
                  </Button>
                )}
                {request.status === "in-progress" && (
                  <Button className="btn btn-sm" variant="success" disabled>
                    Waiting for Store
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
                          `/mechanic/request/edit-vehicle-request/${request._id}`
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

export default SparePartRequestListPage;
