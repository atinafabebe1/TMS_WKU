import React, { useState, useEffect } from "react";
import api from "../../../api/api";
import { Button, Form, Table } from "react-bootstrap";
import html2pdf from "html2pdf.js";
import { useParams } from "react-router-dom";

const SparePartReports = () => {
  const [requests, setRequests] = useState([]);
  const { fromDate, toDate, season } = useParams();
  useEffect(() => {
    api
      .get("/Request/sparePart")
      .then((response) => {
        console.log(response.data.data);
        setRequests(response.data.data);
      })
      .catch((error) =>
        console.error("Error fetching spare part requests:", error)
      );
  }, []);

  const filteredRequests = requests.filter(
    (request) =>
      request.status === "completed" &&
      new Date(request.createdAt) >= new Date(fromDate) &&
      new Date(request.createdAt) <= new Date(toDate)
  );

  const groupedRequests = filteredRequests.reduce((result, request) => {
    if (!result[request.plateNumber]) {
      result[request.plateNumber] = {
        requests: [],
        totalQuantity: 0,
        totalPrice: 0,
      };
    }
    result[request.plateNumber].requests.push(request);
    result[request.plateNumber].totalQuantity += request.quantity;
    result[request.plateNumber].totalPrice += request.totalPrice;
    return result;
  }, {});

  const totalQuantity = Object.values(groupedRequests).reduce(
    (sum, { totalQuantity }) => sum + totalQuantity,
    0
  );

  const totalPrice = Object.values(groupedRequests).reduce(
    (sum, { totalPrice }) => sum + totalPrice,
    0
  );

  const handlePrint = () => {
    const input = document.getElementById("pdf-container");
    html2pdf(input, {
      margin: [4, 4, 4, 4],
      filename: "weekly-spare-parts-report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] },
    });
  };
  const now = new Date();
  const dateTimeString = now.toLocaleString();

  const thirtyDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgoString = thirtyDaysAgo.toLocaleString();

  return (
    <div className="p-4">
      <Form>
        <div className="p-4">
          <div id="pdf-container" className="p-4">
            <h5 style={{ color: "#4682B4", textAlign: "center" }}>
              <strong>Wolkite University</strong>
              <br />
              {season} Used Spare Part Report
            </h5>
            <br />
            <h5 style={{ color: "#696969", textAlign: "center" }}>
              Wolkite University Transport and Deployment Directorate
            </h5>
            <p style={{ color: "#696969", padding: "left" }}>
              Date: {dateTimeString}
            </p>
            <p style={{ color: "#696969", padding: "left" }}>
              This Report is Generated For Spare Part Used From{" "}
              <strong>{fromDate} </strong>To <strong> {toDate}</strong>
            </p>
            <br />
            {Object.keys(groupedRequests).map((plateNumber) => (
              <div key={plateNumber}>
                <h5
                  style={{ color: "#4169E1", paddingLeft: "80px" }}
                >{`Plate Number: ${plateNumber}`}</h5>
                <br />
                <Table striped bordered hover responsive className="table-sm">
                  <thead style={{ backgroundColor: "#4682B4", color: "white" }}>
                    <tr>
                      <th>Type</th>
                      <th>Spare Part ID</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total Price</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedRequests[plateNumber].requests.map((request) => (
                      <tr key={request._id}>
                        <td>{request.type}</td>
                        <td>{request.identificationNumber}</td>
                        <td>{request.quantity}</td>
                        <td>{request.unitPrice}</td>
                        <td>{request.totalPrice}</td>
                        <td>{new Date(request.createdAt).toLocaleString()}</td>
                        <td>{request.status}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2">Total</td>
                      <td>{groupedRequests[plateNumber].totalQuantity}</td>
                      <td></td>
                      <td>{groupedRequests[plateNumber].totalPrice}</td>
                      <td colSpan="2"></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            ))}
            <br />
            <h5>
              Total Quantity and Total Price Paid For This Month Spare Part
            </h5>

            <Table striped bordered hover responsive className="table-sm">
              <thead style={{ backgroundColor: "#4682B4", color: "white" }}>
                <tr>
                  <th>{season} Used SparePart Total Quantity</th>
                  <th>{season} Used SparePart Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{totalQuantity}</td>
                  <td>{totalPrice}</td>
                </tr>
              </tbody>
            </Table>

            <h6>Generated by Wolkite University Transport Management System</h6>
          </div>
        </div>
      </Form>
      <div className="p-4">
        <h3 style={{ paddingLeft: "800px", paddingBottom: "50px" }}>
          <Button variant="primary" onClick={handlePrint}>
            Download Report in Pdf
          </Button>
        </h3>
      </div>
    </div>
  );
};

export default SparePartReports;
