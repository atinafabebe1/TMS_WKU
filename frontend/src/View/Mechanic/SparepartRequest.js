import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";

//sidebar icon from material UI
import FilterFramesSharpIcon from "@mui/icons-material/FilterFramesSharp";
import SummarizeSharpIcon from "@mui/icons-material/SummarizeSharp";
import DnsSharpIcon from "@mui/icons-material/DnsSharp";

//import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";

//main body icon from material UI
import PinSharpIcon from "@mui/icons-material/PinSharp";
import DirectionsCarFilledSharpIcon from "@mui/icons-material/DirectionsCarFilledSharp";
import BadgeSharpIcon from "@mui/icons-material/BadgeSharp";
import ConfirmationNumberSharpIcon from "@mui/icons-material/ConfirmationNumberSharp";
import PriceChangeSharpIcon from "@mui/icons-material/PriceChangeSharp";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import PersonRemoveSharpIcon from "@mui/icons-material/PersonRemoveSharp";
import DateRangeSharpIcon from "@mui/icons-material/DateRangeSharp";
import SendSharpIcon from "@mui/icons-material/SendSharp";

const SparePartRequest = () => {
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
  const [fields, setFields] = useState([
    {
      id: 1,
      sparePartId: "",
      quantity: "",
      unitPrice: "",
    },
  ]);
  const handleChangeInput = (i, e) => {
    console.log(e.target.value);
    const values = [...fields];
    values[i][e.target.name] = e.target.value;
    setFields(values);
  };

  const handleAdd = (id) => {
    setFields([...fields, { id: id + 2, witnessName: "", witnessAdress: "" }]);
  };

  const handleSubtract = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    setFields([...values]);
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
            <ListGroup.Item action href="/mechanic/sendMaintenanceReport">
              <SummarizeSharpIcon color="white" />
            </ListGroup.Item>
            <ListGroup.Item action active href="/mechanic/sparePartRequest">
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
            <ListGroup.Item action href="/mechanic/sendMaintenanceReport">
              <SummarizeSharpIcon color="primary" />
              <span> </span>
              Maintenance Report
            </ListGroup.Item>
            <ListGroup.Item action active href="/mechanic/sparePartRequest">
              <DnsSharpIcon />
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
            <h4>Spare Part Request Detail Information</h4>
            <hr></hr>
            <Row className="mb-3" w-70>
              <h6>Vehicle Information</h6>
              <hr></hr>
              <Form.Group size="lg" as={Col} controlId="platenumber">
                <Form.Label>
                  <PinSharpIcon color="primary" />
                  <span> </span>Vehicle Plate Number
                </Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={0}
                  minLength={7}
                  maxLength={12}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="vehicletype">
                <Form.Label>
                  <DirectionsCarFilledSharpIcon color="primary" />
                  <span> </span>Vehicle Type
                </Form.Label>
                <Form.Control type="id" required minLength={3} maxLength={15} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <h6>Spare Part</h6>
              <hr></hr>
              <Form.Group controlId="sparepartId">
                {fields.map((field, i) => (
                  <div key={field.id}>
                    <Row className="mt-5">
                      <Col md>
                        <Form.Label>
                          <BadgeSharpIcon color="primary" />
                          <span> </span>Spare Part Id
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={field.sparePartId}
                          required
                          minLength={3}
                          maxLength={12}
                          onChange={(e) => handleChangeInput(i, e)}
                        />
                      </Col>
                      <Col md>
                        <Form.Label>
                          <ConfirmationNumberSharpIcon color="primary" />
                          <span> </span>Quantity
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={field.quantity}
                          required
                          min={0}
                          maxLength={10}
                          onChange={(e) => handleChangeInput(i, e)}
                        />
                      </Col>
                      <Col md>
                        <Form.Label>
                          <PriceChangeSharpIcon color="primary" />
                          <span> </span>Spare Part {i + 1} Unit Price
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={field.unitPrice}
                          required
                          min={0}
                          maxLength={10}
                          onChange={(e) => handleChangeInput(i, e)}
                        />
                      </Col>
                      <Col>
                        <Button
                          className="mt-4 mr-5"
                          onClick={() => handleAdd(i)}
                        >
                          Add
                        </Button>
                        <span> </span>
                        <Button
                          className="mt-4"
                          disabled={field.id === 1}
                          onClick={() => handleSubtract(i)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <h6>Sender and Receiver Information</h6>
              <hr></hr>
              <Form.Group as={Col} controlId="senderName">
                <Form.Label>
                  <PersonAddSharpIcon color="primary" />
                  <span> </span>Sender Name
                </Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={3}
                  maxLength={65}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="receivername">
                <Form.Label>
                  <PersonRemoveSharpIcon color="primary" />
                  <span> </span>Receiver Name
                </Form.Label>
                <Form.Control
                  type="name"
                  required
                  minLength={3}
                  maxLength={65}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="date">
                <Form.Label>
                  <DateRangeSharpIcon color="primary" />
                  <span> </span>Date
                </Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Send<span> </span>
              <SendSharpIcon color="white" />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SparePartRequest;
