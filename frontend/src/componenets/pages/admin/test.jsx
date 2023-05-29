import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ErrorProvider from "../../common/Provider/ErrorProvider";
import SuccessProvider from "../../common/Provider/SuccessProvider";
import api from "../../../api/api";

const RegisterForm = () => {
  const [vehicles, setVehicles] = useState([]);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const [succes, setSucces] = useState("");
  const [error, setError] = useState("");

  const handleClear = (event) => {
    event.preventDefault();
    setUser({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      photo: "",
    });
    setDriverinfo({
      vehiclePlateNumber: "",
      yearsOfExperience: "",
      licenses: {
        id: "",
        stateIssued: "",
      },
    });
  };

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

  const handleConfirmation = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    setShowModal(false);
    handleSubmit();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInformation = { ...user, driverinfo };
    await api
      .post("user/register", { ...userInformation })
      .then((response) => {
        if (response.success) {
          setSucces("Successfuly Registered");
          setError("");
          setIsLoading(false);
        } else {
        }
      })
      .catch((err) => {
        console.log(err.response);
        setError("Please Provide Valid Data And Try Again");
        setSucces("");
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <Form
        className="form"
        noValidate
        validated={validated}
        onSubmit={handleConfirmation}
      >
        <h2
          className="form-control-custom"
          style={{ textAlign: "center", padding: "20px" }}
        >
          Register User
        </h2>
        <hr></hr>
        <Row>
          <Form.Group as={Col} controlId="userName">
            <Form.Label className="form-control-custom">
              Username <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter username"
              name="userName"
              value={user.userName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid User Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="firstName">
            <Form.Label className="form-control-custom">
              First Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter first name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid First Name
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
              placeholder="Enter last name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Last Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="email">
            <Form.Label className="form-control-custom">
              Email address <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="Enter email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
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
              type="text"
              required
              placeholder="Enter phone number"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Phone Number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="address">
            <Form.Label className="form-control-custom">
              Address <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter address"
              name="address"
              value={user.address}
              onChange={handleChange}
            />
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
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid and Strong Password
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="role">
            <Form.Label className="form-control-custom">Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={user.role}
              onChange={handleRoleChange}
            >
              <option>Choose</option>
              <option value="ROLE_EMPLOYEE">Employee</option>
              <option value="ROLE_DIRECTOR">Director</option>
              <option value="ROLE_DRIVER">Driver</option>
              <option value="ROLE_FUELDISTRUBTOR">Fuel Distributor</option>
              <option value="ROLE_GARAGEDIRECTOR">Garage Director</option>
              <option value="ROLE_HEADOFDEPLOYMENT">Head of Deployment</option>
              <option value="ROLE_MECHANIC">Mechanic</option>
              <option value="ROLE_STORE">Store</option>
              <option value="ROLE_VICEPRESIDENT">Vice President</option>
              <option value="ROLE_GUARD">Guard</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please Select a valid Role.
            </Form.Control.Feedback>
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
                  Please select a valid Vehicle
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="yearsOfExperience">
                <Form.Label className="form-control-custom">
                  Years of Experience <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Enter years of experience"
                  name="yearsOfExperience"
                  value={driverinfo.yearsOfExperience}
                  onChange={handleDriverInfoChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a Year
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="licenses.id">
                <Form.Label className="form-control-custom">
                  Licenses Id <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter licenses ID"
                  name="id"
                  value={driverinfo.licenses.id}
                  onChange={handleDriverInfoChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid and Lisense ID
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="licenses.stateIssued">
                <Form.Label className="form-control-custom">
                  State Issued <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state issued"
                  name="stateIssued"
                  value={driverinfo.licenses.stateIssued}
                  onChange={handleDriverInfoChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid State
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </div>
        )}

        <Form.Group as={Col} controlId="photo">
          <Form.Label className="form-control-custom">Photo</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            name="photo"
            onChange={handleChange}
          />
        </Form.Group>
        {error && <ErrorProvider error={error} />}
        {succes && <SuccessProvider success={succes} />}
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
          <Button
            type="reset"
            size="sm"
            className="btn-danger me-2"
            onClick={handleClear}
          >
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
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure Register This User</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleConfirmation}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RegisterForm;
