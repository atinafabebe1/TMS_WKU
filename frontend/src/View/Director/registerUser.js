import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
//import Nav from 'react-bootstrap/Nav';
const RegisterUser = () => {
  const [toggle, setToggle] = useState(true);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    //post Data to API

    console.log(role);
    e.preventDefault();

    const userinfo = {
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      address,
      role,
    };

    const response = await fetch("/user/register", {
      method: "POST",
      body: JSON.stringify(userinfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setAddress("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setRole("");
    }
  };

  return (
    <div className="view">
      <div className="sidebar">
        <div className="d-grid">
          <button
            onClick={() => setToggle(!toggle)}
            className="btn btn-outline-secondary mb-5"
          >
            Menu
          </button>
        </div>
        <hr></hr>
        {!toggle && (
          <ListGroup>
            <ListGroup.Item action active href="/director/manageUser">
              <ManageAccountsIcon color="white" />
            </ListGroup.Item>
            <ListGroup.Item action href="/director/generateMonthlyReport">
              <AssessmentIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/director/approvePurchesingRequest">
              <PriceCheckIcon color="primary" />
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action active href="/director/manageUser">
              <ManageAccountsIcon color="primary" />
              <span> </span>
              Manage User
            </ListGroup.Item>
            <ListGroup.Item action href="/director/generateMonthlyReport">
              <AssessmentIcon color="primary" />
              <span> </span>
              Generate Report
            </ListGroup.Item>
            <ListGroup.Item action href="/director/approvePurchesingRequest">
              <PriceCheckIcon color="white" />
              <span> </span>
              Approve Request
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="field">
        <div className="App">
          <Form
            className="form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-3" w-70>
              <h4>Detail Information</h4>
              <Form.Group size="lg" as={Col} controlId="UserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  minLength={3}
                  maxLength={35}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  minLength={3}
                  maxLength={35}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  minLength={3}
                  maxLength={35}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  required
                  minLength={10}
                  maxLength={13}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  minLength={10}
                  maxLength={13}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="Adress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  required
                  minLength={10}
                  maxLength={13}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  defaultValue="Choose..."
                >
                  <option value="ROLE_EMPLOYEE">ROLE_EMPLOYEE</option>
                  <option value="ROLE_DIRECTOR">ROLE_DIRECTOR</option>
                  <option value="ROLE_DRIVER">ROLE_DRIVER</option>
                  <option value="ROLE_FUELDISTRUBTOR">
                    ROLE_FUELDISTRUBTOR
                  </option>
                  <option value="ROLE_GARAGEDIRECTOR">
                    ROLE_GARAGEDIRECTOR
                  </option>
                  <option value="ROLE_HEADOFDEPLOYMENT">
                    ROLE_HEADOFDEPLOYMENT
                  </option>
                  <option value="ROLE_MECHANIC">ROLE_MECHANIC</option>
                  <option value="ROLE_VICEPRESIDENT">ROLE_VICEPRESIDENT</option>
                </Form.Select>
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
export default RegisterUser;
