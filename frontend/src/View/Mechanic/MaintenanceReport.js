//form from react bootstrap
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

//sidebar icon from material UI
import FilterFramesSharpIcon from "@mui/icons-material/FilterFramesSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import DnsSharpIcon from "@mui/icons-material/DnsSharp";
//import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";

//body icon from Material UI
import PinSharpIcon from "@mui/icons-material/PinSharp";
import AssignmentTurnedInSharpIcon from "@mui/icons-material/AssignmentTurnedInSharp";
import ManageAccountsSharpIcon from "@mui/icons-material/ManageAccountsSharp";
import EventSharpIcon from "@mui/icons-material/EventSharp";
import EventRepeatSharpIcon from "@mui/icons-material/EventRepeatSharp";
import PriceCheckSharpIcon from "@mui/icons-material/PriceCheckSharp";
import CurrencyBitcoinSharpIcon from "@mui/icons-material/CurrencyBitcoinSharp";
import React, { useState } from "react";

const MaintenanceReport = () => {
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
            <ListGroup.Item action href="/mechanic/receiveMaintenanceOrder">
              <FilterFramesSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item
              action
              active
              href="/mechanic/sendMaintenanceReport"
            >
              <SummarizeSharpIcon color="white" />
            </ListGroup.Item>
            <ListGroup.Item action href="/mechanic/sparePartRequest">
              <DnsSharpIcon color="primary" />
            </ListGroup.Item>
            <ListGroup.Item action href="/mechanic/approveMaintenance">
              <CheckBoxSharpIcon color="primary" />
            </ListGroup.Item>
          </ListGroup>
        )}
        {toggle && (
          <ListGroup>
            <ListGroup.Item action href="/mechanic/receiveMaintenanceOrder">
              <FilterFramesSharpIcon color="primary" />
              <span> </span>
              Maintenance Order
            </ListGroup.Item>
            <ListGroup.Item
              action
              active
              href="/mechanic/sendMaintenanceReport"
            >
              <SummarizeSharpIcon color="white" />
              <span> </span>
              Maintenance Report
            </ListGroup.Item>
            <ListGroup.Item action href="/mechanic/sparePartRequest">
              <DnsSharpIcon color="primary" />
              <span> </span>
              SparePart Request
            </ListGroup.Item>
            <ListGroup.Item action href="/mechanic/approveMaintenance">
              <CheckBoxSharpIcon color="primary" />
              <span> </span>
              Approve Maintenance
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
      <div className="field">
        <div className="App">
          <Form
            className="form"
            noValidate
            validated={validated}
            checkValidity
            onSubmit={handleSubmit}
          >
            <h4>Maintenance Report Detail Information</h4>
            <hr></hr>
            <Row className="mb-3" w-70>
              <Form.Group size="lg" as={Col} controlId="platenumber">
                <Form.Label>
                  <PinSharpIcon color="primary" />
                  <span> </span>Vehicle Plate Number
                </Form.Label>
                <Form.Control
                  type="number"
                  required
                  maxLength={12}
                  minLength={7}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="maintenancename">
                <Form.Label>
                  <AssignmentTurnedInSharpIcon color="primary" />
                  <span> </span>Finished Maintenance Name
                </Form.Label>
                <Form.Control
                  type="name"
                  required
                  maxLength={3}
                  minLength={65}
                />
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="mechanicName">
              <Form.Label>
                <ManageAccountsSharpIcon color="primary" />
                <span> </span>
                Mechanic Name
              </Form.Label>
              <Form.Control type="name" required maxLength={3} minLength={65} />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="date">
                <Form.Label>
                  <EventSharpIcon color="primary" />
                  <span> </span>Date
                </Form.Label>
                <Form.Control type="date" required />
              </Form.Group>

              <Form.Group as={Col} controlId="datetomaintain">
                <Form.Label>
                  <EventRepeatSharpIcon color="primary" />
                  <span> </span>Date To Maintain
                </Form.Label>
                <Form.Control type="number" required min={0} maxLength={365} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <h6>Payment Per-Time</h6>
              <hr></hr>
              <Form.Group as={Col} controlId="birr">
                <Form.Label>
                  <PriceCheckSharpIcon color="primary" />
                  <span> </span>Birr
                </Form.Label>
                <Form.Control type="number" required min={0} maxLength={10} />
              </Form.Group>
              <Form.Group as={Col} controlId="coin">
                <Form.Label>
                  <CurrencyBitcoinSharpIcon color="primary" />
                  <span> </span>Coin
                </Form.Label>
                <Form.Control type="number" required min={0} maxLength={10} />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default MaintenanceReport;
