import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";

const EmergencyReport = () => {
  const [toggle, setToggle] = useState(true);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [dateofDanger, setDateofDanger] = useState("");
  const [timeofDanger, setTimeofDanger] = useState("");
  const [type, setType] = useState("");
  const [properties, setProperties] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [insurance, setInsurance] = useState("");
  const [injuries, setInjuries] = useState("");
  const [death, setDeath] = useState("");
  const [damagedProperties, setDamagedProperties] = useState("");
  const [witnessName, setWitnessName] = useState("");
  const [witnessAddress, setWitnessAddress] = useState("");
  const [peopleinDangerZone, setPeopleinDangerZone] = useState("");
  const [trafficName, setTrafficName] = useState("");
  const [trafficSite, setTrafficSite] = useState("");
  const [trafficaddress, setTrafficaddress] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    //Post request
  };

  const [fields, setFields] = useState([
    {
      id: 1,
      witnessName: "",
      witnessAdress: "",
    },
  ]);
  const handleChangeInput = (i, e) => {
    console.log(e.target.value);
    const values = [...fields];
    values[i][e.target.name] = e.target.value;
    setFields(values);
  };
  const handleAdd = (id) => {
    setFields([...fields, { id: id + 2, witnessName: "", witnessAdress: "" }]);
  };
  const handleSubtract = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    setFields([...values]);
  };

  return (
    <div className="p-4">
      <div style={{ padding: "50px" }}>
        <div className="App">
          <Form
            className="form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-3" w-70>
              <h4>Fill Below Fields to Report Emergency</h4>
            </Row>
            <Row className="mb-3">
              <hr />

              <Form.Group size="lg" as={Col} controlId="driver">
                <Form.Label>Driver</Form.Label>
                <Form.Control
                  type="name"
                  minLength={3}
                  maxLength={35}
                  required
                  validated={validated}
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Driver.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="vehicle">
                <Form.Label>Vehicle</Form.Label>
                <Form.Control
                  type="id"
                  minLength={3}
                  maxLength={35}
                  required
                  validated={validated}
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Vehicle.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="plateNumber">
                <Form.Label>Plate Number</Form.Label>
                <Form.Control
                  type="name"
                  minLength={7}
                  maxLength={12}
                  required
                  validated={validated}
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Plate Number.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="date">
                <Form.Label>Date of Danger</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date of Danger"
                  required
                  validated={validated}
                  value={dateofDanger}
                  onChange={(e) => setDateofDanger(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="date">
                <Form.Label>Time of Danger</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Time of Danger"
                  required
                  validated={validated}
                  value={timeofDanger}
                  onChange={(e) => setTimeofDanger(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="type">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="name"
                  required
                  validated={validated}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Type.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="Properties">
                <Form.Label>Properties</Form.Label>
                <Form.Control
                  type="name"
                  minLength={3}
                  maxLength={65}
                  required
                  validated={validated}
                  value={properties}
                  onChange={(e) => setProperties(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Properties.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="date">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="name"
                  minLength={3}
                  maxLength={35}
                  required
                  validated={validated}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Address.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="type">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  minLength={10}
                  maxLength={13}
                  required
                  validated={validated}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Phone Number.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="drivername">
                <Form.Label>Driver name</Form.Label>
                <Form.Control
                  type="name"
                  minLength={3}
                  maxLength={35}
                  required
                  validated={validated}
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="insurance">
                <Form.Label>Insurance</Form.Label>
                <Form.Control
                  type="name"
                  required
                  validated={validated}
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Data.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <h6>Damage caused by accident</h6>
              <hr></hr>
              <Form.Group as={Col} controlId="Injuries">
                <Form.Label>Injuries</Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0}
                  max={80}
                  validated={validated}
                  value={injuries}
                  onChange={(e) => setInjuries(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Number of Injuries.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="date">
                <Form.Label>Death</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  max={100}
                  required
                  validated={validated}
                  value={death}
                  onChange={(e) => setDeath(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Number of Death.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="damagedproperties">
                <Form.Label>Damaged Properties</Form.Label>
                <Form.Control
                  type="text"
                  minLength={3}
                  maxLength={35}
                  required
                  validated={validated}
                  value={damagedProperties}
                  onChange={(e) => setDamagedProperties(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid name Of Dammaged Properties.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <h6>Witness and People in Danger Zone Information</h6>
              <hr></hr>
              <Form.Group controlId="witnessname">
                {fields.map((field, i) => (
                  <div key={field.id}>
                    <Row className="mt-5">
                      <Col md>
                        <Form.Label>Witness {i + 1} Name </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          minLength={3}
                          maxLength={35}
                          validated={validated}
                          value={field.witnessName}
                          onChange={(e) => handleChangeInput(i, e)}
                        />
                      </Col>
                      <Col md>
                        <Form.Label>Witness {i + 1} Adress</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          minLength={3}
                          maxLength={35}
                          validated={validated}
                          value={field.witnessAdress}
                          onChange={(e) => handleChangeInput(i, e)}
                        />
                      </Col>
                      <Col>
                        <Button
                          className="mt-4 mr-5"
                          required
                          validated={validated}
                          onClick={() => handleAdd(i)}
                        >
                          Add
                        </Button>
                        <span> </span>
                        <Button
                          className="mt-4"
                          disabled={field.id === 1}
                          onClick={() => handleSubtract(i)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Form.Group>

              <Form.Group as={Col} controlId="witnessadress"></Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="peopleindangerzone">
                <Form.Label>People in Danger Zone</Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={3}
                  maxLength={35}
                  validated={validated}
                  value={peopleinDangerZone}
                  onChange={(e) => setPeopleinDangerZone(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid People in Danger Zone.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <h6>Traffic Information</h6>
              <hr></hr>
              <Form.Group as={Col} controlId="trafficName">
                <Form.Label>Traffic Name</Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={3}
                  maxLength={35}
                  validated={validated}
                  value={trafficName}
                  onChange={(e) => setTrafficName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Traffic Name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="trafficSite">
                <Form.Label>Traffic Site</Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={3}
                  maxLength={35}
                  validated={validated}
                  value={trafficSite}
                  onChange={(e) => setTrafficSite(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Traffic Site.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="trafficaddress">
                <Form.Label>Traffic Address</Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={3}
                  maxLength={35}
                  validated={validated}
                  value={trafficaddress}
                  onChange={(e) => setTrafficaddress(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Traffic Address!
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default EmergencyReport;
