import React from "react";
import { Container, Alert } from "react-bootstrap";
const SuccessProvider = ({ success }) => {
  return (
    <div>
      <Container className="p-4">
        <Alert variant="success">{success}</Alert>
      </Container>
    </div>
  );
};

export default SuccessProvider;
