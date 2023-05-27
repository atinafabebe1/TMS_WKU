import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import api from "../../../api/api";
import "../../common/css/formStyles.css";
import Loading from "../Provider/LoadingProvider";

const MaintenanceApprovalTable = ({ filter,data }) => {


  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isLoading,setIsLoading]=useState(true);
  useEffect(() => {
    api
      .get("/MaintenanceReport")
      .then((response) => {
        console.log(response.data.data);
        setRequests(response.data.data);
        setIsLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching maintenance reports:", error)
      );
  }, []);

  const handleMore = (request) => {
    console.log(request);
    setSelectedRequest(request);
    setShowModal(true);
  };
const handleModalClose=()=>{
    setShowModal(false);
}
  const handleApprove = async (event) => {
event.preventDefault();
  
      try {

         //Update status place
  
      } catch (error) {
        console.error("Error updating/approve:", error);

      }
    };
  
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = requests
    .filter((request) => {
      if (filter === "all") {
        return true;
      } else {
        return request.status.toLowerCase() === filter;
      }
    })
    .filter((request) => {
      return request.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="p-4">
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
      {isLoading && <Loading/> }
      <Table striped bordered hover responsive className="table-sm">
        <thead>
        <tr className="form-control-custom">
            <th>Plate Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="form-control-custom">
          {filteredRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.plateNumber}</td>
              <td>{request.createdAt}</td>
              <td>{request.status}</td>
              <td>
                {(request.status === "Waiting-Mech-To-Approve"|| request.status === "Waiting-GD-To-Approve") && (
                  <>
                     <Button
                  variant="success"
                  className="btn btn-sm"
                  onClick={() => handleApprove(request)}
                >
                  Approve
                </Button>
                {" "}
                <Button
                  variant="secondary"
                  className="btn btn-sm"
                  onClick={() => handleMore(request)}
                >
                  Reject
                </Button>
                  </>
                )}{" "}
                <Button
                  variant="info"
                  className="btn btn-sm"
                  onClick={() => handleMore(request)}
                >
                  More
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Maintenance Orders Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Plate Number:</strong> {selectedRequest?.plateNumber}
          </p>
          <p>
            <strong>Date:</strong> {selectedRequest?.createdAt}
          </p>
          <p>
            <strong>Status:</strong> {selectedRequest?.status}
          </p>
          <p>
            <strong>Description:</strong> {selectedRequest?.crashType}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-sm"
            onClick={handleModalClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      

    </div>
  );
};

export default MaintenanceApprovalTable;
