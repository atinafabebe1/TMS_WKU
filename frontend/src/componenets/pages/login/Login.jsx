import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import {
  ROLE_ADMIN,
  ROLE_DIRECTOR,
  ROLE_DRIVER,
  ROLE_EMPLOYEE,
  ROLE_FUELDISTRUBTOR,
  ROLE_GARAGEDIRECTOR,
  ROLE_HEADOFDEPLOYMENT,
  ROLE_MECHANIC,
  ROLE_STORE,
  ROLE_VICEPRESIDENT,
} from "../../../constants/index";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import Joi from "joi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberMe"]);
  const { login } = useAuth();

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    rememberMe: Joi.boolean().optional(),
  });

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;

    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));

    validateField(name, inputValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      setErrorMessage(error.details[0].message);
      setSuccessMessage("");
      return;
    }
    try {
      const response = await axios.post("/user/login", { email, password });
      if (response.statusText == "OK") {
        setSuccessMessage(response.data.message);
        if (formData.rememberMe) {
          setCookie("rememberMe", "true", {
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
          });
        } else {
          removeCookie("rememberMe", { path: "/" });
        }
        const decodedToken = jwt_decode(response.data.accessToken);
        const role = decodedToken.role;
        login(response.data.accessToken);
        if (role === ROLE_ADMIN) {
          navigate("/admin");
        } else if (role === ROLE_EMPLOYEE) {
          navigate("/employee");
        } else if (role === ROLE_HEADOFDEPLOYMENT) {
          navigate("/hd");
        } else if (role === ROLE_DIRECTOR) {
          navigate("/director");
        } else if (role === ROLE_DRIVER) {
          navigate("/driver");
        } else if (role === ROLE_FUELDISTRUBTOR) {
          navigate("/fd");
        } else if (role === ROLE_GARAGEDIRECTOR) {
          navigate("/gd");
        } else if (role === ROLE_MECHANIC) {
          navigate("/mechanic");
        } else if (role === ROLE_VICEPRESIDENT) {
          navigate("/vp");
        } else if (role === ROLE_STORE) {
          navigate("/store");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      setErrorMessage("Error while loading your process");
      setSuccessMessage("");
    }
  };

  const validateField = (name, value) => {
    const fieldSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = fieldSchema.validate({ [name]: value });
    if (error) {
      setErrorMessage(error.details[0].message);
      setSuccessMessage("");
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="text-center mb-4">
            <h2>Login</h2>
          </div>
          <Form onSubmit={handleSubmit} className="p-4 rounded shadow-sm">
            <Form.Group controlId="formEmail">
              <div className="d-flex align-items-center mb-3">
                <FaEnvelope className="mr-3" />
                <Form.Label>Email Address</Form.Label>
              </div>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <div className="d-flex align-items-center mb-3">
                <FaLock className="mr-3" />
                <Form.Label>Password</Form.Label>
              </div>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="rounded"
                minLength={8}
                required
              />
              {errorMessage && (
                <p className="text-danger my-2">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-success my-2">{successMessage}</p>
              )}
              <Form.Text className="text-muted">
                <a href="/forgot" className="text-decoration-none">
                  Forgot password?
                </a>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formRememberMe" className="my-3">
              <Form.Check
                type="checkbox"
                label="Remember me"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              title="Login"
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
