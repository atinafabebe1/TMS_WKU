import React from "react";
import { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";

const ErrorProvider = ({ error }) => {
  const [displayError, setDisplayError] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplayError(false);
    }, 10000); // set the time (in milliseconds) for the error to display error
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
