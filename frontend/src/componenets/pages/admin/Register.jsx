import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import ErrorProvider from "../../common/Provider/ErrorProvider";
import SuccessProvider from "../../common/Provider/SuccessProvider";
import Loading from "../../common/Provider/LoadingProvider";
import { useNavigate } from "react-router-dom";

import api from "../../../api/api";

const RegisterForm = (data) => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    photo: "",
  });
  const [driverinfo, setDriverinfo] = useState({
    vehiclePlateNumber: "",
    yearsOfExperience: "",
    licenses: {
      id: "",
      stateIssued: "",
    },
  });
  const [succes, setSucces] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);
  const fetchVehicles = async () => {
    try {
      const response = await api.get("/VehicleRecord?select=plateNumber");
      setVehicles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRoleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    if (value === "ROLE_DRIVER") {
      setDriverinfo({
        vehiclePlateNumber: "",
        yearsOfExperience: "",
        licenses: {
          id: "",
          stateIssued: "",
        },
      });
    } else {
      setDriverinfo(null);
    }
  };
  const handleConfirmation = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    setIsLoading(true)
    setShowModal(false);
    handleSubmit();
  };
  const handleDriverInfoChange = (event) => {
    const { name, value } = event.target;
    if (name === "vehiclePlateNumber") {
      setDriverinfo((prevDriverinfo) => ({
        ...prevDriverinfo,
        [name]: value,
      }));
    } else if (name === "id" || name === "stateIssued") {
      setDriverinfo((prevDriverinfo) => ({
        ...prevDriverinfo,
        licenses: {
          ...prevDriverinfo.licenses,
          [name]: value,
        },
      }));
    } else {
      setDriverinfo((prevDriverinfo) => ({
        ...prevDriverinfo,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {

      const userInformation = { ...user, driverinfo };
      try {
        const response = await api.post("user/register", {
          ...userInformation,
        });
          setSucces("Successfuly Sent");
          setTimeout(() => {
            navigate("/admin/user"); // Navigate to the desired page after 6 seconds
          }, 6000);
          setIsLoading(false)
          setError("");
      } catch (err) {
        console.log(err.response);
        setError(err.response.data);
        setIsLoading(false)
        setSucces("Please Provide Valid Data and Try Again");
      }
  };

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-primary text-light">
              <h5 style={{ textAlign: "center" }}>User Registration Form</h5>
            </Card.Header>
            <Card.Body>
              
              <Form
                noValidate
                validated={validated}
                onSubmit={(e) => e.preventDefault()}
                className="p-4 rounded shadow-sm bg-white"
              >
                {/* <Col xs={12} md={6} lg={4}> */}

                <h6
                  className="form-control-custom"
                  style={{ textAlign: "center" }}
                >
                  Properly Fill User Information Below
                </h6>
                <hr></hr>
                <br></br>
                <Row>
                  <Form.Group as={Col} controlId="userName">
                    <Form.Label className="form-control-custom">
                      Username <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      minLength={3}
                      maxLength={20}
                      pattern="^[a-zA-Z]+$"
                      required
                      placeholder="Enter username"
                      name="userName"
                      value={user.userName}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Provide Valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="firstName">
                    <Form.Label className="form-control-custom">
                      First Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      minLength={3}
                      maxLength={20}
                      pattern="^[a-zA-Z]+$"
                      placeholder="Enter first name"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Provide Valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <br></br>
                <Row>
                  <Form.Group as={Col} controlId="lastName">
                    <Form.Label className="form-control-custom">
                      Last Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      pattern="^[a-zA-Z]+$"
                      minLength={3}
                      maxLength={20}
                      placeholder="Enter last name"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Provide Valid Name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="email">
                    <Form.Label className="form-control-custom">
                      Email address <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      required
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                      placeholder="Enter email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Provide Valid Email.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <br></br>
                <Row>
                  <Form.Group as={Col} controlId="phoneNumber">
                    <Form.Label className="form-control-custom">
                      Phone Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      required
                      placeholder="Enter phone number"
                      maxLength={13}
                      minLength={10}
                      name="phoneNumber"
                      value={user.phoneNumber}
                      onChange={handleChange}
                      pattern="[0-9]"
                      title="Please enter a 10-digit phone number"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Provide Valid Phone Number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="address">
                    <Form.Label className="form-control-custom">
                      Address <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      minLength={3}
                      maxLength={35}
                      placeholder="Enter address"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                    />{" "}
                    <Form.Control.Feedback type="invalid">
                      Please Provide Valid Address.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <br></br>
                <Row>
                  <Form.Group as={Col} controlId="password">
                    <Form.Label className="form-control-custom">
                      Password <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      required
                      placeholder="Enter password"
                      name="password"
                      value={user.password}
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$"
                      title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (@ $ ! % * ? &)"
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid password. Password must be at least
                      8 characters long and include at least one uppercase
                      letter, one lowercase letter, one digit, and one special
                      character (@ $ ! % * ? &)
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="role">
                    <Form.Label className="form-control-custom">
                      Role
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="role"
                      required
                      value={user.role}
                      onChange={handleRoleChange}
                    >
                      <option value="">Choose</option>
                      <option value="ROLE_EMPLOYEE">Employee</option>
                      <option value="ROLE_DIRECTOR">Director</option>
                      <option value="ROLE_DRIVER">Driver</option>
                      <option value="ROLE_FUELDISTRUBTOR">
                        Fuel Distributor
                      </option>
                      <option value="ROLE_GARAGEDIRECTOR">
                        Garage Director
                      </option>
                      <option value="ROLE_HEADOFDEPLOYMENT">
                        Head of Deployment
                      </option>
                      <option value="ROLE_MECHANIC">Mechanic</option>
                      <option value="ROLE_STORE">Store</option>
                      <option value="ROLE_VICEPRESIDENT">Vice President</option>
                      <option value="ROLE_GUARD">Guard</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <br></br>
                {user.role === "ROLE_DRIVER" && (
                  <div>
                    <Row>
                      <Form.Group as={Col} controlId="assignedvehicle">
                        <Form.Label className="form-control-custom">
                          Assign Vehicle
                        </Form.Label>
                        <Form.Control
                          as="select"
                          value={driverinfo.vehiclePlateNumber}
                          onChange={handleDriverInfoChange}
                          required
                          className="mb-3"
                          name="vehiclePlateNumber"
                        >
                          <option value="">Select a Vehicle</option>
                          {vehicles?.map((vehicle) => (
                            <option
                              key={vehicle.plateNumber}
                              value={vehicle.plateNumber}
                            >
                              {vehicle.plateNumber}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please Select Plate Number.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId="yearsOfExperience">
                        <Form.Label className="form-control-custom">
                          Years of Experience{" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          max={50}
                          min={0}
                          required
                          placeholder="Enter years of experience"
                          name="yearsOfExperience"
                          value={driverinfo.yearsOfExperience}
                          onChange={handleDriverInfoChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Provide Valid Year.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <br></br>
                    <Row>
                      <Form.Group as={Col} controlId="licenses.id">
                        <Form.Label className="form-control-custom">
                          Licenses Id <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          minLength={8}
                          maxLength={10}
                          placeholder="Enter licenses ID"
                          name="id"
                          value={driverinfo.licenses.id}
                          onChange={handleDriverInfoChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please Provide Valid Id.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId="licenses.stateIssued">
                        <Form.Label className="form-control-custom">
                          State Issued <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          placeholder="Enter state issued"
                          name="stateIssued"
                          required
                          value={driverinfo.licenses.stateIssued}
                          onChange={handleDriverInfoChange}
                        >
                          <option value="">Choose</option>
                          <option value="Tigray">Tigray</option>
                          <option value="Afar">Afar</option>
                          <option value="Amhara">Amhara</option>
                          <option value="Oromia">Oromia</option>
                          <option value="Somale">Somale</option>
                          <option value="SSNPR">SSNPR</option>
                          <option value="Benishangul-Gumuz">
                            Benishangul Gumuz
                          </option>
                          <option value="Gambela">Gambela</option>
                          <option value="Harari">Harari</option>
                          <option value="Sidama">Sidama</option>
                          <option value="SWPR">SWPR</option>
                          <option value="Addis-Abeba">Addis Abeba</option>
                          <option value="Dire-Dawa">Dire Dawa</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please Select state.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  </div>
                )}
                <br></br>
            
       
                <div className="d-flex justify-content-center my-4">
                  <Button
                    type="reset"
                    size="sm"
                    className="btn-secondary me-2"
                    onClick={(e) => {
                      navigate("/admin/user");
                    }}
                  >
                    Cancel
                  </Button>{" "}
                  <Button type="reset" size="sm" className="btn-danger me-2">
                    Clear
                  </Button>{" "}
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title className="form-control-custom">
                    Confirm Submission
                  </Modal.Title>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
