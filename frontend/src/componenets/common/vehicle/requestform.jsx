import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Modal,
  FormCheck,
} from "react-bootstrap";
import api from "../../../api/api";

const VehicleRequestForm = ({ title, request, onSubmit }) => {
  const [passengers, setPassengers] = useState([{ name: "" }]);
  const [destination, setDestination] = useState("");
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [driver, setDriver] = useState("");
  const [error, setError] = useState("");
  const [success, setSucces] = useState("");

  //fetch vehicle information
  const fetch = async () => {
    api
      .get("/VehicleRecord?select=plateNumber,maxPerson,typeOfFuel")
      .then((response) => {
        setVehicles(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (request) {
      console.log(request.date);
      setPassengers(request.passengers);
      setDestination(request.destination);
      setReason(request.reason);

      if (request.date && request.date.from) {
        setFromDate(new Date(request.date.from).toISOString().substring(0, 10));
      }
      if (request.date && request.date.to) {
        setToDate(new Date(request.date.to).toISOString().substring(0, 10));
      }

      setPlateNumber(request.plateNumber);
      setDriver(request.driver);
    }
  }, [request]);

  const handlePassengerNameChange = (index, event) => {
    const newPassengers = [...passengers];
    newPassengers[index].name = event.target.value;
    setPassengers(newPassengers);
  };

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: "" }]);
  };

  const handleRemovePassenger = (index) => {
    const newPassengers = [...passengers];
    newPassengers.splice(index, 1);
    setPassengers(newPassengers);
  };
  const handleConfirmation = (event) => {
    event.preventDefault();
    setShowModal(false);
    handleSubmit();
  };

  const handleSubmit = () => {
    const result = {
      passengers,
      plateNumber,
      destination,
      reason,
      date: { from: fromDate, to: toDate },
      driver,
    };
    if (request) {
      api
        .put(`/Request/vehicle/${request._id}?isDeleted=false`, result)
        .then((response) => {
          if (response.statusText === "OK") {
            setSucces(response.data?.message);
            setError(null);
          }
          onSubmit();
        })
        .catch((err) => {
          console.log(err.response.data);
          setError(err.response.data?.error);
          setSucces(null);
        });
    } else {
      api
        .post(`/Request/vehicle?isDeleted=false`, result)
        .then((response) => {
          if (response.statusText === "OK") {
            setSucces(response.data?.message);
            setError(null);
          }
          setPassengers([{ name: "" }]);
          setDestination("");
          setReason("");
          setFromDate("");
          setToDate("");
          setPlateNumber("");
          setShowModal();
          setDriver("");
        })
        .catch((err) => {
          console.log(err.response.data);
          setError(err.response.data?.error);
          setSucces(null);
        });
    }
  };
  const handleClear = () => {
    setPlateNumber("");
    setPassengers([{ name: "" }]);
    setDestination("");
    setReason("");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-3 text-center">{title}</h1>
          {request?.rejectReason && (
            <p className="text-danger">
              Kindly be informed that your request has been rejected due to the
              reason of "{request.rejectReason}". We advise that upon
              resubmission of your request, you consider modifying the reason to
              improve your chances of approval. Thank you for your understanding
              and cooperation.
            </p>
          )}
          <Form onSubmit={handleConfirmation}>
            <FormGroup>
              <FormLabel>Vehicle</FormLabel>
              <FormControl
                as="select"
                value={plateNumber}
                onChange={(event) => setPlateNumber(event.target.value)}
                required
                className="mb-3"
              >
                <option value="">Select a Vehicle</option>
                {vehicles?.map((vehicle) => (
                  <option
                    key={vehicle.plateNumber}
                    value={vehicle.plateNumber}
                    title={`Max person load: ${vehicle.maxPerson}\nFuel type: ${vehicle.typeOfFuel}`}
                  >
                    {vehicle.plateNumber}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Driver Selection: </FormLabel>
              <div>
                {/* <FormCheck
                  type="radio"
                  id="selectDriver"
                  label="Select Driver"
                  value="selectDriver"
                  checked={driver === "selectDriver"}
                  onChange={(e) => setDriver(e.target.value)}
                /> */}
                <FormCheck
                  type="checkbox"
                  id="drive"
                  label="I will be the driver"
                  value="drive"
                  checked={driver === "drive"}
                  onChange={(e) =>
                    setDriver(e.target.checked ? e.target.value : "")
                  }
                />
              </div>
            </FormGroup>

            {passengers?.map((passenger, index) => (
              <FormGroup key={index}>
                <FormLabel>Passenger #{index + 1}</FormLabel>
                <FormControl
                  type="text"
                  value={passenger.name}
                  onChange={(event) => handlePassengerNameChange(index, event)}
                  required
                  className="mb-3"
                />
                {index !== 0 && (
                  <Button
                    variant="danger"
                    onClick={() => handleRemovePassenger(index)}
                    className="mb-3 btn-sm"
                  >
                    Remove Passenger
                  </Button>
                )}
              </FormGroup>
            ))}
            <Button
              variant="success"
              onClick={handleAddPassenger}
              className="mb-3 btn-sm"
            >
              Add Passenger
            </Button>
            <FormGroup>
              <FormLabel>Destination</FormLabel>
              <FormControl
                type="text"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                required
                className="mb-3"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Reason</FormLabel>
              <FormControl
                type="text"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                required
                className="mb-3"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Date of Use (From)</FormLabel>
              <FormControl
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                required
                className="mb-3"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Date of Use (To)</FormLabel>
              <FormControl
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
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
export default VehicleRequestForm;
