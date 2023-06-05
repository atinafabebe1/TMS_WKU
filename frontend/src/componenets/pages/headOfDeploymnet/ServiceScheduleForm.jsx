import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Modal, Table, ListGroup, FormControl, Spinner } from 'react-bootstrap';
import api from '../../../api/api';
import { useNavigate } from 'react-router-dom';

function Servicescheduleform() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedPlateNumber, setSelectedPlateNumber] = useState('');
  const [error, setError] = useState('');
  const [scheduleerror, setScheduleError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    api.get('/VehicleRecord/?type=Bus').then((response) => {
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
    const { departing, destination } = trips;

    if (departing.time >= destination.time) {
      setError("Departing time can't be greater than or equal to the destination time.");
      return;
    }

    setSchedule([
      ...schedule,
      {
        departing: {
          address: departing?.address,
          time: departing?.time
        },
        destination: {
          address: destination?.address,
          time: destination?.time
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
    setError('');
    setShowModal(false);
  };

  const handleEditTrip = (index) => {
    const { departing, destination, numVehiclesRequired } = schedule[index];
    setTrips({
      departing: {
        address: departing.address,
        time: departing.time
      },
      destination: {
        address: destination.address,
        time: destination.time
      },
      numVehiclesRequired
    });
    setEditRowIndex(index);
    setShowModal(true);
  };

  const handleUpdateTrip = () => {
    const { departing, destination, numVehiclesRequired } = trips;
    const updatedSchedule = [...schedule];
    updatedSchedule[editRowIndex] = {
      departing: {
        address: departing.address,
        time: departing.time
      },
      destination: {
        address: destination.address,
        time: destination.time
      },
      numVehiclesRequired
    };
    setSchedule(updatedSchedule);
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
    setEditRowIndex(null);
    setShowModal(false);
  };

  const handleDeleteTrip = (index) => {
    const updatedSchedule = [...schedule];
    updatedSchedule.splice(index, 1);
    setSchedule(updatedSchedule);
  };

  const handleSaveSchedule = () => {
    setLoading(true);
    // Prepare the data for the API request
    const requestData = {
      vehicles: selectedVehicles.map((vehicle) => ({ _id: vehicle._id, plateNumber: vehicle.plateNumber })),
      trips: schedule.map((trip) => ({
        departing: {
          address: trip.departing.address,
          time: trip.departing.time
        },
        destination: {
          address: trip.destination.address,
          time: trip.destination.time
        },
        numVehiclesRequired: trip.numVehiclesRequired.toString() // Convert to string
      }))
    };

    // Send the requestData to the API endpoint
    // Replace the 'apiEndpoint' with your actual API endpoint
    api
      .post('/schedule/work-day', requestData)
      .then((response) => {
        console.log('Schedule saved successfully', response.data);
        setLoading(false);
        navigate('/hd/schedule/workday');
        // Handle success response from the API
        // Add your desired logic here
      })
      .catch((error) => {
        console.error('Error saving schedule', error);
        setScheduleError(error);
        // Handle error response from the API
        // Add your desired logic here
      })
      .finally(() => {
        setLoading(false); // Stop loading spinner
      });
  };

  return (
    <Container>
      <h2 className="text-center my-3">Service Schedule Form</h2>
      <Row>
        <Col className="col-3">
          <Card>
            <Card.Header>Selected Vehicles</Card.Header>
            <Card.Body>
              {selectedVehicles.length === 0 ? (
                <p>No vehicles selected.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Plate Number</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedVehicles.map((vehicle) => (
                      <tr key={vehicle._id}>
                        <td>
                          <FormControl
                            type="text"
                            name={vehicle._id}
                            value={vehicle.plateNumber}
                            onChange={(event) => handleSelectedPlateNumberChange(event, vehicle._id)}
                          />
                        </td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => handleDeleteSelectedVehicle(vehicle._id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <Button variant="primary btn btn-sm" onClick={() => setShowVehicleModal(true)}>
                Add Vehicle
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>Schedule Trips</Card.Header>
            <Card.Body>
              {schedule.length === 0 ? (
                <p>No trips scheduled.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Departing Address</th>
                      <th>Departing Time</th>
                      <th>Destination Address</th>
                      <th>Destination Time</th>
                      <th>Number of Vehicles Required</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((trip, index) => (
                      <tr key={index}>
                        <td>{trip.departing.address}</td>
                        <td>
                          {trip.departing.time} {trip.departing.time >= 12 ? 'PM' : 'AM'}
                        </td>
                        <td>{trip.destination.address}</td>
                        <td>
                          {trip.destination.time} {trip.destination.time >= 12 ? 'PM' : 'AM'}
                        </td>
                        <td>{trip.numVehiclesRequired}</td>
                        <td>
                          <Button variant="warning" size="sm" onClick={() => handleEditTrip(index)}>
                            Edit
                          </Button>{' '}
                          <Button variant="danger" size="sm" onClick={() => handleDeleteTrip(index)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <Button variant="primary btn btn-sm" onClick={() => setShowModal(true)}>
                Add Trip
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Vehicle Modal */}
      <Modal show={showVehicleModal} onHide={() => setShowVehicleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {vehicles.map((vehicle) => (
              <ListGroup.Item key={vehicle._id}>
                <Form.Check
                  type="checkbox"
                  label={vehicle.plateNumber}
                  name={vehicle._id}
                  checked={selectedVehicles.some((selectedVehicle) => selectedVehicle._id === vehicle._id)}
                  onChange={handleCheckboxChange}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
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

      {/* Trip Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editRowIndex !== null ? 'Edit Trip' : 'Add Trip'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="departingAddress">
              <Form.Label>Departing Address</Form.Label>
              <Form.Control type="text" name="address" value={trips.departing.address} onChange={(event) => handleTripChange(event, 'departing')} />
            </Form.Group>
            <Form.Group controlId="departingTime">
              <Form.Label>Departing Time</Form.Label>
              <Form.Control type="time" name="time" value={trips.departing.time} onChange={(event) => handleTripChange(event, 'departing')} />
            </Form.Group>
            <Form.Group controlId="destinationAddress">
              <Form.Label>Destination Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={trips.destination.address}
                onChange={(event) => handleTripChange(event, 'destination')}
              />
            </Form.Group>
            <Form.Group controlId="destinationTime">
              <Form.Label>Destination Time</Form.Label>
              <Form.Control type="time" name="time" value={trips.destination.time} onChange={(event) => handleTripChange(event, 'destination')} />
            </Form.Group>
            <Form.Group controlId="numVehiclesRequired">
              <Form.Label>Number of Vehicles Required</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={trips.numVehiclesRequired}
                onChange={(event) => handleTripChange(event, 'numVehiclesRequired')}
              />
            </Form.Group>
          </Form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          {editRowIndex !== null ? (
            <Button variant="primary" onClick={handleUpdateTrip}>
              Update Trip
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAddTrip}>
              Add Trip
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {scheduleerror && (
        <div className="my-3">
          <p className="text-danger">{scheduleerror.response.data.error}</p>
        </div>
      )}
      <Button className="my-3" variant="success" onClick={handleSaveSchedule}>
        {loading ? (
          <>
            <Spinner animation="border" size="sm" /> Generating Schedule...
          </>
        ) : (
          'Generate Schedule'
        )}
      </Button>
    </Container>
  );
}

export default Servicescheduleform;
