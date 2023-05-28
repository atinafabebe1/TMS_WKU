import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const VehicleDisplayTable = ({
  vehicles,
  handledissabele,
  handledeleteClick,
  handleEnableVehicle,
  handeleUnassign,
  handleCompletedtoBuyClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentRequest, setCurrentRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    setShowSuccessModal(false);
  };

  const handleShowModal = (vehicle) => {
    setCurrentRequest(vehicle);
    setShowModal(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    return vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!vehicles) {
    return <p>No Vehicle found.</p>;
  }

  const handleDeleteConfirmation = (vehicle) => {
    setCurrentRequest({ action: "delete", vehicle });
    setShowModal(true);
  };

  const handleDelete = (vehicle) => {
    handledeleteClick(vehicle);
    handleCloseModal();
    setShowSuccessModal(true);
  };

  const handleDisableConfirmation = (vehicle) => {
    setCurrentRequest({ action: "disable", vehicle });
    setShowModal(true);
  };

  const handleDisable = (vehicle) => {
    handledissabele(vehicle);
    handleCloseModal();
    setShowSuccessModal(true);
  };

  const handleUnassignConfirmation = (vehicle) => {
    setCurrentRequest({ action: "unassign", vehicle });
    setShowModal(true);
  };

  const handleUnassign = (vehicle) => {
    handeleUnassign(vehicle);
    handleCloseModal();
    setShowSuccessModal(true);
  };

  const handleEnableConfirmation = (vehicle) => {
    setCurrentRequest({ action: "enable", vehicle });
    setShowModal(true);
  };

  const handleEnable = (vehicle) => {
    handleEnableVehicle(vehicle);
    handleCloseModal();
    setShowSuccessModal(true);
  };

  const handleModalAction = () => {
    if (currentRequest) {
      if (currentRequest.action === "delete") {
        handleDelete(currentRequest.vehicle);
      } else if (currentRequest.action === "disable") {
        handleDisable(currentRequest.vehicle);
      } else if (currentRequest.action === "unassign") {
        handleUnassign(currentRequest.vehicle);
      } else if (currentRequest.action === "enable") {
        handleEnable(currentRequest.vehicle);
      }
    }
  };

  return (
    <div className="p-4">
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search by Plate Number"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover responsive className="table-sm">
        <thead className="form-control-custom">
          <tr>
            <th>Plate Number</th>
            <th>Type</th>
            <th>Proprietary Id Number</th>
            <th>Model Number</th>
            <th>Property Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles
            ?.slice(startIndex, startIndex + 7)
            .map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.plateNumber}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.proprietaryIdNumber}</td>
                <td>{vehicle.modelNo}</td>
                <td>{vehicle.propertyType}</td>
                <td>
                  {vehicle.isDeleted === false &&
                    vehicle.assignedTo === null &&
                    vehicle.onMaintenance === false && (
                      <>
                        <Button
                          className="btn btn-sm"
                          variant="info"
                          onClick={() =>
                            navigate(`/hd/vehicles/detail/${vehicle._id}`)
                          }
                        >
                          See Detail
                        </Button>{" "}
                        <Button
                          className="btn btn-sm"
                          variant="warning"
                          onClick={() =>
                            navigate(`/hd/vehicles/edit-vehicle/${vehicle._id}`)
                          }
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          className="btn btn-sm"
                          variant="success"
                          onClick={() =>
                            navigate(
                              `/hd/vehicles/assign-vehicle/${vehicle._id}`
                            )
                          }
                        >
                          Assign
                        </Button>{" "}
                        <Button
                          className="btn btn-sm"
                          variant="secondary"
                          onClick={() => handleDisableConfirmation(vehicle)}
                        >
                          Temporarily Deactivate
                        </Button>{" "}
                        <Button
                          className="btn btn-sm"
                          variant="danger"
                          onClick={() => handleDeleteConfirmation(vehicle)}
                        >
                          Delete
                        </Button>{" "}
                      </>
                    )}
                  {vehicle.isDeleted === true && (
                    <>
                      <Button className="btn btn-sm" variant="danger" disabled>
                        This Vehicle Permanently Deleted
                      </Button>{" "}
                    </>
                  )}
                  {vehicle.assignedTo !== null && (
                    <>
                      <Button className="btn btn-sm" variant="primary" disabled>
                        Assigned For {vehicle.assignedTo}
                      </Button>{" "}
                      <Button
                        className="btn btn-sm"
                        variant="danger"
                        onClick={() => handleUnassignConfirmation(vehicle)}
                      >
                        Remove Assigned Task
                      </Button>{" "}
                    </>
                  )}
                  {vehicle.onMaintenance === true && (
                    <>
                      {vehicle.onMaintenance === true && (
                        <>
                          <Button
                            className="btn btn-sm"
                            variant="danger"
                            disabled
                          >
                            This Vehicle Is Temporarily Deactivated
                          </Button>{" "}
                          <Button
                            className="btn btn-sm"
                            variant="success"
                            onClick={() => handleEnableConfirmation(vehicle)}
                          >
                            Activate
                          </Button>{" "}
                        </>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center align-items-center w-100">
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
          disabled={startIndex + 7 >= vehicles.length}
          block
        >
          Next
        </Button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentRequest && currentRequest.action === "delete" && (
            <p>Are you sure you want to delete this vehicle?</p>
          )}
          {currentRequest && currentRequest.action === "disable" && (
            <Form.Group controlId="rejectReason">
              <Form.Label>Reason for deactivation:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </Form.Group>
          )}
          {currentRequest && currentRequest.action === "unassign" && (
            <p>Are you sure you want to unassign this vehicle?</p>
          )}
          {currentRequest && currentRequest.action === "enable" && (
            <p>Are you sure you want to activate this vehicle?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Action completed successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VehicleDisplayTable;
