import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal,
  Table,
} from "react-bootstrap";
import api from "../../../api/api";

function Servicescheduleform() {
  const [vehicles, setVehicles] = useState([]);
  const [trips, setTrips] = useState({
    departingAddress: "",
    departingTime: "",
    destinationAddress: "",
    destinationTime: "",
    numberOfVehicles: 1,
  });
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get("/VehicleRecord").then((response) => {
      console.log(response);
      setVehicles(response.data?.data);
    });
  }, []);

  const handleCheckboxChange = (event) => {
    const vehicleId = event.target.name;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedVehicles([...selectedVehicles, vehicleId]);
    } else {
      setSelectedVehicles(selectedVehicles.filter((id) => id !== vehicleId));
    }
  };

  const handleTripChange = (event, field) => {
    const updatedTrip = { ...trips };
    updatedTrip[field] = event.target.value;
    setTrips(updatedTrip);
  };

  const handleAddTrip = () => {
    setSchedule([
      ...schedule,
      {
        departingAddress: trips.departingAddress,
        departingTime: trips.departingTime,
        destinationAddress: trips.destinationAddress,
        destinationTime: trips.destinationTime,
        numberOfVehicles: trips.numberOfVehicles,
      },
    ]);
    setTrips({
      departingAddress: "",
      departingTime: "",
      destinationAddress: "",
      destinationTime: "",
      numberOfVehicles: 1,
    });
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await api
      .post("/Schedule/work-day", {
        vehicles: selectedVehicles,
        trips: schedule,
      })
      .then((response) => {
        console.log(response);
        setSchedule(response.data);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>Service Schedule Form</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Select Vehicles:</Form.Label>
                  <Button onClick={() => setShowVehicleModal(true)}>
                    Choose Vehicles
                  </Button>
                  <Modal
                    show={showVehicleModal}
                    onHide={() => setShowVehicleModal(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Select Vehicles</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {vehicles.map((vehicle) => (
                        <Form.Check
                          key={vehicle.id}
                          type="checkbox"
                          id={`vehicle-${vehicle.id}`}
                          label={`${vehicle.plateNumber}`}
                          name={vehicle.id}
                          onChange={handleCheckboxChange}
                        />
                      ))}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowVehicleModal(false)}
                      >
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => setShowVehicleModal(false)}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Add Trips:</Form.Label>
                  <Button onClick={() => setShowModal(true)}>Add Trip</Button>
                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Trip</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Group>
                        <Form.Label>Departing Address:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter departing address"
                          value={trips.departingAddress}
                          onChange={(event) =>
                            handleTripChange(event, "departingAddress")
                          }
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Departing Time:</Form.Label>
                        <Form.Control
                          type="time"
                          placeholder="Enter departing time"
                          value={trips.departingTime}
                          onChange={(event) =>
                            handleTripChange(event, "departingTime")
                          }
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Destination Address:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter destination address"
                          value={trips.destinationAddress}
                          onChange={(event) =>
                            handleTripChange(event, "destinationAddress")
                          }
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Destination Time:</Form.Label>
                        <Form.Control
                          type="time"
                          placeholder="Enter destination time"
                          value={trips.destinationTime}
                          onChange={(event) =>
                            handleTripChange(event, "destinationTime")
                          }
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Number of Vehicles:</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number of vehicles"
                          value={trips.numberOfVehicles}
                          onChange={(event) =>
                            handleTripChange(event, "numberOfVehicles")
                          }
                        />
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleAddTrip}>
                        Add
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Departing Address</th>
                        <th>Departing Time</th>
                        <th>Destination Address</th>
                        <th>Destination Time</th>
                        <th>Number of Vehicles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((trip, index) => (
                        <tr key={index}>
                          <td>{trip.departingAddress}</td>
                          <td>{trip.departingTime}</td>
                          <td>{trip.destinationAddress}</td>
                          <td>{trip.destinationTime}</td>
                          <td>{trip.numberOfVehicles}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Servicescheduleform;
