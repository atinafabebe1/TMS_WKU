import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./Sidebar/index.css";
const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="body">
      <Tabs defaultActiveKey="home" id="justify-tab-example" className="mb-3">
        <Tab eventKey="home" title="Home">
          <h2>No New Anouncement</h2>
        </Tab>
        <Tab eventKey="event" title="Event">
          <h2>No new Event here</h2>
        </Tab>

        <Tab eventKey="contact" title="Contact info">
          <div className="contact" align="right">
            <Card style={{ width: "18rem", height: "20rem" }}>
              <Card.Body>
                <Card.Title>Contact information</Card.Title>

                <Card.Text>
                  <h2>Wolkite Universiy</h2>
                  <h5>Email: wku-tms@wku.edu.et</h5>
                  <h4>Phone:-</h4>
                  <h5>+111 764 1235</h5>
                  <h5>+251 97654321</h5>
                  <h4>Website</h4>
                  <h5>www.wkutms.edu.et</h5>
                </Card.Text>
              </Card.Body>
            </Card>
            <button color="primary" onClick={handleShow}>
              See More About TMS
            </button>
          </div>
          <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>About TMS</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              This Transport Management System for Wolkite University is
              designed to provide an efficient and reliable way of managing
              transportation services for students and staff at a college. This
              system allows the college administrators to manage their
              transportation services more effectively by providing them with a
              comprehensive suite of features such as: Tracking of vehicle
              routes and stops, Scheduling of trips, Automatically calculating
              fares based on travel distance, Monitoring of driver performance
              and vehicles, Generating reports on usage and expenses, And more.
              Overall, this Transport Management System for College can help the
              institution optimize its transportation services while providing a
              convenient experience for its users.
            </Offcanvas.Body>
          </Offcanvas>
        </Tab>
      </Tabs>
    </div>
  );
};
export default Home;
