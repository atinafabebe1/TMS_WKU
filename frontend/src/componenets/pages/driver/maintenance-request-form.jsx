import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Modal,
} from "react-bootstrap";
import api from "../../../api/api";

const MaintenanceRequestForm = () => {
  const [description, setDescription] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSucces] = useState("");
  const [kilometerOnCounter,setKilometerOncounter]=useState("");
  const fetch = async () => {};

  useEffect(() => {
    fetch();
  }, []);

  const handleConfirmation = (event) => {
    event.preventDefault();
    setShowModal(false);
    handleSubmit();
  };

  const handleSubmit = () => {
    if (!description||!plateNumber) {
      setError("Description cannot be empty");
      setSucces(null);
      return;
    }
    
    const result = {
      plateNumber,
      kilometerOnCounter,
      description,
    };
    
    api
      .post(`/Request/maintenance?isDeleted=false`, result)
      .then((response) => {
        if (response.statusText === "OK") {
          setSucces(response.data?.message);
          setError(null);
        }
  
        setDescription("");
        setPlateNumber("");
        setShowModal();
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data?.error);
        setSucces(null);
      });
  };
  
  const handleClear = () => {
    setDescription("");
    setPlateNumber("");

  };

  const handleModalClose = () => {
    
    setShowModal(false);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-5 text-center">Maintenance Requesting Form</h1>

          <Form onSubmit={handleConfirmation}>
            <FormGroup>
            <FormLabel>Plate Number</FormLabel>
              <FormControl
                type="text"
                value={plateNumber}
                onChange={(event) => setPlateNumber(event.target.value)}
                required
                className="mb-3"
              />
        <Form.Label>Kilometer Reading</Form.Label>
        <Form.Control
          type="number"
           value={kilometerOnCounter}
           onChange={(event) => setKilometerOncounter(event.target.value)}
          required
          className="mb-3"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid Amount.
        </Form.Control.Feedback>

     
              <FormLabel>Description</FormLabel>
              <FormControl
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                className="mb-3"
              />
             
            </FormGroup>

            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}

            <div className="d-flex justify-content-end my-4">
              <Button className="btn-secondary me-2">Cancel</Button>
              <Button
                type="reset"
                className="btn-danger me-2"
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                type="submit"
                className="btn-primary"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Submit
              </Button>
              
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Submission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to submit this request?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleConfirmation}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequestForm;
