import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import Loading from "../../common/Provider/LoadingProvider";
import SuccessProvider from "../../common/Provider/SuccessProvider";
import ErrorProvider from "../../common/Provider/ErrorProvider";
import DaysAgo from "../../common/shared/daysAgoCalculate";
import { useAuth } from "../../../context/AuthContext";

import api from "../../../api/api";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
} from "mdb-react-ui-kit";
const SendComplain = () => {
  const [complains, setComplains] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedComplain, setSelectedComplain] = useState(null);
  const [response, setResponse] = useState("");
  const [dataCount, setDataCount] = useState(0);
  //const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const fetchRequestData = async () => {
    await api.get(`/Complain?user=${user.id}`).then((response) => {
      console.log(response.data.data);
      setComplains(response.data.data);
      setDataCount(response.data.data.length);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchRequestData();
  }, []);

  const handleShowModal = (complain) => {
    setSelectedComplain(complain);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedComplain(null);
    setShowModal(false);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    try {
      const response = await api.post("/Complain", {
        title,
        content,
        status: "Pending",
      });
      setIsSent(true);
      setShowModal(false);
      setTitle("");
      setContent("");
      setIsSending(false);
      setSuccess("Successfully Sent");
      setComplaints([response.data, ...complaints]); // add new complaint to the top of the list
    } catch (error) {
      console.log(error);
      setIsSending(false);
      setError("Oops Unable to Send Please Try Again");
    }
  };

  const handleResolve = async (complain) => {
    const updatedComplain = {
      ...complain,
      seen: "seen",
    };
    await api
      .put(`/Complain/${complain._id}`, updatedComplain)
      .then((response) => {
        selectedComplain(updatedComplain);
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
        setShowModal(false);
      });
    setShowModal(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-4">
      <div style={{ display: "flex" }}>
        <Col className="text-end">
          <Button
            variant="success"
            className="btn btn-sm"
            onClick={() => setShowModal(true)}
          >
            New Complaint
          </Button>
        </Col>
      </div>
      {error && <ErrorProvider error={error} />}
      {success && <SuccessProvider success={success} />}
      {isLoading && <Loading />}
      {!isLoading && dataCount === 0 ? (
        <h5 style={{ textAlign: "center", color: "#4682B4" }}>
          Oops No New complaints Response found.
        </h5>
      ) : (
        <div>
          <div style={{ textAlign: "center", color: "#4682B4" }}>
            <h3>Your Complain</h3>
          </div>
          {complains.slice(startIndex, startIndex + 4).map((complain) => (
            <div className="p-4" style={{ paddingTop: "70px" }}>
              <MDBCard alignment="center" key={complain._id}>
                <MDBCardHeader>{complain.user} </MDBCardHeader>
                <MDBCardBody>
                  <MDBCardTitle style={{ color: "#4682B4" }}>
                    {complain.title}
                  </MDBCardTitle>
                  <MDBCardText>{complain.content}</MDBCardText>
                  <MDBCardText>{complain.response}</MDBCardText>
                  <Button
                    href="#"
                    size="sm"
                    variant="success"
                    onClick={() => handleResolve(complain)}
                  >
                    Receive
                  </Button>{" "}
                </MDBCardBody>
                <MDBCardFooter className="text-muted">
                  <DaysAgo createdAt={complain.updatedAt} />
                </MDBCardFooter>
              </MDBCard>
            </div>
          ))}
        </div>
      )}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Complain</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="cc">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                minLength={3}
                maxLength={100}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="cc">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as={"textarea"}
                rows={5}
                type="text"
                minLength={3}
                maxLength={700}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={isSending}>
                {isSending ? "Sending..." : "Send"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ paddingBottom: "70px", paddingTop: "50px" }}
      >
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
          disabled={startIndex + 7 >= complains.length}
          block
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SendComplain;
