import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";

const SparePartRequestTable = ({
  requests,
  handleApproveClick,
  handleRejectClick,
  handleRequestClick,
  handleSendToStore,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentRequest, setCurrentRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (request) => {
    setCurrentRequest(request);
    setShowModal(true);
  };

  const handleRejectAndSend = () => {
    handleRejectClick(currentRequest, rejectReason);
    handleCloseModal();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = requests.filter((request) => {
    return request.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!requests) {
    return <p>No requests found.</p>;
  }

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search by Plate Number"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>User</th>
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
              <td>
                <a href="#" onClick={() => handleRequestClick(request)}>
                  {console.log(request.user.firstName)}
                  {request.user?.firstName} {request.user?.lastName}
                </a>
              </td>
              <td>{request.plateNumber}</td>
              <td>{request.type}</td>
              <td>{request.identificationNumber}</td>
              <td>{request.quantity}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
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
                      variant="warning"
                      onClick={() => handleSendToStore(request)}
                    >
                      Send To Store
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
            <Form.Label>Reason for rejection:</Form.Label>
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
    </>
  );
};

export default SparePartRequestTable;
