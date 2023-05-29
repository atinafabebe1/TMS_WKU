import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ErrorProvider from "../../common/Provider/ErrorProvider";
import SuccessProvider from "../../common/Provider/SuccessProvider";
import { useNavigate } from "react-router-dom";

import api from "../../../api/api";

const RegisterForm = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInformation = { ...user, driverinfo };
    await api
      .post("user/register", { ...userInformation })
      .then((response) => {
        if (response.success) {
          setSucces(response.data?.message);
          setError(null);
        } else {
        }
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data?.error);
        setSucces(null);
      });
  };

  return (
    <Container>
      <Row>
        <Form
          onSubmit={handleSubmit}
          className="p-4 rounded shadow-sm bg-white"
        >
          {/* <Col xs={12} md={6} lg={4}> */}
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-center mb-4">Register User</h2>

            <Form.Group className="mb-3" controlId="userName">
              <Form.Label className="font-weight-bold">
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label className="font-weight-bold">
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label className="font-weight-bold">
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="font-weight-bold">
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label className="font-weight-bold">
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
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label className="font-weight-bold">
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

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="font-weight-bold">
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
            </Form.Group>
            <Form.Group className="mb-3" controlId="role">
              <Form.Label className="font-weight-bold">Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={user.role}
                onChange={handleRoleChange}
              >
                <option value="ROLE_EMPLOYEE">Employee</option>
                <option value="ROLE_DIRECTOR">Director</option>
                <option value="ROLE_DRIVER">Driver</option>
                <option value="ROLE_FUELDISTRUBTOR">Fuel Distributor</option>
                <option value="ROLE_GARAGEDIRECTOR">Garage Director</option>
                <option value="ROLE_HEADOFDEPLOYMENT">
                  Head of Deployment
                </option>
                <option value="ROLE_MECHANIC">Mechanic</option>
                <option value="ROLE_STORE">Store</option>
                <option value="ROLE_VICEPRESIDENT">Vice President</option>
                <option value="ROLE_GUARD">Guard</option>
              </Form.Control>
            </Form.Group>
            {user.role === "ROLE_DRIVER" && (
              <div>
                <Form.Group className="mb-3" controlId="assignedvehicle">
                  <Form.Label>Assign Vehicle</Form.Label>
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="yearsOfExperience">
                  <Form.Label className="font-weight-bold">
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
                </Form.Group>

                <Form.Group className="mb-3" controlId="licenses.id">
                  <Form.Label className="font-weight-bold">
                    Licenses Id <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter licenses ID"
                    name="id"
                    value={driverinfo.licenses.id}
                    onChange={handleDriverInfoChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="licenses.stateIssued">
                  <Form.Label className="font-weight-bold">
                    State Issued <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter state issued"
                    name="stateIssued"
                    value={driverinfo.licenses.stateIssued}
                    onChange={handleDriverInfoChange}
                  />
                </Form.Group>
              </div>
            )}

            <Form.Group className="mb-3" controlId="photo">
              <Form.Label className="font-weight-bold">Photo</Form.Label>
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
              <Button type="reset" size="sm" className="btn-danger me-2">
                Clear
              </Button>{" "}
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};

export default RegisterForm;
