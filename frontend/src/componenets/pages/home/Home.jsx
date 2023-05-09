import React from "react";
import { Container, Row, Col, Button, Image,Nav ,Carousel} from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../../common/header/Navbar";
import busImage from "../../../images/busImage.jpg";
import calendar from "../../../images/calendar.png";
import navigator from "../../../images/navigator.png";
import Reliable from "../../../images/Reliable.png";
import Darkgray from "../../../images/Darkgray.png";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <section>
      
      <header class="top-section">
      
      <Nav className="justify-content-end" activeKey="/home">
      <Nav.Item>
        <Link class="nav-link nav-link1" to="/publschedule">  
        Schedule
          </Link>
        
      </Nav.Item>
      <Nav.Item>
        <Link class="nav-link nav-link1" to="#services">  
        Services
          </Link>
      </Nav.Item>
      <Nav.Item>
      <Link class="nav-link nav-link1" to="/login">  
            Login
          </Link>
      </Nav.Item>
    </Nav>
    <div class="head"> 
    <h1 data-aos="fade-up" class="text-center mx-auto text-md-start fs-8 fw-bold" style={{fontWeight: '900'}} >WKU Transport Management System</h1>
    <br/>
      <div data-aos="fade-up"><p className="w-75 mx-auto fs-4" >
      Welcome to WKU Transport Management System! Enjoy reliable 
      and convenient transportation services for students, faculty,
       and staff. Request transportation services for field trips 
       and events with our convenient scheduling system.
       Join us today to experience the difference!
      </p>
        </div>
    </div>
    </header>
    </section>


    <section class="second-section">
    <br/>
    <br/>
    <br/>
    <br/>
    <Row className="justify-content-md-center row row1">
    <Col sm="7" md="5" lg="5" data-aos="fade-up">
  <p>Our scheduling system makes it easy to request transportation services for 
    field trips and events. Simply log in to our system, 
    select your destination and time, and we'll take care of the rest.</p>
</Col>
      
<Col  xs="3" md="2" lg="2">
  <Image src={calendar} alt="College bus" fluid />
</Col>
    </Row>
    <br/>
    <br/>
    <Row className="justify-content-md-center row .row1">
      <Col xs="3" md="2" lg="2"  >
      <Image  src={Reliable} alt="College bus" fluid />
      </Col>
      
      <Col sm="7" md="5" lg="5" data-aos="fade-up">
      <p>Our college transport management system provides reliable and
         convenient transportation services for students, faculty, and staff.
          Whether you need a ride to class or a shuttle to
         an event, we've got you covered.</p>
      </Col>
    </Row>
    <br/>
    <br/>
    <Row className="justify-content-md-center row .row1">
      <Col sm="7" md="5" lg="5" data-aos="fade-up">
      <p>With our real-time tracking system, you can track your shuttle and know exactly when 
        it will arrive. No more waiting around in the cold or rain 
         our system will keep you updated every step of the way.</p>
      </Col>
      
      <Col xs="3" md="2" lg="2"  >
      <Image src={navigator} alt="College bus" fluid />
      </Col>
    </Row>
    <br/>
    <br/>
    <br/>
    <br/>
    </section>




    <section class="third-section" id="services">
    <br/>
    <br/>
    <Row className="justify-content-md-center third-col">
      <Col sm="18" md="11" lg="8" >
       
      <Carousel data-aos="fade-up" >
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={Darkgray}
        alt="First slide"
      />
      <Carousel.Caption className="caption">
        <h3>Reliable and Convenient Transportation Services:</h3>
        <p>The college transportation management system offers a reliable and convenient 
          transportation service that makes college life easier for everyone. From rides to class 
          to shuttles for events and field trips, we have you covered. Our system prioritizes safety, 
          comfort, and efficiency to ensure that you have a stress-free transportation experience. 
          So sit back,
           relax, and let our transportation management system take you where you need to go.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={Darkgray}
        alt="Second slide"
      />

      <Carousel.Caption className="caption">
        <h3>Real-Time Tracking of Shuttles:</h3>
        <p>Avoid the frustration of waiting for shuttles with the college 
          transportation management system's real-time tracking feature. Know 
          precisely when your shuttle will arrive, making planning your day easier 
          and preventing waiting in unfavorable weather conditions. The feature is also useful 
          for parents and guardians who want to keep track of their children's transportation.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={Darkgray}
        alt="Third slide"
      />

      <Carousel.Caption className="caption">
        <h3>Convenient Scheduling of Transportation Services:</h3>
        <p>
        The transportation management system at the college provides a hassle-free way
         to schedule transportation services for events and field trips. With a simple scheduling 
         system, you can easily select your destination and time, and let the system handle everything else. 
        Say goodbye to the stress of coordinating transportation for events!
        </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={Darkgray}
        alt="Third slide"
      />

      <Carousel.Caption className="caption">
        <h3>Request Transportation Services for Field Trips and Events:</h3>
        <p>
        The transportation management system allows faculty and staff to request 
        transportation services for field trips and events. With this feature, organizin
        g transportation for large groups is easy and stress-free. The system also provides options
         for customization,
         allowing for the selection of specific vehicles and routes.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={Darkgray}
        alt="Third slide"
      />

      <Carousel.Caption className="caption">
        <h3>Communicate with Dispatchers and Other Drivers:</h3>
        <p>
        Effective communication is key to running an efficient transportation system.
         The transportation management system provides a platform for drivers to communicate 
         with dispatchers and other drivers, allowing for real-time updates and coordination. 
         This feature is particularly useful for handling unexpected events,
         such as traffic or vehicle malfunctions.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </Col> 
    </Row>
    </section>
    </div>
  );
};

export default LandingPage;
