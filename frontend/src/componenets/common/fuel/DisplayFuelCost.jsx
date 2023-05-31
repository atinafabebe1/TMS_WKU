import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Row, Col } from "react-bootstrap";
import Loading from "../Provider/LoadingProvider";
import api from "../../../api/api";

const FuelCostListPage = () => {
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [fuelCostData, setFuelCostData] = useState({
    type: "",
    unitPrice: "",
  });
  const [editData, setEditData] = useState({
    _id: "",
    type: "",
    unitPrice: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("Resources");
      setDatas(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFuelCostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddNew = () => {
    setShowEditForm(false);
    setShowAddForm(true);
    setFuelCostData({
      type: "",
      unitPrice: "",
    });
    setError("");
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEditData({
      type: "",
      unitPrice: "",
    });
    setError("");
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setEditData({
      type: "",
      unitPrice: "",
    });
    setError("");
  };
  const handleClear = () => {
    setFuelCostData({
      type: "",
      unitPrice: "",
    });
    setError("");
  };

  const handleConfirmation = () => {
    setShowModal(false);
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      if (fuelCostData.type && fuelCostData.unitPrice) {
        const response = await api.post("Resources", fuelCostData);
        if (response.status === 200) {
          setFuelCostData({
            type: "",
            unitPrice: "",
          });
          setError("");
          setShowAddForm(false);
          fetchData();
        } else {
          setError(response.data.message || "Failed to add fuel cost data");
        }
      } else {
        setError("Please provide valid data and try again");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
    setShowAddForm(false);
    setShowEditForm(true);
    setError("");
  };

  const handleSaveEdit = async () => {
    try {
      if (editData.type && editData.unitPrice) {
        const response = await api.put(`Resources/${editData._id}`, editData);
        if (response.status === 200) {
          setEditData({
            _id: "",
            type: "",
            unitPrice: "",
          });
          setShowEditForm(false);
          fetchData();
        } else {
          setError(response.data.message || "Failed to update fuel cost data");
        }
      } else {
        setError("Please provide valid data and try again");
      }
    } catch (error) {
      console.error("Error saving edit:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h5 className="form-control-custom">
            List of Available Fuel Cost Statistics
          </h5>
        </Col>
        <Col className="text-end">
          <Button variant="primary" size="sm" onClick={handleAddNew}>
            Add New
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <hr></hr>
          {isLoading && (
            <h4>
              <Loading />
            </h4>
          )}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>type</th>
                <th>Unit Price Litre</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {datas?.map((data) => (
                <tr key={data._id}>
                  <td>{data.type}</td>
                  <td>{data.unitPrice}</td>
                  <td>
                    <Button
                      className="btn btn-sm"
                      variant="warning"
                      onClick={() => handleEdit(data)}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          {showAddForm && (
            <Form>
              <hr></hr>
              <h5 className="form-control-custom">Add New Fuel Cost</h5>
              <hr></hr>
              <Form.Group controlId="type">
                <Form.Label className="form-control-custom">Type</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  placeholder="Choose"
                  required
                  name="type"
                  value={fuelCostData.type}
                  onChange={handleInputChange}
                >
                  <option value="">Select a type</option>
                  <option value="Fuel">Fuel</option>
                  <option value="Benzene">Benzene</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Kerosene">Kerosene</option>
                  <option value="Biodiesel">Biodiesel</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Gear oil">Gear oil</option>
                  <option value="Fren Oil">Fren Oil</option>
                  <option value="Grease">Grease</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please provide the vehicle type.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="unitPrice">
                <Form.Label className="form-control-custom">
                  Unit Price Per Litre
                </Form.Label>
                <Form.Control
                  type="number"
                  required
                  min={1}
                  max={1000000}
                  name="unitPrice"
                  value={fuelCostData.unitPrice}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide the unit price.
                </Form.Control.Feedback>
              </Form.Group>
              <br></br>
              {error && <div className="text-danger">{error}</div>}
              <Button variant="secondary" size="sm" onClick={handleCancelAdd}>
                Cancel
              </Button>{" "}
              <Button variant="danger" size="sm" onClick={handleClear}>
                Clear
              </Button>{" "}
              <Button variant="primary" size="sm" onClick={handleSubmit}>
                Save
              </Button>
              <br></br>
            </Form>
          )}

          {showEditForm && (
            <Form>
              <hr></hr>
              <h5 className="form-control-custom">Edit Fuel Cost</h5>
              <hr></hr>
              <Form.Group controlId="editUnitPrice">
                <Form.Label className="form-control-custom">
                  {editData.type} Unit Price Per Litre
                </Form.Label>
                <Form.Control
                  type="number"
                  value={editData.unitPrice}
                  onChange={(e) =>
                    setEditData({ ...editData, unitPrice: e.target.value })
                  }
                />
              </Form.Group>
              <br></br>
              {error && <div className="text-danger">{error}</div>}
              <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                Cancel
              </Button>{" "}
              <Button variant="primary" size="sm" onClick={handleSaveEdit}>
                Save
              </Button>
              <br></br>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default FuelCostListPage;
