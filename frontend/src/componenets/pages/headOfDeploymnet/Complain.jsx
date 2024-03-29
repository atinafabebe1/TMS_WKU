import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import Loading from "../../common/Provider/LoadingProvider";
import DaysAgo from "../../common/shared/daysAgoCalculate";
import api from "../../../api/api";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
} from "mdb-react-ui-kit";
const Complain = () => {
  const [complains, setComplains] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedComplain, setSelectedComplain] = useState(null);
  const [response, setResponse] = useState("");
  const [dataCount, setDataCount] = useState(0);

  const fetchRequestData = async () => {
    await api.get(`/Complain?status=Pending`).then((response) => {
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
    setStartIndex((prevIndex) => prevIndex + 4);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };

  const handleResolve = async () => {
    const updatedComplain = {
      ...selectedComplain,
      response: response,
      status: "Resolved",
    };
    await api
      .put(`/Complain/${selectedComplain._id}`, updatedComplain)
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
      {isLoading && <Loading />}
      {!isLoading && dataCount === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div>
          <div style={{ textAlign: "center", color: "#4682B4" }}>
            <h3>Last Sent Complain</h3>
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
                    variant="success"
                    onClick={() => handleShowModal(complain)}
                  >
                    Resolve
                  </Button>
                </MDBCardBody>
                <MDBCardFooter className="text-muted">
                  <DaysAgo createdAt={complain.createdAt} />
                </MDBCardFooter>
              </MDBCard>
            </div>
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Resolve Complain</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Col}>
              <Form.Label>Response Mesage</Form.Label>
              <Form.Control
                as={"textarea"}
                type="text"
                value={response}
                onChange={(event) => setResponse(event.target.value)}
                required
                className="mb-3"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-sm"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="btn btn-sm"
            onClick={() => handleResolve(selectedComplain)}
          >
            Send Response
          </Button>
        </Modal.Footer>
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
          disabled={startIndex + 4 >= complains.length}
          block
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Complain;
