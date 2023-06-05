import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const RequestTable = ({
  requests,
  handleApproveClick,
  handleRejectClick,
  handleRequestClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentRequest, setCurrentRequest] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (request) => {
    setCurrentRequest(request);
    setShowModal(true);
  };

  const handleCloseDetailModal = () => setShowDetailModal(false);
  const handleShowDetailModal = (request) => {
    setCurrentRequest(request);
    setShowDetailModal(true);
  };

  const handleCloseApproveModal = () => setShowApproveModal(false);
  const handleShowApproveModal = (request) => {
    setCurrentRequest(request);
    setShowApproveModal(true);
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleShowSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const handleRejectAndSend = () => {
    handleRejectClick(currentRequest, rejectReason);
    handleCloseModal();
  };

  const handleApproveAndSend = () => {
    handleApproveClick(currentRequest);
    handleCloseApproveModal();
    handleShowSuccessModal();
  };

  if (!requests) {
    return <p>No requests found.</p>;
  }

  return (
    <div style={{ paddingTop: "40px" }}>
      <Table striped bordered hover responsive className="table-sm">
        <thead className="form-control-custom">
          <tr>
            <th>Detail</th>
            <th>User</th>
            <th>Plate Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>
                <Button
                  variant="link"
                  className="form-control-custom"
                  onClick={() => handleShowDetailModal(request)}
                >
                  Details
                </Button>
              </td>
              <td>
                {request.user?.firstName} {request.user?.lastName}
              </td>
              <td>{request.plateNumber}</td>
              <td>
                {new Date(request.date.from).toLocaleDateString()} -{" "}
                {new Date(request.date.to).toLocaleDateString()}
              </td>
              <td>{request.status}</td>
              <td>
                {request.status === "pending" && (
                  <>
                    <Button
                      className="btn btn-sm"
                      variant="success"
                      onClick={() => handleApproveClick(request)}
                    >
                      Approve
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      variant="danger"
                      onClick={() => handleShowModal(request)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="form-control-custom">
            Reject Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label className="form-control-custom">
              Reason for Rejection:
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            variant="secondary"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-sm"
            variant="primary"
            onClick={handleRejectAndSend}
          >
            Reject and Send
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
        <Modal.Header closeButton>
          <Modal.Title className="form-control-custom">
            Request Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentRequest && (
            <div>
              <p>
                <strong className="form-control-custom">User: </strong>
                <strong>
                  {currentRequest.user?.firstName}{" "}
                  {currentRequest.user?.lastName}
                </strong>
              </p>
              <p>
                <strong className="form-control-custom">Plate Number:</strong>{" "}
                <strong>{currentRequest.plateNumber}</strong>
              </p>
              <p>
                <strong className="form-control-custom"> Passengers: </strong>{" "}
                <strong>
                  {" "}
                  {currentRequest.passengers
                    .map((passenger) => passenger.name)
                    .join(", ")}
                </strong>
              </p>
              <p>
                <strong className="form-control-custom">Destination:</strong>
                <strong>{currentRequest.destination}</strong>
              </p>
              <p>
                <strong className="form-control-custom">Reason: </strong>
                <strong>{currentRequest.reason}</strong>
              </p>
              <p>
                <strong className="form-control-custom"> Date: </strong>
                <strong>
                  {" "}
                  {new Date(
                    currentRequest.date.from
                  ).toLocaleDateString()} -{" "}
                  {new Date(currentRequest.date.to).toLocaleDateString()}
                </strong>
              </p>
              <p>
                <strong className="form-control-custom">Status: </strong>
                <strong>{currentRequest.status}</strong>
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            variant="secondary"
            onClick={handleCloseDetailModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showApproveModal} onHide={handleCloseApproveModal}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to approve this request?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            variant="secondary"
            onClick={handleCloseApproveModal}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-sm"
            variant="success"
            onClick={handleApproveAndSend}
          >
            Approve and Send
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The request has been approved successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            variant="primary"
            onClick={handleCloseSuccessModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RequestTable;
