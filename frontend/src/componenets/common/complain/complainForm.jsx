import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import api from '../../../api/api';

const Complain = () => {
  const [topic, setTitle] = useState('');
  const [messagekk, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    const fetchComplaints = async () => {
      try {
        const response = await api.get(
          `${COMPLAIN_ENDPOINT}?userId=${user.id}`
        );
        setComplaints(response.data);
      } catch (error) {
    api.get('/Complain')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.log(error);
        setMessages([]);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    api.post('/Complain', {
      title: topic,
      content: messagekk
    })
      .then(response => {
        setMessages([...messages, response.data]);
        setMessage('');
        setTitle('');
        setShowModal(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const filteredMessages = Array.isArray(messages) && messages.filter((message) => {
    const user =
      typeof message.user === "string" ? message.user : "";
    return (
      user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={() => setShowModal(true)}>Create New Complain</Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Complain</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the topic of your message"
                value={topic}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter your message"
                value={messagekk}
                onChange={(e) => setMessage(e.target.value)}
                style={{ height: '100px' }}
              />
            </Form.Group>
            <Button type="submit">Send</Button>
          </Form>
        </Modal.Body>
      </Modal>

    </div>

      <Form>
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="sm"
        />
      </Form>

      <ListGroup>
        {Array.isArray(filteredMessages) && filteredMessages.map((message) => (
          <ListGroupItem key={message._id}>
            <h5>{message.title}</h5>
            <p>{message.content}</p>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default Complain;
