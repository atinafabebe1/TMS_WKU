import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function RejectModal(props) {
  const [reason, setReason] = useState("");

  const handleClose = () => {
    setReason("");
    props.onClose();
  };

  const handleReject = () => {
    props.onReject(reason);
    handleClose();
  };

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reject Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicReason">
          <Form.Label>Reason for rejection:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter reason"
            value={reason}
            onChange={handleChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleReject}>
          Reject
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RejectModal;
