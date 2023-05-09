import api from "../../../api/api";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Container, Card, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const COMPLAIN_ENDPOINT = "/Complain";

const Complain = () => {
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [complaints, setComplaints] = useState([]);

  const location = useLocation();

  // set the user state to the user information passed as props
  useEffect(() => {
    if (location.state && location.state.userInfo) {
      setUser(location.state.userInfo);
    }
  }, [location.state]);

  // fetch complaints sent by the user on page load
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await api.get(
          `${COMPLAIN_ENDPOINT}?userId=${user.id}`
        );
        setComplaints(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user.id) {
      fetchComplaints();
    }
  }, [user.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    try {
      const response = await api.post(COMPLAIN_ENDPOINT, {
        user,
        title,
        content,
        status: "Pending",
      });
      setIsSent(true);
      setShowModal(false);
      setTitle("");
      setContent("");
      setIsSending(false);
      setComplaints([response.data, ...complaints]); // add new complaint to the top of the list
    } catch (error) {
      console.log(error);
      setIsSending(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleNewComplain = () => {
    setIsSent(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Complaints</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Create New Complaint
        </Button>
      </div>
      {isSent ? (
        <Alert variant="success" className="my-3">
          Complaint sent successfully!
          <Button
            variant="link"
            className="p-0 ml-2"
            onClick={handleNewComplain}
          >
            Create a new complaint.
          </Button>
        </Alert>
      ) : null}
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <Container>
          {complaints.map((complaint) => (
            <Card key={complaint.id} className="my-3">
              <Card.Header>{complaint.title}</Card.Header>
              <Card.Body>
                <Card.Text>{complaint.content}</Card.Text>
                <Card.Text>Status: {complaint.status}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Container>
      )}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Complain</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="cc">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                minLength={3}
                maxLength={100}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="cc">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as={"textarea"}
                type="text"
                minLength={3}
                maxLength={700}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={isSending}>
                {isSending ? "Sending..." : "Send"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Complain;
