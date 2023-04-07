import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import api from "../../../api/api";

const ConfirmationModal = ({
  text,
  url,
  id,
  show,
  onHide,
  onDeleteConfirmed,
}) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    api
      .put(`${url}/${id}`, { password: password, isActive: false })
      .then(() => {
        onDeleteConfirmed();
        onHide();
      });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{text}</p>
        <Form>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
