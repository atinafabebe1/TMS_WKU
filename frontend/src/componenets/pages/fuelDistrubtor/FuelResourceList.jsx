import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import api from "../../../api/api";
import Table from "react-bootstrap/Table";
import RegisterResourceForm from "./RegisterFuelResource";

function FuelResourceList() {
  const [resources, setResources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const fetchRequestData = async () => {
    await api.get(`/Resources`).then((response) => {
      console.log(response.data.data);
      setResources(response.data.data);
    });
  };

  useEffect(() => {
    fetchRequestData();
  }, []);

  console.log(resources);

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };
  // group resources by type and calculate the total attributes
  const groupedResources = resources.reduce((groups, resource) => {
    const key = resource.type;
    if (!groups[key]) {
      groups[key] = {
        type: key,
        amount: 0,
        unitPrice: 0,
        totalPrice: 0,
      };
    }
    groups[key].amount += resource.amount;
    groups[key].unitPrice += resource.unitPrice;
    groups[key].totalPrice += resource.totalPrice;
    return groups;
  }, {});

  // convert the object back to an array
  const groupedResourcesArray = Object.values(groupedResources);

  const recentResources = resources.reduce((groups, resource) => {
    const key = resource.type;
    if (
      !groups[key] ||
      new Date(groups[key].createdAt) < new Date(resource.createdAt)
    ) {
      groups[key] = {
        type: key,
        amount: resource.amount,
        unitPrice: resource.unitPrice,
        totalPrice: resource.totalPrice,
        createdAt: resource.createdAt,
      };
    }
    return groups;
  }, {});

  // convert the object back to an array
  const recentResourcesArray = Object.values(recentResources);

  // sort the array by createdAt date in descending order
  recentResourcesArray.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Available Resources Summary</h4>
        <div>
          <Button onClick={() => setShowModal(true)}>Register New</Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Total Amount</th>
            <th>Average Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {groupedResourcesArray.map((resource) => (
            <tr key={resource.type}>
              <td>{resource.type}</td>
              <td>{resource.amount}</td>
              <td>{resource.unitPrice / resource.amount}</td>
              <td>{resource.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Current Cost Statistics</h4>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Total Amount</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {recentResourcesArray.map((resource) => (
            <tr key={resource.type}>
              <td>{resource.type}</td>
              <td>{resource.amount}</td>
              <td>{resource.unitPrice}</td>
              <td>{resource.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Last Regitered Fuel Resources</h4>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {resources.slice(startIndex, startIndex + 7).map((resource) => (
            <tr key={resource.id}>
              <td>{resource.type}</td>
              <td>{resource.amount}</td>
              <td>{resource.unitPrice}</td>
              <td>{resource.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register New Fuel Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterResourceForm onRegister={fetchRequestData} />
        </Modal.Body>
      </Modal>
      <div
        className="d-flex justify-content-center align-items-center w-100"
        style={{ paddingBottom: "70px" }}
      >
        <Button
          variant="primary"
          className="btn-sm mx-2"
          onClick={handlePrevious}
          disabled={startIndex === 0}
          block
        >
          Previous
        </Button>
        <Button
          variant="primary"
          className="btn-sm mx-2"
          onClick={handleNext}
          disabled={startIndex + 7 >= resources.length}
          block
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default FuelResourceList;
