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
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleNext = () => {
    setStartIndex(prevIndex => prevIndex + 3);
  };

  const handlePrevious = () => {
    setStartIndex(prevIndex => Math.max(prevIndex - 3, 0));
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredComplains = complains.filter((complain) => {
    if (complain.user && complain.user.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    getSentComplains();
  }, []);

  return (
    <div>
      <div className="table-responsive p-2 my-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Complain List</h2>
        </div>
        <div style={{ maxWidth: '700px', width: '100%' }}>
          <input
            type="text"
            placeholder="Search by user"
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="form-control my-2"
          />
          <ul className="list-group">
            {filteredComplains.map(complain => (
              <li className="list-group-item" key={complain.id}>
                {complain.user}: {complain.message}
              </li>
            ))}
          </ul>
        </div>
        {isLoading && <h3>Loading...</h3>}
        {complains.slice(startIndex, startIndex + 3).map(complain => (
          <Container className="p-4" key={complain.id}>
            <h6><strong>{complain.user}</strong></h6>
            <Col style={{ width: "100%" }}>
              <Card>
                <Card.Body>
                  <Card.Title>Title: {complain.title}</Card.Title>
                  <Card.Text>Status: {complain.status}</Card.Text>
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
      <div className="d-flex justify-content-end align-items-center w-100">
  <Button
    variant="primary"
    className="btn-sm mx-2"
    onClick={handlePrevious}
    disabled={startIndex === 0}
    block
  >
    Previous
  </Button>
  <Button
    variant="primary"
    className="btn-sm mx-2"
    onClick={handleNext}
    disabled={startIndex + 3 >= complains.length}
    block
  >
    Next
  </Button>
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
        <Button variant="success" className="btn-sm" onClick={handleResolved}>
            Resolve
          </Button>
        <Button variant="danger" className="btn-sm">
                    Reject
                  </Button>
          <Button variant="secondary" className="btn-sm" onClick={handleModalClose}>
            Close
          </Button>

         
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Complain;
