import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Alert, Card, Container } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import api from "../../../api/api";

const MaintenanceReportForm = () => {
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [myplateNumber,setMyPlateNumber]=useState("");
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

 
  function handleMechanicChange(event) {
    setSelectedMechanic(event.target.value);
    console.log(selectedMechanic);
  }
  useEffect(() => {
    api.get(`/MaintenanceOrder/${id}`)
      .then((response) => {
        const maintenanceOrder = response.data.data;
        const plateNumber = maintenanceOrder.plateNumber;
        setMyPlateNumber(plateNumber);
      })
      .catch((error) => {
        console.error("Error fetching maintenance order:", error);
        // Handle the error
      });
  }, [id]);
  
  const fetchMechanics = async () => {
    try {
      const response = await api.get("/user/getusers?select=role,firstName");
      setMechanics(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMechanics();
  }, []);

  const [reportData, setReportData] = useState({
    spareparts: [
      {
        spareId: "",
        spareName: "",
        itemPrice: 0,
        quantity: 0,
        totalPrice: 0,
      },
    ],
    exchangedMaintenanceTotalPrice: 0,
    examination: "",
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.includes("spareparts")) {
      const parts = [...reportData.spareparts];
      parts[index][name.split(".")[1]] = value;
      parts[index].totalPrice = calculateTotalPrice(parts[index]);
      const exchangedMaintenanceTotalPrice = parts.reduce(
        (total, part) => total + part.totalPrice,
        0
      );
      setReportData((prevData) => ({
        ...prevData,
        spareparts: parts,
        exchangedMaintenanceTotalPrice,
      }));
    } else {
      setReportData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const calculateTotalPrice = (part) => {
    return part.itemPrice * part.quantity;
  };

  const handleAddItem = () => {
    setReportData((prevData) => ({
      ...prevData,
      spareparts: [
        ...prevData.spareparts,
        {
          spareId: "",
          spareName: "",
          itemPrice: 0,
          quantity: 0,
          totalPrice: 0,
        },
      ],
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;



    // Validate spareparts
    const sparepartsErrors = reportData.spareparts.map((part, index) => {
      const partErrors = {};

      // Validate spareId
      if (part.spareId.trim() === "") {
        partErrors.spareId = "Spare ID is required";
        isValid = false;
      }

      // Validate spareName
      if (part.spareName.trim() === "") {
        partErrors.spareName = "Spare Name is required";
        isValid = false;
      }

      // Validate itemPrice
      if (part.itemPrice <= 0) {
        partErrors.itemPrice = "Item Price must be greater than 0";
        isValid = false;
      }

      // Validate quantity
      if (part.quantity <= 0) {
        partErrors.quantity = "Quantity must be greater than 0";
        isValid = false;
      }

      return partErrors;
    });

    if (sparepartsErrors.length > 0) {
      errors.spareparts = sparepartsErrors;
    }

    // Validate exchangedMaintenanceTotalPrice
    if (reportData.exchangedMaintenanceTotalPrice < 0) {
      errors.exchangedMaintenanceTotalPrice =
        "Exchanged Maintenance Total Price must be greater than 0 or Equals to 0";
      isValid = false;
    }

    // Validate examination
    if (reportData.examination.trim() === "") {
      errors.examination = "Examination is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };
  const handleRemoveItem = (index) => {
    const updatedSpareparts = [...reportData.spareparts];
    updatedSpareparts.splice(index, 1);
    setReportData({ ...reportData, spareparts: updatedSpareparts });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    console.log(reportData);
  
    const updatedData = {
      status: 'completed'
    };
  
  
    try {
      await api.patch(`/MaintenanceOrder/${id}`, {
        status: "Waiting-Mech-To-Approve",
      })
      await api.put(`/Request/maintenances/${myplateNumber}`, updatedData);
      console.log("Maintenance request status updated successfully");
      const response = await api.post("/maintenanceReports", {
        ...reportData,
        expertExamined: selectedMechanic,
        plateNumber:myplateNumber,
      });
      console.log("Maintenance report submitted successfully:", response.data);
      setTimeout(() => {
        navigate("/mechanic/maintenance/receive-maintenance-order"); 
      }, 4000);
    
      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error("Failed to update maintenance request status or submit maintenance report:", error);
      // Handle error, e.g., show an error message
    }
  };
  

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-primary text-light">
              Maintenance Report Need For Approval
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={handleSubmit}
                validated={Object.keys(formErrors).length === 0}
              >
                <Form.Group as={Row} controlId="plateNumber">
                  <Form.Label column sm={2} className="form-control-custom">
                    Plate Number:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      name="plateNumber"
                      value={myplateNumber}
                      onChange={handleChange}
                      required
                      isInvalid={!!formErrors.plateNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.plateNumber}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                {reportData.spareparts.map((part, index) => (
                  <div key={index}>
                    <h4 className="form-control-custom">
                      Spare Part {index + 1}
                    </h4>

                    <Row>
                      <Col sm={4}>
                        <Form.Group controlId={`spareId_${index}`}>
                          <Form.Label className="form-control-custom">
                            Spare ID:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name={`spareparts[${index}].spareId`}
                            value={part.spareId}
                            onChange={(e) => handleChange(e, index)}
                            required
                            isInvalid={
                              !!formErrors.spareparts?.[index]?.spareId
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.spareparts?.[index]?.spareId}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col sm={4}>
                        <Form.Group controlId={`spareName_${index}`}>
                          <Form.Label className="form-control-custom">
                            Spare Name:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name={`spareparts[${index}].spareName`}
                            value={part.spareName}
                            onChange={(e) => handleChange(e, index)}
                            required
                            isInvalid={
                              !!formErrors.spareparts?.[index]?.spareName
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.spareparts?.[index]?.spareName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col sm={4}>
                        <Form.Group controlId={`itemPrice_${index}`}>
                          <Form.Label className="form-control-custom">
                            Item Price:
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name={`spareparts[${index}].itemPrice`}
                            value={part.itemPrice}
                            min={0}
                            onChange={(e) => handleChange(e, index)}
                            required
                            isInvalid={
                              !!formErrors.spareparts?.[index]?.itemPrice
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.spareparts?.[index]?.itemPrice}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={4}>
                        <Form.Group controlId={`quantity_${index}`}>
                          <Form.Label className="form-control-custom">
                            Quantity:
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name={`spareparts[${index}].quantity`}
                            value={part.quantity}
                            onChange={(e) => handleChange(e, index)}
                            required
                            min={0}
                            isInvalid={
                              !!formErrors.spareparts?.[index]?.quantity
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.spareparts?.[index]?.quantity}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col sm={8}>
                        <Form.Group controlId={`totalPrice_${index}`}>
                          <Form.Label className="form-control-custom">
                            Total Price:
                          </Form.Label>
                          <Form.Control
                            plaintext
                            readOnly
                            value={`${part.totalPrice.toFixed(2)}`}
                          />
                        </Form.Group>
                      </Col>
                      <button onClick={() => handleRemoveItem(index)}>Remove</button>
                    </Row>
                  </div>
                  
                ))}

                <Button variant="secondary" onClick={handleAddItem}>
                  Add Item
                </Button>

                <Form.Group as={Row} controlId="exchangedMaintenanceTotalPrice">
                  <Form.Label column sm={8} className="form-control-custom">
                    Exchanged Maintenance Total Price:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="number"
                      name="exchangedMaintenanceTotalPrice"
                      value={reportData.exchangedMaintenanceTotalPrice}
                      onChange={handleChange}
                      min={0}
                      required
                      isInvalid={!!formErrors.exchangedMaintenanceTotalPrice}
                      readOnly
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.exchangedMaintenanceTotalPrice}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="examination">
                  <Form.Label column sm={4} className="form-control-custom">
                    Examination:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="textarea"
                      name="examination"
                      value={reportData.examination}
                      onChange={handleChange}
                      required
                      isInvalid={!!formErrors.examination}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.examination}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group controlId="mechanic">
                  <Form.Label className="form-control-custom">
                    Select a Mechanic
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedMechanic}
                    required
                    onChange={handleMechanicChange}
                    isInvalid={!!formErrors.mechanic}
                  >
                    <option value="" className="form-control-custom">
                      Select a Mechanic
                    </option>
                    {mechanics
                      .filter(
                        (mechanic) =>
                          mechanic.role === "ROLE_MECHANIC" &&
                          mechanic.id !== user.id
                      )
                      .map((mechanic) => (
                        <option key={mechanic.id} value={mechanic.id}>
                          {mechanic.firstName}
                        </option>
                      ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.mechanic}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MaintenanceReportForm;
