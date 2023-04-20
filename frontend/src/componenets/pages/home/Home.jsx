import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../../common/header/Navbar";
import busImage from "../../../images/busImage.jpg";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <div className="landing-page">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto" className="login-btn">
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Login
                </Button>
              </Link>
            </Col>

            <Col md="auto">
              <h1 className="text-center">
                Welcome to WKU Transport Management System
              </h1>
              <p className="lead text-center">
                Get access to reliable and convenient transportation services.
              </p>
              <div className="text-center">
                <Button variant="primary" size="lg">
                  Explore Services
                </Button>
              </div>
            </Col>
          </Row>
          <hr className="mt-5 mb-5" />
          <Row className="services">
            <Col md={12} lg={6}>
              <h2 className="text-center">For Faculty & Staff</h2>
              <p className="text-center">
                Request transportation services for field trips and events, view
                shuttle routes and schedules, and track your shuttle in
                real-time.
              </p>
            </Col>
            <Col md={12} lg={6}>
              <h2 className="text-center">For Drivers</h2>
              <p className="text-center">
                View your assigned routes and schedules, track your shuttle in
                real-time, and communicate with dispatchers and other drivers.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="text-center">
              <Image src={busImage} alt="College bus" fluid />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={12} lg={6}>
              <h3>Reliable Transportation Services</h3>
              <p>
                Our college transport management system provides reliable and
                convenient transportation services for students, faculty, and
                staff. Whether you need a ride to class or a shuttle to an
                event, we've got you covered.
              </p>
            </Col>
            <Col md={12} lg={6}>
              <h3>Real-Time Tracking</h3>
              <p>
                With our real-time tracking system, you can track your shuttle
                and know exactly when it will arrive. No more waiting around in
                the cold or rain – our system will keep you updated every step
                of the way.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={12} lg={6}>
              <Image src={busImage} alt="College bus" fluid />
            </Col>
            <Col md={12} lg={6}>
              <h3>Convenient Scheduling</h3>
              <p>
                Our scheduling system makes it easy to request transportation
                services for field trips and events. Simply log in to our
                system, select your destination and time, and we'll take care of
                the rest.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
