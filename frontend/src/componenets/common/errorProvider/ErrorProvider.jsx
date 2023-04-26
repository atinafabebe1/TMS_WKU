import React from "react";
import { Container, Alert } from "react-bootstrap";
const ErrorProvider = ({ error }) => {
  return (
    <div>
      <Container className="p-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    </div>
  );
};

export default ErrorProvider;
