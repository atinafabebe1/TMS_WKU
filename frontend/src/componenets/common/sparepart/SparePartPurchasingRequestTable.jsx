import { Table, Button, Modal, Form, Row, Col, Badge } from "react-bootstrap";
import Loading from "../Provider/LoadingProvider";
import { useState } from "react";

const SparePartPurchasingRequestTable = ({
  isLoading,
  requests,
  handleApproveClick,
  handleCompleteClick,
  handleRejectClick,
  handleRequestClick,
  handleApproveClicked,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [rejectedReason, setRejectedReason] = useState(null);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (request) => {
    setCurrentRequest(request);
    setShowModal(true);
  };

  const handleCloseDetailModal = () => setShowDetailModal(false);
  const handleShowDetailModal = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };
  const handleRejectAndSend = () => {
    handleRejectClick(currentRequest, rejectedReason);
    handleCloseModal();
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
      {isLoading && <Loading />}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>User</th>
            <th>ID </th>

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

              <td>{request.identificationNumber}</td>
              <td>{request.quantity}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "approved" && (
                  <>
                    <Button
                      className="btn btn-sm"
                      variant="info"
                      onClick={() => handleShowDetailModal(request)}
                    >
                      More
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      variant="success"
                      onClick={() => handleCompleteClick(request)}
                    >
                      Complete
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      variant="primary"
                      onClick={() => handleApproveClick(request)}
                    >
                      Approve to Buy
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
                {request.status === "store-approved-to-buy" && (
                  <>
                    <Button
                      className="btn btn-sm"
                      variant="info"
                      onClick={() => handleShowDetailModal(request)}
                    >
                      More
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      variant="warning"
                      disabled
                      onClick={() => handleCompleteClick(request)}
                    >
                      Waiting For Garage Director Approval
                    </Button>
                  </>
                )}
                {request.status === "Garage-approved-to-buy" && (
                  <>
                    <Button
                      className="btn btn-sm"
                      variant="info"
                      onClick={() => handleShowDetailModal(request)}
                    >
                      More
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      variant="success"
                      onClick={() => handleApproveClicked(request)}
                    >
                      Approve it's Purchased
                    </Button>{" "}
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
              value={rejectedReason}
              onChange={(e) => setRejectedReason(e.target.value)}
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
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showDetailModal}
        onHide={handleCloseDetailModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Request Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest.status === "canceled" && (
            <>
              <p className="text-danger">
                Oops! Kindly be informed that your request has been rejected due
                to the reason of{" "}
                <strong>"{selectedRequest.rejectedReason}"</strong>. We advise
                that upon resubmission of your request, you consider modifying
                the reason to improve your chances of approval. Thank you for
                your understanding and cooperation.
              </p>
            </>
          )}

          <Table striped bordered>
            <tbody>
              <tr>
                <td>
                  <strong>Sender</strong>
                </td>
                <td>{selectedRequest?.user}</td>
              </tr>
              <tr>
                <td>
                  <strong>Spare Part Id</strong>
                </td>
                <td>{selectedRequest?.identificationNumber}</td>
              </tr>
              <tr>
                <td>
                  <strong>Plate Number</strong>
                </td>
                <td>{selectedRequest?.plateNumber}</td>
              </tr>
              <tr>
                <td>
                  <strong>Type</strong>
                </td>
                <td>{selectedRequest?.type}</td>
              </tr>
              <tr>
                <td>
                  <strong>Quantity</strong>
                </td>
                <td>{selectedRequest?.quantity}</td>
              </tr>
              <tr>
                <td>
                  <strong>Unit Price</strong>
                </td>
                <td>{selectedRequest?.unitPrice}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total Price</strong>
                </td>
                <td>{selectedRequest?.totalPrice}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status</strong>
                </td>
                <td>{selectedRequest?.status}</td>
              </tr>
              <tr>
                <td>
                  <strong>Date</strong>
                </td>
                <td>
                  {new Date(selectedRequest?.createdAt).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </Table>
          <br></br>
          {selectedRequest.status === "store-approved-to-buy" && (
            <>
              <h5 style={{ textAlign: "center" }}>
                <Badge bg="secondary">
                  Waiting For Garage Director Approval
                </Badge>
              </h5>
            </>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default SparePartPurchasingRequestTable;
