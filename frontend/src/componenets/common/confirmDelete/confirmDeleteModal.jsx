import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import api from "../../../api/api";

const DeleteConfirmationModal = ({
  url,
  id,
  show,
  onHide,
  onDeleteConfirmed,
}) => {
  const [password, setPassword] = useState("");

  const handleDeleteConfirmed = () => {
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
        <Modal.Title>Confirm deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>
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
        <Button variant="danger" onClick={handleDeleteConfirmed}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
