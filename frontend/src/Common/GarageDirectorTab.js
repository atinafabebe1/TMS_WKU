import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const UserTab = () => {
  return (
    <div className="header">
      <Tabs defaultActiveKey="home" id="justify-tab-example" className="mb-3">
        <Tab eventKey="home" title="Home">
          <h2>Home</h2>
        </Tab>
        <Tab eventKey="event" title="Scheduled Event">
          <h2>No new Event here</h2>
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserTab;
