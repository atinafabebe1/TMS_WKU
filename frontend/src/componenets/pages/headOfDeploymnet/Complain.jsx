import api from "../../../api/api";
import { Button, Modal, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Container, Card, Col } from "react-bootstrap";

const COMPLAIN_ENDPOINT = "/Complain";

const Complain = () => {
  const [complains, setComplains] = useState([]);
  const [status, setStatus] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedComplain, setSelectedComplain] = useState(null);

  const getSentComplains = async () => {
    try {
      const response = await api.get(COMPLAIN_ENDPOINT);
      setComplains(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResolve = (complain) => {
    setSelectedComplain(complain);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedComplain(null);
    setShowModal(false);
  };

  const handleResolved = () => {
    const updatedComplain = { ...selectedComplain, status: "resolved" };
    api.put(`/Complain/${selectedComplain.id}`, updatedComplain)
      .then(() => {
        setSelectedComplain(null);
        setShowModal(false);
        setStatus("resolved");
        setComplains(prevComplains =>
          prevComplains.map(complain =>
            complain.id === updatedComplain.id ? updatedComplain : complain
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  useEffect(() => {
    getSentComplains();
  }, []);

  return (
    <div>
      <div className="table-responsive p-2 my-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Complain  List</h2>
        </div>
        {isLoading && <h3>Loading...</h3>}
        {complains.map((complain) => (
          <Container className="p-4" key={complain.id} >
            <h6><strong>{complain.user}</strong></h6>
            <Col style={{width:"700px"}}>
              <Card>
                <Card.Body>
                  <Card.Title>{complain.title}</Card.Title>
                  <Card.Text>{complain.content}</Card.Text>
                  <Card.Text>{complain.status}</Card.Text>
                  <Button
                    variant="success"
                    className="btn-sm mx-2"
                    onClick={() => handleResolve(complain)}
                    disabled={complain.status === "resolved"}
                  >
                    Resolve
                  </Button>
                  <Button variant="danger" className="btn-sm">
                    Reject
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Container>
        ))}
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5><strong>Resolve Complain</strong></h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="cc">
            <span> </span>
            <Form.Label>Response Message</Form.Label>
            <Form.Control
              as={"textarea"}
              type="text"
              minLength={3}
              maxLength={700}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>

          <Button variant="success" onClick={handleResolved}>
            Resolve
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Complain;
