import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import UserProfile from "./ViewProfile";

function MyComponent() {
  return (
    <div className="pages">
      <div className="App">
        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="1">View Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="2">Change Password</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="3">Personal </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="4">Edit Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="5">Add</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="1">
                  <UserProfile />
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  <ChangePassword />
                </Tab.Pane>
                <Tab.Pane eventKey="3">
                  <h3>Tab 3</h3>
                </Tab.Pane>
                <Tab.Pane eventKey="4">
                  <EditProfile />
                </Tab.Pane>
                <Tab.Pane eventKey="5">
                  <h3>Tab 5</h3>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}

export default MyComponent;
