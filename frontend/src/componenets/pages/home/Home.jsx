import React from 'react';
import { Container, Row, Col, Button, Image, Nav, Carousel, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import busImage from '../../../images/busImage.jpg';
import calendar from '../../../images/calendar.png';
import navigator from '../../../images/navigator.png';
import Reliable from '../../../images/Reliable.png';
import Darkgray from '../../../images/Darkgray.png';
import PublicNavbar from './PublicNavbar';

const LandingPage = () => {
  return (
    <div>
      <PublicNavbar />
      <section>
        <Container className="py-5">
          <Row>
            <Col md={6}>
              <h1 className="text-center text-md-start fs-8 fw-bold mb-4" style={{ fontWeight: '900', color: '#333' }}>
                WKU Transport Management System
              </h1>
              <p className="fs-4 text-muted">
                Welcome to WKU Transport Management System! Enjoy reliable and convenient transportation services for students, faculty, and staff.
                Request transportation services for field trips and events with our convenient scheduling system. Join us today to experience the
                difference!
              </p>
            </Col>
            <Col md={6}>
              <Image src={busImage} alt="College bus" fluid rounded />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-light py-5">
        <Container>
          <Row className="justify-content-md-center mb-5">
            <Col sm={7} md={5} lg={5} data-aos="fade-up">
              <p className="text-muted">
                Our scheduling system makes it easy to request transportation services for field trips and events. Simply log in to our system, select
                your destination and time, and we'll take care of the rest.
              </p>
            </Col>

            <Col xs={3} md={2} lg={2}>
              <Image src={calendar} alt="Calendar" fluid className="icon" />
            </Col>
          </Row>

          <Row className="justify-content-md-center mb-5">
            <Col xs={3} md={2} lg={2}>
              <Image src={Reliable} alt="Reliable" fluid className="icon" />
            </Col>

            <Col sm={7} md={5} lg={5} data-aos="fade-up">
              <p className="text-muted">
                Our college transport management system provides reliable and convenient transportation services for students, faculty, and staff.
                Whether you need a ride to class or a shuttle to an event, we've got you covered.
              </p>
            </Col>
          </Row>

          <Row className="justify-content-md-center mb-5">
            <Col sm={7} md={5} lg={5} data-aos="fade-up">
              <p className="text-muted">
                With our real-time tracking system, you can track your shuttle and know exactly when it will arrive. No more waiting around in the
                cold or rain – our system will keep you updated every step of the way.
              </p>
            </Col>

            <Col xs={3} md={2} lg={2}>
              <Image src={navigator} alt="Navigator" fluid className="icon" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" id="services">
        <Container>
          <Row className="justify-content-md-center mb-5">
            <Col md={11} lg={8}>
              <Carousel fade>
                <Carousel.Item>
                  <img className="d-block w-100" src={Darkgray} alt="First slide" />
                  <Carousel.Caption className="caption">
                    <h3 className="text-white">Reliable and Convenient Transportation Services:</h3>
                    <p className="text-white">
                      The college transportation management system offers a reliable and convenient transportation service that makes college life
                      easier for everyone. From rides to class to shuttles for events and field trips, we have you covered. Our system prioritizes
                      safety, comfort, and efficiency to ensure that you have a stress-free transportation experience. So sit back, relax, and let our
                      transportation management system take you where you need to go.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={Darkgray} alt="Second slide" />
                  <Carousel.Caption className="caption">
                    <h3 className="text-white">Real-Time Tracking of Shuttles:</h3>
                    <p className="text-white">
                      Avoid the frustration of waiting for shuttles with the college transportation management system's real-time tracking feature.
                      Know precisely when your shuttle will arrive, making planning your day easier and preventing waiting in unfavorable weather
                      conditions. The feature is also useful for parents and guardians who want to keep track of their children's transportation.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={Darkgray} alt="Third slide" />
                  <Carousel.Caption className="caption">
                    <h3 className="text-white">Convenient Scheduling of Transportation Services:</h3>
                    <p className="text-white">
                      The transportation management system at the college provides a hassle-free way to schedule transportation services for events
                      and field trips. With a simple scheduling system, you can easily select your destination and time, and let the system handle
                      everything else. Say goodbye to the stress of coordinating transportation for events!
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={Darkgray} alt="Fourth slide" />
                  <Carousel.Caption className="caption">
                    <h3 className="text-white">Request Transportation Services for Field Trips and Events:</h3>
                    <p className="text-white">
                      The transportation management system allows faculty and staff to request transportation services for field trips and events.
                      With this feature, organizing transportation for large groups is easy and stress-free. The system also provides options for
                      customization, allowing for the selection of specific vehicles and routes.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={Darkgray} alt="Fifth slide" />
                  <Carousel.Caption className="caption">
                    <h3 className="text-white">Communicate with Dispatchers and Other Drivers:</h3>
                    <p className="text-white">
                      Effective communication is key to running an efficient transportation system. The transportation management system provides a
                      platform for drivers to communicate with dispatchers and other drivers, allowing for real-time updates and coordination. This
                      feature is particularly useful for handling unexpected events, such as traffic or vehicle malfunctions.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;
