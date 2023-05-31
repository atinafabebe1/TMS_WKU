import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form, Modal, Card } from "react-bootstrap";
import api from "../../../api/api";
import "../../common/css/formStyles.css";
import { useAuth } from "../../../context/AuthContext";
import Loading from "../Provider/LoadingProvider";

const MaintenanceApprovalTable = ({ filter, data }) => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMaintenanceReports = async () => {
      try {
        const response = await api.get(`/maintenanceReports?expertExamined=${user.id}`);
        console.log(response.data.data);
        setReports(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching maintenance reports:", error);
      }
    };

    fetchMaintenanceReports();
  }, []);

  const handleMore = (report) => {
    console.log(report);
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleApprove = async (selectedReportId) => {
    try {
      const response = await api.put(`/maintenanceReports/${selectedReportId._id}`, {
        status: "Waiting-GD-To-Approve",
      });

      console.log("Maintenance report submitted successfully:", response.data);
      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error("Failed to submit maintenance report:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleReject = async (selectedReportId) => {
    try {
      const response = await api.put(`/maintenanceReports/${selectedReportId._id}`, {
        status: "canceled",
      });

      console.log("Maintenance report submitted successfully:", response.data);
      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error("Failed to submit maintenance report:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredReports = reports.filter((report) => {
    if (filter === "all") {
      return report.status.toLowerCase() !== "pending";
    } else {
      return report.status.toLowerCase() === filter;
    }
  }).filter((report) => {
    return report.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
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
      {isLoading && <Loading />}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr className="form-control-custom">
            <th>Plate Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr key={report._id}>
              <td>{report.plateNumber}</td>
              <td>{report.createdAt}</td>
              <td>{report.status}</td>
              <td>
                {report.status === "Waiting-Mech-To-Approve" && (
                  <>
                    <Button
                      variant="success"
                      className="btn btn-sm"
                      onClick={() => handleMore(report)}
                    >
                      Approve
                    </Button>{" "}
                    <Button
                      variant="secondary"
                      className="btn btn-sm"
                      onClick={() => handleMore(report)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  variant="info"
                  className="btn btn-sm"
                  onClick={() => handleMore(report)}
                >
                  More
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Maintenance Report Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Plate Number:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      value={selectedReport?.plateNumber}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Date:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      value={
                        selectedReport
                          ? new Date(selectedReport.createdAt).toLocaleString()
                          : ""
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Status:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      value={selectedReport?.status}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Examination:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      value={selectedReport?.examination}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Spare Parts:
                  </Form.Label>
                  <Col sm="9">
                    {selectedReport?.spareparts?.map((sparepart) => (
                      <Card key={sparepart.spareId} className="mb-3">
                        <Card.Body>
                          <Form.Group as={Row}>
                            <Form.Label column sm="3">
                              Spare ID:
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                plaintext
                                readOnly
                                value={sparepart.spareId}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row}>
                            <Form.Label column sm="3">
                              Spare Name:
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                plaintext
                                readOnly
                                value={sparepart.spareName}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row}>
                            <Form.Label column sm="3">
                              Item Price:
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                plaintext
                                readOnly
                                value={sparepart.itemPrice}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row}>
                            <Form.Label column sm="3">
                              Quantity:
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                plaintext
                                readOnly
                                value={sparepart.quantity}
                              />
                            </Col>
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    ))}
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Overall Total Price:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      value={selectedReport?.exchangedMaintenanceTotalPrice}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          {selectedReport?.status === "Waiting-Mech-To-Approve" && (
            <>
              <Button
                variant="success"
                className="btn btn-sm"
                onClick={() => handleApprove(selectedReport)}
              >
                Approve
              </Button>{" "}
              <Button
                variant="secondary"
                className="btn btn-sm"
                onClick={() => handleReject(selectedReport)}
              >
                Reject
              </Button>
            </>
          )}
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MaintenanceApprovalTable;
