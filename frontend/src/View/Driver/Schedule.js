import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import EvStationSharpIcon from "@mui/icons-material/EvStationSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";

const DrComplain = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="view">
      <div className="sidebar">
        <div class="d-grid">
          <button
            onClick={() => setToggle(!toggle)}
            class="btn btn btn-outline-secondary mb-5"
          >
            Menu
          </button>
        </div>
        <hr></hr>
        {!toggle && (
          <ListGroup>
            <ListGroup.Item action href="/driver/maintenanceRequest">
              <EngineeringIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/fuelRequest">
              <EvStationSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action active href="/driver/complain">
              <FmdBadSharpIcon />
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/emergencyReport">
              <SummarizeSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/Schedule">
              <DepartureBoardIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/receiveVehicle">
              <CallReceivedOutlinedIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/transferVehicle">
              <MoveDownOutlinedIcon color="primary" />
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action href="/driver/maintenanceRequest">
              <EngineeringIcon color="primary" />
              <span> </span>
              Maintenance Request
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/fuelRequest">
              <EvStationSharpIcon color="primary" />
              <span> </span>
              Fuel Request
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/complain">
              <FmdBadSharpIcon color="primary" />
              <span> </span>
              Make Complain
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/emergencyReport">
              <SummarizeSharpIcon color="primary" />
              <span> </span>
              Emergency Report
            </ListGroup.Item>
            <ListGroup.Item action active href="/driver/Schedule">
              <DepartureBoardIcon color="white" />
              <span> </span>
              Schedule
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/receiveVehicle">
              <CallReceivedOutlinedIcon color="primary" />
              <span> </span>
              Receive Vehicle
            </ListGroup.Item>
            <ListGroup.Item action href="/driver/transferVehicle">
              <MoveDownOutlinedIcon color="primary" />
              <span> </span>
              Transfer Vehicle
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="field">
        <div className="App"></div>
      </div>
    </div>
  );
};
export default DrComplain;
