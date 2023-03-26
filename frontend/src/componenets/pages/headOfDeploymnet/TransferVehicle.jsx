import api from "../../../api/api";
import { Button, Table, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const TRANSFER_ENDPOINT = "/Request/transfer";

const TransferVehicle = () => {
  const [transfers, setTransfers] = useState([]);
  const [status, setStatus] = useState("pending");
  const [showModal, setShowModal] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);

  const fetchVehicleTransferRequest = async () => {
    try {
      const response = await api.get(TRANSFER_ENDPOINT);
      setTransfers(response.data.data);
    } catch (error) {
      throw error;
    }
  };

  const handleResolve = (transfer) => {
    setSelectedTransfer(transfer);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedTransfer(null);
    setShowModal(false);
  };

  const handleApprove = () => {
    const updatedTransfer = { ...selectedTransfer, status: "Approved" };
    api
      .put(`/Request/transfer/${selectedTransfer.id}`, updatedTransfer)
      .then(() => {
        setSelectedTransfer(null);
        setShowModal(false);
        setStatus("Approved");
        setTransfers((prevTransfers) =>
          prevTransfers.map((transfer) =>
            transfer.id === updatedTransfer.id ? updatedTransfer : transfer
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  useEffect(() => {
    fetchVehicleTransferRequest();
  }, []);

  

  return (
    <div>
      <div className="table-responsive p-2 my-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Vehicle Transfer Requests List</h2>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Model of Vehicle</th>
              <th>Plate Number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer) => (
              <tr key={transfer.id}>
                <td>{transfer.user}</td>
                <td>{transfer.modelOfVehicle}</td>
                <td>{transfer.plateNumber}</td>
                <td>{transfer.status}</td>
                <td>
                  <Button variant="success" className="btn-sm mx-2" onClick={() => handleResolve(transfer)}
                    disabled={transfer.status === "resolved"}>
                    Approve
                  </Button>
                  <Button variant="danger" className="btn-sm">
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5><strong>Approve Vehicle Request</strong></h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5><strong>Are you sure to approve Vehicle Request</strong></h5>
        </Modal.Body>
      
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>

          <Button variant="success" onClick={handleApprove}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
        </Table>
      </div>
    </div>
  );
};

export default TransferVehicle;