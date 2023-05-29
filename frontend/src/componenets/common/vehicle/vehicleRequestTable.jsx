import { Table, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";

const RequestTable = ({
  requests,
  handleApproveClick,
  handleRejectClick,
  handleRequestClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentRequest, setCurrentRequest] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (request) => {
    setCurrentRequest(request);
    setShowModal(true);
  };

  const handleRejectAndSend = () => {
    handleRejectClick(currentRequest, rejectReason);
    handleCloseModal();
  };

  if (!requests) {
    return <p>No requests found.</p>;
  }

  return (
    <div className="p-4">
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Plate Number</th>
            <th>Passengers</th>
            <th>Destination</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>
                <a href="#" onClick={() => handleRequestClick(request)}>
                  {console.log(request.user.firstName)}
                  {request.user?.firstName} {request.user?.lastName}
                </a>
              </td>
              <td>{request.plateNumber}</td>
              <td>
                {request.passengers
                  .map((passenger) => passenger.name)
                  .join(", ")}
              </td>
              <td>{request.destination}</td>
              <td>{request.reason}</td>
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
          <Modal.Title>Reject Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Reason for Rejection:</Form.Label>
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
    </div>
  );
};

export default RequestTable;
