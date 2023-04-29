import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import api from "../../../api/api";

const SparePartRequestListPage = () => {
  const [requests, setRequests] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(2);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchReqestData = async (page) => {
    const limit = 7;
    await api
      .get(`/Request/sparePart?page=${page.page}&limit=${limit}`)
      .then((response) => {
        console.log(response.data.data);
        setRequests(response.data.data);
        setIsLoading(false);
        setTotalCount(response.data.count);
        setPagination(response.data.pagination);
      });
  };

  useEffect(() => {
    fetchReqestData(currentPage);
  }, []);

  const handlePageChange = (page) => {
    fetchReqestData(page);
  };

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
      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {pagination.prev && (
              <li className="page-item">
                <a
                  className="page-link"
                  onClick={() => handlePageChange(pagination.prev)}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
            )}
            {pagination.pages &&
              pagination.pages.map((page) => (
                <li
                  className={`page-item ${
                    page === pagination.current ? "active" : ""
                  }`}
                  key={page}
                >
                  <a
                    className="page-link"
                    onClick={() => handlePageChange(page)}
                    aria-label={`Page ${page}`}
                  >
                    {page}
                  </a>
                </li>
              ))}
            {pagination.next && (
              <li className="page-item">
                <a
                  className="page-link"
                  onClick={() => handlePageChange(pagination.next)}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SparePartRequestListPage;
