import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";

//material icon import
import EngineeringIcon from "@mui/icons-material/Engineering";
import EvStationSharpIcon from "@mui/icons-material/EvStationSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined";
import AssignmentIndSharpIcon from "@mui/icons-material/AssignmentIndSharp";
import AppRegistrationSharpIcon from "@mui/icons-material/AppRegistrationSharp";
import GpsFixedSharpIcon from "@mui/icons-material/GpsFixedSharp";
import DepartureBoardSharpIcon from "@mui/icons-material/DepartureBoardSharp";
import FmdBadSharpIcon from "@mui/icons-material/FmdBadSharp";
//main body icon import

const ReceiveComplain = () => {
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
            <ListGroup.Item action href="/hod/registerVehicle">
              <AppRegistrationSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/assignVehicle">
              <AssignmentIndSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/approveFuelRequest">
              <EvStationSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/approveMaintenance">
              <EngineeringIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/generateReport">
              <SummarizeSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action active href="/hod/complain">
              <FmdBadSharpIcon color="white" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/vehicleTraking">
              <GpsFixedSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/transferVehicle">
              <MoveDownOutlinedIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/scheduling">
              <DepartureBoardSharpIcon color="primary" />
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action href="/hod/registerVehicle">
              <AppRegistrationSharpIcon color="primary" />
              <span> </span>
              Register Vehicle
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/assignVehicle">
              <AssignmentIndSharpIcon color="primary" />
              <span> </span>
              Assign Vehicle
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/approveFuelRequest">
              <EvStationSharpIcon color="primary" />
              <span> </span>
              Approve Fuel Request
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/approveMaintenance">
              <EngineeringIcon color="primary" />
              <span> </span>
              Approve Maintenance
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/generateReport">
              <SummarizeSharpIcon color="primary" />
              <span> </span>
              Generate Report
            </ListGroup.Item>
            <ListGroup.Item action active href="/hod/complain">
              <FmdBadSharpIcon color="white" />
              <span> </span>
              Complain
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/vehicleTraking">
              <GpsFixedSharpIcon color="primary" />
              <span> </span>
              Vehicle Tracking
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/transferVehicle">
              <MoveDownOutlinedIcon color="primary" />
              <span> </span>
              Transfer Vehicle
            </ListGroup.Item>
            <ListGroup.Item action href="/hod/scheduling">
              <DepartureBoardSharpIcon color="primary" />
              <span> </span>
              Scheduling
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="field">
        <div className="App">
          <h4>Complain</h4>
        </div>
      </div>
    </div>
  );
};
export default ReceiveComplain;
