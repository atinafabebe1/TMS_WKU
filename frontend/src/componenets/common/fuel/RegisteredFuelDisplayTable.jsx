import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisteredFuel = ({ fuels }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };

  const filteredFuels = fuels.filter((fuel) => {
    return (
      fuel.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fuel.createdAt
        .toLocaleDateString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

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
            <th>Type Of Fuel </th>
            <th>Mode </th>
            <th>Ammount</th>
            <th>Registered Date </th>
            <th>Last Edited Date </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFuels.slice(startIndex, startIndex + 7).map((fuel) => (
            <tr key={fuel._id}>
              <td>{fuel.plateNumber}</td>
              <td>{fuel.typeOfFuel}</td>
              <td>{fuel.mode}</td>
              <td>{fuel.ammount}</td>
              <td>{new Date(fuel.createdAt).toLocaleDateString()}</td>
              <td>
                {fuel.createdAt !== fuel.updatedAt && (
                  <>
                    <p>Edited in {new Date(fuel.updatedAt).toLocaleString()}</p>
                  </>
                )}
                {fuel.createdAt === fuel.updatedAt && (
                  <>
                    <p>Not Edited</p>
                  </>
                )}
              </td>

              <td>
                {fuel.isDeleted === false && (
                  <>
                    <Button
                      className="btn btn-sm"
                      variant="warning"
                      onClick={() =>
                        navigate(`/fd/edit-fuel-record/${fuel._id}`)
                      }
                    >
                      Edit
                    </Button>{" "}
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
          disabled={startIndex + 7 >= fuels.length}
          block
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RegisteredFuel;
