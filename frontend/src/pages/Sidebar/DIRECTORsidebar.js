import "./index.css";
import React, { useState } from "react";
import { Side1, Side2 } from "../Sidebar/SidebarData/Director";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import "../../Asset/Image/grayCard.png";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const DirectorSide = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="view">
      <div className="sidebar">
        <div class="d-grid">
          <button
            onClick={() => setToggle(!toggle)}
            class="btn btn-outline-secondary mb-5"
          >
            Menu
          </button>
        </div>
        <hr></hr>
        {toggle && <Side1 />}
        {!toggle && <Side2 />}
      </div>
      <div className="field">
        <div className="header">
          <Tabs
            defaultActiveKey="home"
            id="justify-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Home">
              <div className="App">
                <Container className="p-4">
                  <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                    <MDBCol>
                      <MDBCard>
                        <MDBCardImage
                          src={require("../../Asset/Image/whiteblueCard.jfif")}
                          position="top"
                        />
                        <MDBCardBody>
                          <MDBCardTitle>Post New Event</MDBCardTitle>
                        </MDBCardBody>
                        <Button variant="secondary" size="lg">
                          Go to Post
                        </Button>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol>
                      <MDBCard>
                        <MDBCardImage
                          src={require("../../Asset/Image/whiteblueCard.jfif")}
                          position="top"
                        />
                        <MDBCardBody>
                          <MDBCardTitle>Post New Anouncemnt</MDBCardTitle>
                        </MDBCardBody>
                        <Button variant="secondary" size="lg">
                          Go to Post
                        </Button>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol>
                      <MDBCard>
                        <MDBCardImage
                          src={require("../../Asset/Image/whiteblueCard.jfif")}
                          position="top"
                        />
                        <MDBCardBody>
                          <MDBCardTitle>Notification</MDBCardTitle>
                        </MDBCardBody>
                        <Button variant="secondary" size="lg">
                          See
                        </Button>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </Container>
              </div>
            </Tab>
            <Tab eventKey="event" title="Scheduled Event">
              <h2>No new Event here</h2>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default DirectorSide;
