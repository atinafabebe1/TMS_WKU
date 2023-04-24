import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import api from "../../../api/api";

const Complain = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await api.post('/complain', {
    
        title,
        content
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit complaint');
      }
      
      alert('Complaint submitted successfully!');
      
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      alert('Failed to submit complaint');
    }
  };
  

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center">Contact Us</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formtitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formcontent" className="mb-3">
              <Form.Label>Message </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Message"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" onSubmit={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Complain;
