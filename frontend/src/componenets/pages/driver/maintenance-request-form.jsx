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
  const [Description, setDescription] = useState("");
  const [Date, setDate] = useState("");
  const [receiver, SetReceiver] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSucces] = useState("");
  const fetch = async () => {
  
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleConfirmation = (event) => {
    event.preventDefault();
    setShowModal(false);
    handleSubmit();
  };

  const handleSubmit = () => {
    const result = {
      receiver,
      Date,
      Description,
    };
    api
      .post(`/Request/maintenance?isDeleted=false`, result)
      .then((response) => {
        if (response.statusText === "OK") {
          setSucces(response.data?.message);
          setError(null);
        }
    
        setDescription("");
        setDate("");
       
        SetReceiver("");
        setShowModal();
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data?.error);
        setSucces(null);
      });
  };
  const handleClear = () => {
    SetReceiver("");
    setDescription("");
    setDate("");
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-5 text-center">Maintenance Requesting Form</h1>

          <Form onSubmit={handleConfirmation}>
            <FormGroup>
              <FormLabel>To</FormLabel>
              <FormControl
                type="text"
                value={receiver}
                onChange={(event) => SetReceiver(event.target.value)}
                required
                className="mb-3"
              >
                {/* <option value="">Select a Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option
                    key={vehicle.plateNumber}
                    value={vehicle.plateNumber}
                    title={`Max person load: ${vehicle.maxPerson}\nFuel type: ${vehicle.typeOfFuel}`}
                  >
                    {vehicle.plateNumber}
                  </option>
                ))} */}
              </FormControl>
            </FormGroup>
        
            <FormGroup>
              <FormLabel>Description</FormLabel>
              <FormControl
                type="text"
                value={Description}
                onChange={(event) => setDescription(event.target.value)}
                required
                className="mb-3"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Date </FormLabel>
              <FormControl
                type="date"
                value={Date}
                onChange={(event) => setDate(event.target.value)}
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
                    onClick={() => setShowModal(false)}
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
