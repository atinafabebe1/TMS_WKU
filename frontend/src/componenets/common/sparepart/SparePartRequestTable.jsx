import { Table, Button, Modal, Form, Row, Col, Badge } from "react-bootstrap";
import { useState } from "react";

const SparePartRequestTable = ({
  requests,
  handleApproveClick,
  handleRejectClick,
  handleRequestClick,
  handleCompletedtoBuyClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(false);
  const [rejectedReason, setRejectedReason] = useState(null);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmBuyModal, setShowConfirmBuyModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (request) => {
    setCurrentRequest(request);
    setShowModal(true);
  };

  const handleCloseConfirmModal = () => setShowConfirmModal(false);
  const handleShowConfirmModal = (request) => {
    setCurrentRequest(request);
    setShowConfirmModal(true);
  };
  const handleCloseConfirmBuyModal = () => setShowConfirmBuyModal(false);
  const handleShowConfirmBuyModal = (request) => {
    setCurrentRequest(request);
    setShowConfirmBuyModal(true);
  };
  const handleApproveToBuy = () => {
    handleCompletedtoBuyClick(currentRequest);
    handleCloseConfirmBuyModal();
  };
  const handleComplete = () => {
    handleApproveClick(currentRequest);
    handleCloseConfirmModal();
  };
  //detail information modal
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

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
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
            <th>SparePart Name </th>
            <th>Quantity</th>
            <th>Total price</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.slice(startIndex, startIndex + 7).map((request) => (
            <tr key={request._id}>
              <td>
                <a href="#" onClick={() => handleRequestClick(request)}>
                  {console.log(request.user.firstName)}
                  {request.user.firstName} {request.user.lastName}
                  <p>{request.user}</p>
                </a>
              </td>
              <td>{request.plateNumber}</td>
              <td>{request.sparePartName}</td>
              <td>{request.quantity}</td>
              <td>{request.totalPrice}</td>
              <td>{new Date(request.createdAt).toLocaleDateString()}</td>
              <td>
                <Badge>{request.status}</Badge>
              </td>
              <td>
                {request.status === "pending" && (
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
                      onClick={() => handleShowConfirmModal(request)}
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
                {request.status === "completed" && (
                  <>
                    <Button
                      className="btn btn-sm"
                      variant="info"
                      onClick={() => handleShowDetailModal(request)}
                    >
                      More
                    </Button>{" "}
                    <Button className="btn btn-sm" variant="success" disabled>
                      Request Successfully Completed
                    </Button>{" "}
                  </>
                )}
                {request.status === "canceled" && (
                  <>
                    <Button
                      className="btn btn-sm"
                      variant="info"
                      onClick={() => handleShowDetailModal(request)}
                    >
                      More
                    </Button>{" "}
                    <Button className="btn btn-sm" variant="danger" disabled>
                      Oops Request Rejected
                    </Button>{" "}
                  </>
                )}
                {request.status === "in-progress" && (
                  <>
                    <Button
                      className="btn btn-sm"
                      variant="info"
                      onClick={() => handleShowDetailModal(request)}
                    >
                      More
                    </Button>{" "}
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
                      variant="success"
                      onClick={() => handleShowConfirmBuyModal(request)}
                      // onClick={() => handleCompletedtoBuyClick(request)}
                    >
                      Approve
                    </Button>{" "}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ paddingBottom: "70px" }}
      >
        <Button
          variant="primary"
          className="btn-sm mx-2"
          onClick={handlePrevious}
          disabled={startIndex === 0}
          block
        >
          Previous
        </Button>
        <Button
          variant="primary"
          className="btn-sm mx-2"
          onClick={handleNext}
          disabled={startIndex + 7 >= requests.length}
          block
        >
          Next
        </Button>
      </div>
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are You Sure to Approve This Request</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            variant="secondary"
            onClick={handleCloseConfirmModal}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-sm"
            variant="primary"
            onClick={handleComplete}
          >
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmBuyModal} onHide={handleCloseConfirmBuyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are You Sure to Approve This To Buy Request</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            variant="secondary"
            onClick={handleCloseConfirmBuyModal}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-sm"
            variant="primary"
            onClick={handleApproveToBuy}
          >
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
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
                Oops! Kindly be informed that this request has been rejected due
                to the reason of{" "}
                <strong>"{selectedRequest?.rejectedReason}"</strong>. We advise
                User that upon resubmission of request they have to consider
                modify the reason to improve their chances of approval.
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
                  <strong>Spare Part Name</strong>
                </td>
                <td>{selectedRequest?.sparePartName}</td>
              </tr>
              <tr>
                <td>
                  <strong>Plate Number</strong>
                </td>
                <td>{selectedRequest?.plateNumber}</td>
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
                <td>{new Date(selectedRequest?.createdAt).toLocaleString()}</td>
              </tr>
            </tbody>
          </Table>
          <br></br>
          {selectedRequest.status === "store-approved-to-buy" && (
            <>
              <h5 style={{ textAlign: "center" }}>
                <Badge bg="success">Waiting For Your Approval Right Know</Badge>
              </h5>
            </>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default SparePartRequestTable;
