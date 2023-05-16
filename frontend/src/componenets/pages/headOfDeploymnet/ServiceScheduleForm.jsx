import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Modal, Table } from 'react-bootstrap';
import api from '../../../api/api';

function Servicescheduleform() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedPlateNumber, setSelectedPlateNumber] = useState('');
  const [trips, setTrips] = useState({
    departing: {
      address: '',
      time: ''
    },
    destination: {
      address: '',
      time: ''
    },
    numVehiclesRequired: 1
  });
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);

  useEffect(() => {
    api.get('/VehicleRecord').then((response) => {
      console.log(response);
      setVehicles(response.data?.data);
    });
  }, []);

  const handleCheckboxChange = (event) => {
    const vehicleId = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      const selectedVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
      const isPlateNumberSelected = selectedVehicles.some((vehicle) => vehicle.plateNumber === selectedVehicle?.plateNumber);

      if (!isPlateNumberSelected) {
        setSelectedVehicles([...selectedVehicles, { _id: vehicleId, plateNumber: selectedVehicle?.plateNumber }]);
      }
    } else {
      setSelectedVehicles(selectedVehicles.filter((vehicle) => vehicle._id !== vehicleId));
    }
  };
  const handleSelectedPlateNumberChange = (event, vehicleId) => {
    const updatedPlateNumber = event.target.value;
    const updatedSelectedVehicles = selectedVehicles.map((vehicle) => {
      if (vehicle._id === vehicleId) {
        return { ...vehicle, plateNumber: updatedPlateNumber };
      }
      return vehicle;
    });
    setSelectedVehicles(updatedSelectedVehicles);
  };
  const handleDeleteSelectedVehicle = (vehicleId) => {
    const updatedSelectedVehicles = selectedVehicles.filter((vehicle) => vehicle._id !== vehicleId);
    setSelectedVehicles(updatedSelectedVehicles);
  };

  const handleTripChange = (event, field) => {
    const { name, value } = event.target;
    const updatedTrip = { ...trips };
    if (field === 'numVehiclesRequired') {
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
          time: trips.departing?.time
        },
        destination: {
          address: trips.destination?.address,
          time: trips.destination?.time
        },
        numVehiclesRequired: trips.numVehiclesRequired
      }
    ]);
    setTrips({
      departing: {
        address: '',
        time: ''
      },
      destination: {
        address: '',
        time: ''
      },
      numVehiclesRequired: 1
    });
    setShowModal(false);
  };

  const handleEditTrip = (index) => {
    setEditRowIndex(index);
    const trip = schedule[index];
    setTrips({
      departing: {
        address: trip.departing?.address,
        time: trip.departing?.time
      },
      destination: {
        address: trip.destination?.address,
        time: trip.destination?.time
      },
      numVehiclesRequired: trip.numVehiclesRequired
    });
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    const updatedSchedule = [...schedule];
    updatedSchedule[editRowIndex] = {
      departing: {
        address: trips.departing?.address,
        time: trips.departing?.time
      },
      destination: {
        address: trips.destination?.address,
        time: trips.destination?.time
      },
      numVehiclesRequired: trips.numVehiclesRequired
    };
    setSchedule(updatedSchedule);
    setEditRowIndex(null);
    setShowModal(false);
  };

  const handleDeleteTrip = (index) => {
    const updatedSchedule = [...schedule];
    updatedSchedule.splice(index, 1);
    setSchedule(updatedSchedule);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedVehicles);
    const response = await api
      .post('/Schedule/work-day', {
        vehicles: selectedVehicles,
        trips: schedule
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
            <Card.Header className="bg-primary text-light">Service Schedule Form</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Select Vehicles:</Form.Label>
                  <Button variant="info" className="mx-2" onClick={() => setShowVehicleModal(true)}>
                    Choose Vehicles
                  </Button>
                  <Modal show={showVehicleModal} onHide={() => setShowVehicleModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Select Vehicles</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {vehicles.map((vehicle) => {
                        const isChecked = selectedVehicles.some((selectedVehicle) => selectedVehicle.plateNumber === vehicle.plateNumber);

                        return (
                          <Form.Check
                            key={vehicle.id}
                            type="checkbox"
                            id={`vehicle-${vehicle.id}`}
                            label={vehicle.plateNumber}
                            name={vehicle.id}
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                        );
                      })}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowVehicleModal(false)}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={() => setShowVehicleModal(false)}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {selectedVehicles.length > 0 && (
                    <div className="mt-2">
                      <strong>Selected Vehicles:</strong>
                      <ul>
                        {selectedVehicles.map((vehicle) => (
                          <li key={vehicle._id}>
                            <input
                              type="text"
                              value={vehicle.plateNumber}
                              onChange={(event) => handleSelectedPlateNumberChange(event, vehicle._id)}
                            />
                            <button onClick={() => handleDeleteSelectedVehicle(vehicle._id)}>Delete</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Add Trips:</Form.Label>
                  <Button variant="info" className="mx-2" onClick={() => setShowModal(true)}>
                    Add Trip
                  </Button>
                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>{editRowIndex !== null ? 'Edit Trip' : 'Add Trip'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Group>
                        <Form.Label>Departing Address:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter departing address"
                          name="address"
                          value={trips.departing?.address}
                          onChange={(event) => handleTripChange(event, 'departing')}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Departing Time:</Form.Label>
                        <Form.Control
                          type="time"
                          placeholder="Enter departing time"
                          name="time"
                          value={trips.departing?.time}
                          onChange={(event) => handleTripChange(event, 'departing')}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Destination Address:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter destination address"
                          name="address"
                          value={trips.destination?.address}
                          onChange={(event) => handleTripChange(event, 'destination')}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Destination Time:</Form.Label>
                        <Form.Control
                          type="time"
                          placeholder="Enter destination time"
                          name="time"
                          value={trips.destination?.time}
                          onChange={(event) => handleTripChange(event, 'destination')}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Number of Vehicles:</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number of vehicles"
                          value={trips.numVehiclesRequired}
                          min="1"
                          onChange={(event) => handleTripChange(event, 'numVehiclesRequired')}
                        />
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                      </Button>
                      {editRowIndex !== null ? (
                        <Button variant="primary" onClick={handleSaveEdit}>
                          Save
                        </Button>
                      ) : (
                        <Button variant="primary" onClick={handleAddTrip}>
                          Add
                        </Button>
                      )}
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
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((trip, index) => (
                        <tr key={index}>
                          <td>
                            {editRowIndex === index ? (
                              <Form.Control
                                type="text"
                                value={trips.departing?.address}
                                name="address"
                                onChange={(event) => handleTripChange(event, 'departing')}
                              />
                            ) : (
                              trip.departing?.address
                            )}
                          </td>
                          <td>
                            {editRowIndex === index ? (
                              <Form.Control
                                type="time"
                                value={trips.departing?.time}
                                name="time"
                                onChange={(event) => handleTripChange(event, 'departing')}
                              />
                            ) : (
                              trip.departing?.time
                            )}
                          </td>
                          <td>
                            {editRowIndex === index ? (
                              <Form.Control
                                type="text"
                                value={trips.destination?.address}
                                name="address"
                                onChange={(event) => handleTripChange(event, 'destination')}
                              />
                            ) : (
                              trip.destination?.address
                            )}
                          </td>
                          <td>
                            {editRowIndex === index ? (
                              <Form.Control
                                type="time"
                                value={trips.destination?.time}
                                name="time"
                                onChange={(event) => handleTripChange(event, 'destination')}
                              />
                            ) : (
                              trip.destination?.time
                            )}
                          </td>
                          <td>
                            {editRowIndex === index ? (
                              <Form.Control
                                type="number"
                                value={trips.numVehiclesRequired}
                                min="1"
                                onChange={(event) => handleTripChange(event, 'numVehiclesRequired')}
                              />
                            ) : (
                              trip.numVehiclesRequired
                            )}
                          </td>
                          <td>
                            {editRowIndex === index ? (
                              <>
                                <Button variant="success" className="mr-2" onClick={handleSaveEdit}>
                                  Save
                                </Button>
                                <Button variant="secondary" onClick={() => setEditRowIndex(null)}>
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button variant="primary" className="mr-2" onClick={() => handleEditTrip(index)}>
                                  Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteTrip(index)}>
                                  Delete
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
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
