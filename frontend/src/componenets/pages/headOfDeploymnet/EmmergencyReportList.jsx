import React, { useState, useEffect } from "react";
import { Table, Button, Tab, Nav, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/api";

const EmmergencyReport = ({ link }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/EmergencyReport")
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error Fetching Report:", error));
  }, []);

  // Filter data based on status
  const receivedData = data.filter((item) => item.status === "Received");
  const pendingData = data.filter((item) => item.status === "Pending");

  const handleUpdate = (id) => {
    setSelectedItemId(id);
    setShowModal(true);
  };

  const handleConfirm = () => {
    // Make API call to update the status to "Received"
    api
      .put(`/EmergencyReport/${selectedItemId}`, { status: "Received" })
      .then((response) => {
        // Update the data state with the updated status
        const updatedData = data.map((item) =>
          item._id === selectedItemId ? { ...item, status: "Received" } : item
        );
        setData(updatedData);
        setShowModal(false);
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  const handleCloseModal = () => {
    setSelectedItemId("");
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <Tab.Container defaultActiveKey="received">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="pending">Pending</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="received">Received</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="received">
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Plate Number</th>
                  <th>Type</th>
                  <th>Address</th>
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
                ) : receivedData.length > 0 ? (
                  receivedData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.plateNumber}</td>
                      <td>{item.type}</td>
                      <td>{item.address}</td>
                      <td>{item.detailedDescription}</td>
                      <td>{new Date(item.date).toLocaleString()}</td>
                      <td>{item.status}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() =>
                            navigate(`/hd/report/detail/${item._id}`)
                          }
                        >
                          See More
                        </Button>{" "}
                        <Button variant="success" size="sm" disabled>
                          Received
                        </Button>
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
          </Tab.Pane>
          <Tab.Pane eventKey="pending">
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Plate Number</th>
                  <th>Type</th>
                  <th>Address</th>
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
                ) : pendingData.length > 0 ? (
                  pendingData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.plateNumber}</td>
                      <td>{item.type}</td>
                      <td>{item.address}</td>
                      <td>{item.detailedDescription}</td>
                      <td>{new Date(item.date).toLocaleString()}</td>
                      <td>{item.status}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() =>
                            navigate(`/hd/report/detail/${item._id}`)
                          }
                        >
                          See More
                        </Button>{" "}
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleUpdate(item._id)}
                        >
                          Receive
                        </Button>
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
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark this item as received?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmmergencyReport;
