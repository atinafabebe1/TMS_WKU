import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../../../api/api";

const EditUserForm = () => {
  const [user, setUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  });
  const [succes, setSucces] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/getusers?_id=${id}`);
        console.log(response.data?.data[0]);
        setUser(response.data?.data[0]);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api
      .put(`user/${id}`, user)
      .then((response) => {
        if (response.statusText === "OK") {
          setSucces(response.data?.message);
          setError(null);
        } else {
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data?.message);
        setSucces(null);
      });
  };
  return (
    <Container className="p-4 m-3">
      <Row>
        <Form onSubmit={handleSubmit} className="rounded shadow-sm">
          <Col md={{ span: 6, offset: 3 }}>
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: "Roboto",
                fontSize: "2rem",
                lineHeight: "2.5rem",
              }}
            >
              Edit User Information
            </h2>

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
              <Form.Label className="font-weight-bold">Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label className="font-weight-bold">Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={user.address}
                onChange={handleChange}
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}
            {succes && <p className="text-success">{succes}</p>}

            <Button variant="primary mb-3" type="submit" className="w-100 mt-3">
              Update
            </Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};

export default EditUserForm;
