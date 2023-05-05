import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import axios from "axios";
import api from "../../../api/api";

const MaintenanceOrderTable = () => {
  const [reports, setReports] = useState([]);
  const [spare, setSpare] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [maintenanceReport, setMaintenanceReport] = useState("");
  const [mechanics, setMechanics] = useState([]);

  const fetchSpareData = async () => {
    await api.get(`/Request/sparePart`).then((response) => {
      console.log(response.data.data);
      setSpare(response.data.data);
    });
  };

  useEffect(() => {
    // Fetch the reports from your server API
    api
      .get("/MaintenanceOrder")
      .then((response) => {
        console.log(response.data.data);
        setReports(response.data.data);
      })
      .catch((error) =>
        console.error("Error fetching maintenance reports:", error)
      );
    fetchSpareData();
  }, []);

  const handleMore = (report) => {
    console.log(report);
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleReportModal = (report) => {
    console.log(report);
    setSelectedReport(report);
    setReportModal(true);
  };

  const handleReportModalClose = () => {
    setReportModal(false);
    setSelectedReport(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredReports = reports.filter((report) => {
    const plateNumber =
      typeof report.plateNumber === "string" ? report.plateNumber : "";
    return (
      plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleReport = (id) => {
    // Send a POST report to the server API to transfer maintenance order
    axios
      .post(`/MaintenanceReport`, {
        maintenanceOrder: id,
        reportStatus: "reported",
        description: maintenanceReport,
      })
      .then((response) => {
        console.log(response);
        // Update the local state with the new status of the report
        const updatedReports = reports.map((report) => {
          if (report._id === id) {
            return {
              ...report,
              reportStatus: "reported",
            };
          }
          return report;
        });
        setReports(updatedReports);
        setMaintenanceReport("");
        setReportModal(false);
      })
      .catch((error) => {
        console.error(`Error reporting maintenance with ID ${id}:`, error);
      });
  };

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h1 align="center">Maintenance Reports</h1>
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
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Reporting Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr key={report._id}>
              <td>{report.plateNumber}</td>
              <td>{report.createdAt}</td>
              <td>{report.status}</td>
              <td>{report.reportStatus}</td>
              <td>
                
                {//report.status === "approved" && (
                  <>
                    <Button
                      variant="success"
                      className="btn btn-sm"
                      onClick={() => handleReportModal(spare)}
                    >
                      Report
                    </Button>{" "}
                  </>
               // )
                }{" "}
                <Button variant="info" 
                className="btn btn-sm"
                onClick={() => handleMore(report)}>
                  More
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Maintenance Report Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Plate Number:</strong> {selectedReport?.plateNumber}
          </p>
          <p>
            <strong>Date:</strong> {selectedReport?.createdAt}
          </p>
          <p>
            <strong>Status:</strong> {selectedReport?.status}
          </p>
          <p>
            <strong>Report Status:</strong> {selectedReport?.reportStatus}
          </p>
          <p>
            <strong>Description:</strong> {selectedReport?.description}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn btn-sm" onClick={handleModalClose}>
            Close
          </Button>
          {selectedReport?.status === "pending" && (
            <Button
              variant="primary"
              className="btn btn-sm"
              onClick={() => handleReportModal(selectedReport._id)}
            >
              Report
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal show={reportModal} onHide={handleReportModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>MaintenanceReport Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>
            <strong>Spare ID:</strong> {spare?.identificationNumber}
        </p>
        <p>
            <strong>Spare ID:</strong> {spare?.identificationNumber}
        </p>
      

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
          className="btn btn-sm"
          onClick={handleReportModalClose}>
            Close
          </Button>

            <Button
              variant="primary"
              className="btn btn-sm"
              onClick={() => handleReport(selectedReport._id)}
            >
              Report
            </Button>
      
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default MaintenanceOrderTable;
