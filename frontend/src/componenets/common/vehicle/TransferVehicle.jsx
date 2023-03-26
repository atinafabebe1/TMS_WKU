import api from "../../../api/api";
import { Button, Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const TRANSFER_ENDPOINT = "/Request/transfer";

const TransferVehicle = () => {
  const [transfers, setTransfers] = useState([]);

  const fetchVehicleTransferRequest = async () => {
    try {
      const response = await api.get(TRANSFER_ENDPOINT);
      setTransfers(response.data.data);
    } catch (error) {
      console.log(error);
    }
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
                  <Button variant="success" className="btn-sm mx-2">
                    Approve
                  </Button>
                  <Button variant="danger" className="btn-sm">
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TransferVehicle;