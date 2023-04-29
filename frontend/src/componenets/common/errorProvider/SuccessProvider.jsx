import React from "react";
import { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";
const SuccessProvider = ({ success }) => {
  const [displayError, setDisplayError] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplayError(false);
    }, 7000); // set the time (in milliseconds) for the error to display error
  }, []);
  return (
    <div>
      {displayError && (
        <Container className="p-4">
          <Alert variant="success">{success}</Alert>
        </Container>
      )}
    </div>
  );
};

export default SuccessProvider;
