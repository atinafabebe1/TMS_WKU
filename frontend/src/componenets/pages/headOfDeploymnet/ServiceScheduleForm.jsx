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
    departing: {
      address: "",
      time: "",
    },
    destination: {
      address: "",
      time: "",
    },
    numVehiclesRequired: 1,
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
      setSelectedVehicles([...selectedVehicles, { _id: vehicleId }]);
    } else {
      setSelectedVehicles(selectedVehicles.filter((id) => id !== vehicleId));
    }
  };

  const handleTripChange = (event, field) => {
    const { name, value } = event.target;
    const updatedTrip = { ...trips };
    if (field === "numVehiclesRequired") {
      updatedTrip[field] = event.target.value;
      setTrips(updatedTrip);
    } else {
      updatedTrip[field][name] = value;
      setTrips(updatedTrip);
    }
  };

  const handleAddTrip = () => {
    setSchedule([
      ...schedule,
      {
        departing: {
          address: trips.departing?.address,
          time: trips.departing?.time,
        },
        destination: {
          address: trips.destination?.address,
          time: trips.destination?.time,
        },
        numVehiclesRequired: trips.numVehiclesRequired,
      },
    ]);
    setTrips({
      departing: {
        address: "",
        time: "",
      },
      destination: {
        address: "",
        time: "",
      },
      numVehiclesRequired: 1,
    });
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedVehicles);
    const response = await api
      .post("/Schedule/work-day", {
        vehicles: selectedVehicles,
        trips: schedule,
      })
      .then((response) => {
        console.log(response.data.createdTrips);
        setSchedule(response.data?.createdTrips || []);
      });
  };

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-primary text-light">
              Service Schedule Form
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Select Vehicles:</Form.Label>
                  <Button
                    variant="info"
                    className="mx-2"
                    onClick={() => setShowVehicleModal(true)}
                  >
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
                  <Button
                    variant="info"
                    className="mx-2"
                    onClick={() => setShowModal(true)}
                  >
                    Add Trip
                  </Button>
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
                          name="address"
                          value={trips.departing?.address}
                          onChange={(event) =>
                            handleTripChange(event, "departing")
                          }
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Departing Time:</Form.Label>
                        <Form.Control
                          type="time"
                          placeholder="Enter departing time"
                          name="time"
                          value={trips.departing?.time}
                          onChange={(event) =>
                            handleTripChange(event, "departing")
                          }
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Destination Address:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter destination address"
                          name="address"
                          value={trips.destination?.address}
                          onChange={(event) =>
                            handleTripChange(event, "destination")
                          }
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Destination Time:</Form.Label>
                        <Form.Control
                          type="time"
                          placeholder="Enter destination time"
                          name="time"
                          value={trips.destination?.time}
                          onChange={(event) =>
                            handleTripChange(event, "destination")
                          }
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Number of Vehicles:</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number of vehicles"
                          value={trips.numVehiclesRequired}
                          min="1"
                          onChange={(event) =>
                            handleTripChange(event, "numVehiclesRequired")
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
                          <td>{trip.departing?.address}</td>
                          <td>{trip.departing?.time}</td>
                          <td>{trip.destination?.address}</td>
                          <td>{trip.destination?.time}</td>
                          <td>{trip.numVehiclesRequired}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Generate
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
