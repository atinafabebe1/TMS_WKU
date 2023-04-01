import { Table, Button } from "react-bootstrap";
const RequestTable = ({
  requests,
  handleApproveClick,
  handleRejectClick,
  handleRequestClick,
}) => {
  if (!requests) {
    return <p>No requests found.</p>;
  }
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>User</th>
          <th>Plate Number</th>
          <th>Passengers</th>
          <th>Destination</th>
          <th>Reason</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request._id}>
            <td>
              <a href="#" onClick={() => handleRequestClick(request)}>
                {console.log(request.user.firstName)}
                {request.user?.firstName} {request.user?.lastName}
              </a>
            </td>
            <td>{request.plateNumber}</td>
            <td>
              {request.passengers.map((passenger) => passenger.name).join(", ")}
            </td>
            <td>{request.destination}</td>
            <td>{request.reason}</td>
            <td>
              {new Date(request.date.from).toLocaleDateString()} -{" "}
              {new Date(request.date.to).toLocaleDateString()}
            </td>

            <td>{request.status}</td>
            <td>
              {request.status === "pending" && (
                <>
                  <Button
                    className="btn btn-sm"
                    variant="success"
                    onClick={() => handleApproveClick(request)}
                  >
                    Approve
                  </Button>{" "}
                  <Button
                    className="btn btn-sm"
                    variant="danger"
                    onClick={() => handleRejectClick(request)}
                  >
                    Reject
                  </Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default RequestTable;
