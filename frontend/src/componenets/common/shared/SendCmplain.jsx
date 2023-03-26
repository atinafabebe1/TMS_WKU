import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../../../api/api";

const SendComplain = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
 


  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    const formData = {
      title,
      content,
    };
    try {
      const response = await api.post("/Complain", formData);
      if (response.data.success) {
        setSuccess(response.data.message);
        setError(null);
      } else {
        setError(response.data.error);
        setSuccess(null);
      }
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.error);
      setSuccess(null);
    }
  };
  return (
    <Container breakpoint="lg">
      <Form
        className="form"
        noValidate
        validated={validated}
        checkValidity
        onSubmit={handleSubmit}
        
      >
        <Row className="mb-3">
          <h3>Complain</h3>
        </Row>
        <Row className="mb-3">
          
          <Form.Group as={Col} controlId="title">
            <Form.Label><strong>Title</strong></Form.Label>
            <span> </span>
            <Form.Control
              type="text"
              required
              minLength={3}
              maxLength={100}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="content">
            <span> </span>
            <Form.Label>Content</Form.Label>

            <Form.Control
              type="number"
              required
              minLength={3}
              maxLength={700}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          </Row>
        {error && <p className="text-danger my-2">{error}</p>}
            {success && <p className="text-success my-2">{success}</p>}
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default SendComplain;
