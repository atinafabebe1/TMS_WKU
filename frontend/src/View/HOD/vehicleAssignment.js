import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MDBContainer } from "mdb-react-ui-kit";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
//body material ui icon import
import PriceChangeSharpIcon from "@mui/icons-material/PriceChangeSharp";
import DateRangeSharpIcon from "@mui/icons-material/DateRangeSharp";
import LocalGasStationSharpIcon from "@mui/icons-material/LocalGasStationSharp";
import ElectricCarSharpIcon from "@mui/icons-material/ElectricCarSharp";
import PinSharpIcon from "@mui/icons-material/PinSharp";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import AddPhotoAlternateSharpIcon from "@mui/icons-material/AddPhotoAlternateSharp";
import NoCrashSharpIcon from "@mui/icons-material/NoCrashSharp";
import HourglassTopSharpIcon from "@mui/icons-material/HourglassTopSharp";
import WifiProtectedSetupRoundedIcon from "@mui/icons-material/WifiProtectedSetupRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import CommuteRoundedIcon from "@mui/icons-material/CommuteRounded";
import SubwayRoundedIcon from "@mui/icons-material/SubwayRounded";
import SubtitlesRoundedIcon from "@mui/icons-material/SubtitlesRounded";
const AssignVehicle = () => {
  const [toggle, setToggle] = useState(true);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
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
            <ListGroup.Item action active href="/hod/assignVehicle">
              <AssignmentIndSharpIcon color="white" />
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
            <ListGroup.Item action href="/hod/complain">
              <FmdBadSharpIcon color="primary" />
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
            <ListGroup.Item action active href="/hod/assignVehicle">
              <AssignmentIndSharpIcon color="white" />
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
            <ListGroup.Item action href="/hod/complain">
              <FmdBadSharpIcon color="primary" />
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
          <MDBContainer breakpoint="lg">
            <Form
              className="form"
              noValidate
              validated={validated}
              checkValidity
              onSubmit={handleSubmit}
            >
              <Row className="mb-3">
                <h3>Vehicle Assignment Form</h3>
              </Row>
              <Row className="mb-3">
                <h5>Vehicle Information</h5>
                <hr></hr>
                <br></br>
                <Form.Group
                  as={Col}
                  controlId="modelnumber"
                  className="col col-sm-6"
                >
                  <ConfirmationNumberRoundedIcon color="primary" />
                  <Form.Label>Model Number</Form.Label>
                  <span> </span>
                  <Form.Control
                    type="number"
                    required
                    min={0}
                    minLength={5}
                    maxLength={15}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="chassisnumber">
                  <ConfirmationNumberRoundedIcon color="primary" />
                  <span> </span>
                  <Form.Label>Chassis Number</Form.Label>

                  <Form.Control
                    type="number"
                    required
                    min={0}
                    minLength={5}
                    maxLength={15}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="motornumber">
                  <ConfirmationNumberRoundedIcon color="primary" />
                  <span> </span>
                  <Form.Label>Motor Number</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    min={0}
                    minLength={5}
                    maxLength={15}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="cc">
                  <ElectricCarSharpIcon color="primary" />
                  <span> </span>
                  <Form.Label>CC</Form.Label>
                  <Form.Control
                    type="name"
                    required
                    minLength={5}
                    maxLength={15}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="platenumber">
                  <PinSharpIcon color="primary" />
                  <span> </span>
                  <Form.Label>plate Number</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    min={0}
                    minLength={5}
                    maxLength={15}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="typeoffuel">
                  <LocalGasStationSharpIcon color="primary" />
                  <span> </span>
                  <Form.Label>Type Of Fuel</Form.Label>
                  <Form.Control type="name" required />
                </Form.Group>
              </Row>
              <br></br>
              <h5>Purchasing Information</h5>
              <hr></hr>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="purchaseprice">
                  <PriceChangeSharpIcon color="primary" />
                  <span> </span>
                  <Form.Label>Purchased Price</Form.Label>

                  <Form.Control type="number" required min={0} maxLength={10} />
                </Form.Group>
                <Form.Group as={Col} controlId="duedate">
                  <DateRangeSharpIcon color="primary" />
                  <span> </span>
                  <Form.Label>Purchased Date</Form.Label>

                  <Form.Control type="date" name="purchaseddates" required />
                </Form.Group>
              </Row>

              <br></br>
              <h5>Maximum Load Capacity</h5>
              <hr></hr>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="person">
                  <HourglassTopSharpIcon color="primary" />
                  <span> </span>
                  <Form.Label>Person</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxperson"
                    required
                    min={0}
                    maxLength={2}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="person">
                  <HourglassTopSharpIcon color="primary" />
                  <span> </span>
                  <Form.Label>Normal Load</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxload"
                    required
                    min={0}
                    maxLength={5}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="Adress">
                  <HourglassTopSharpIcon color="primary" />
                  <span> </span>
                  <Form.Label>Litres</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxlitres"
                    required
                    min={0}
                    maxLength={5}
                  />
                </Form.Group>
              </Row>

              <br></br>

              <h5>Proprietary Information</h5>
              <hr></hr>
              <Form.Group className="mb-3" controlId="proprietaryIdNumber">
                <NoCrashSharpIcon color="primary" />
                <span> </span>
                <Form.Label>Proprietary Id Number</Form.Label>
                <Form.Control
                  type="number"
                  name="proprietaryIdNumber"
                  required
                  min={0}
                  maxLength={5}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="vehicleimage">
                <AddPhotoAlternateSharpIcon color="primary" />
                <span> </span>
                <Form.Label>Vehicle Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="vehicleimage"
                  required
                />
              </Form.Group>
              <Row>
                <Form.Group as={Col} controlId="workProcess">
                  <WifiProtectedSetupRoundedIcon color="primary" />
                  <span> </span>
                  <Form.Label>Work process</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    minLength={20}
                    maxLength={700}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="project">
                  <FactCheckRoundedIcon color="primary" />
                  <span> </span>
                  <Form.Label>Project</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    minLength={20}
                    maxLength={700}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="workBehaviour">
                  <CommuteRoundedIcon color="primary" />
                  <span> </span>
                  <Form.Label>Work behavior</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    minLength={20}
                    maxLength={200}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="forGeneralPurpose">
                  <SubwayRoundedIcon color="primary" />
                  <span> </span>
                  <Form.Label>For general service</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    minLength={20}
                    maxLength={200}
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="decision">
                <SubtitlesRoundedIcon color="primary" />
                <span> </span>
                <Form.Label>Decision</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your decision"
                  required
                  minLength={50}
                  maxLength={200}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Done <CheckCircleIcon color="white" />
              </Button>
            </Form>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
};
export default AssignVehicle;
