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
  const [rejectReason, setRejectReason] = useState("");
  const [currentRequest, setCurrentRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (vehicle) => {
    setCurrentRequest(vehicle);
    setShowModal(vehicle);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    return vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!vehicles) {
    return <p>No Vehicle found.</p>;
  }

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
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Type </th>
            <th>Proprietary Id Number</th>
            <th>Model Number</th>
            <th>Items With</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles?.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.plateNumber}</td>
              <td>{vehicle.type}</td>
              <td>{vehicle.proprietaryIdNumber}</td>
              <td>{vehicle.modelNo}</td>
              <td>
                {vehicle.itemsWithVehicle
                  ?.map((item) => item.itemDetail)
                  .join(", ")}
              </td>
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
                          navigate(`/hd/vehicles/assign-vehicle/${vehicle._id}`)
                        }
                      >
                        Assign
                      </Button>{" "}
                      <Button
                        className="btn btn-sm"
                        variant="secondary"
                        onClick={() => handledissabele(vehicle)}
                      >
                        Temporarly Diactivate
                      </Button>{" "}
                      <Button
                        className="btn btn-sm"
                        variant="danger"
                        onClick={() => handledeleteClick(vehicle)}
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
                      This Vehicle Assigned For Purpose
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      variant="danger"
                      onClick={() => handeleUnassign(vehicle)}
                    >
                      Remove Assigned Task
                    </Button>{" "}
                  </>
                )}
                {vehicle.onMaintenance === true && (
                  <>
                    <Button className="btn btn-sm" variant="danger" disabled>
                      This Vehicle Is Temporarly Diactivated
                    </Button>{" "}
                    <Button
                      className="btn btn-sm"
                      variant="success"
                      onClick={() => handleEnableVehicle(vehicle)}
                    >
                      Activate
                    </Button>{" "}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VehicleDisplayTable;
