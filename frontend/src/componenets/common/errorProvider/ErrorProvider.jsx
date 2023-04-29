import React from "react";
import { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";

const ErrorProvider = ({ error }) => {
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplayError(true);
    }, 5000); // set the time (in milliseconds) for the error to display
  }, []);

  return (
    <div>
      {displayError && (
        <Container className="p-4">
          <Alert variant="danger">{error}</Alert>
        </Container>
      )}
    </div>
  );
};

export default ErrorProvider;
