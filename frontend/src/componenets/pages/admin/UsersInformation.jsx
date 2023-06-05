import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Badge, Row, Col } from "react-bootstrap";
import api from "../../../api/api";
import DeleteConfirmationModal from "../../common/confirmDelete/confirmModal";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import Loading from "../../common/Provider/LoadingProvider";


import ErrorProvider from "../../common/Provider/ErrorProvider";
import RejectModal from "./RejectModal";

const UsersInformation = () => {
  const [users, setUsers] = useState([]);
  const [passwordMismachError, setPasswordMismachError] = useState({});
  const [currentPage, setCurrentPage] = useState(2);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const [currentUserId, setCurrentUserId] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchUsersInformation = async () => {
    await api.get(`/user/getusers`).then((response) => {
      console.log(response);
      setUsers(response.data.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchUsersInformation();
  }, []);

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEditClick = (id) => {
    console.log(id);
    navigate(`/admin/${id}`);
  };
  const handleDeleteUser = (id) => {
    setShowPasswordModal(true);
    setCurrentUserId(id);
  };

  const handleResetPassword = (id) => {
    setCurrentUserId(id);
    setShowResetPasswordModal(true);
  };

  // const handleResetPassword = async (id) => {
  //     await api.put(`/user/${id}`,{
  //       password:password,
  //     }).then((response) => {
  //       console.log(response);
  //       setUsers(response.data.data);
  //     });
  // };
  const handleResetPasswordSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMismachError(
        "Password New Password and Confirm Password Mismatch"
      );
      return;
    }

    try {
      const response = await api.put(`/user/reset/${currentUserId}`, {
        password: newPassword,
      });
      console.log(response);

      setShowResetPasswordModal(false);
      fetchUsersInformation();
    } catch (error) {
      // Handle any error that occurred during the API call
      console.log(error);
    }
  };

  const handleDetailClick = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };


  const filterUser = users.filter((user) => {
    const userName = user?.userName ?? "";
    const firstName = user?.firstName ?? "";
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="form-control-custom">Users List</h4>
        <div>
          <Link to="/admin/register">
            <Button variant="success" className="btn-sm">
              <FaUserPlus /> Register New User
            </Button>
          </Link>
        </div>
      </div>
<hr></hr>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search by plate number or status"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Form>
      {isLoading ? (
        <Loading />
      ) : filterUser.length !== 0 ? (
        <Table striped bordered hover responsive className="table-sm">
          <thead className="form-control-custom">
            <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterUser.slice(startIndex, startIndex + 7).map((user) => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <Badge
                    variant={user.isActive ? "success" : "danger"}
                    className={
                      user.isActive ? "bg-success bg-sm" : "bg-danger bg-sm"
                    }
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="info"
                    className="btn-sm mx-1"
                    onClick={() => handleDetailClick(user)}
                  >
                    Detail
                  </Button>
                  <Button
                    variant="warning"
                    className="btn-sm mx-1"
                    onClick={() => handleEditClick(user.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    className="btn-sm"
                    onClick={() => handleResetPassword(user.id)}
                  >
                    Reset Password
                  </Button>{" "}
                  {user.isActive ? (
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      className="btn-sm"
                      disabled                    
                      >
                      Removed
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <h5 className="form-control-custom">User Not Found</h5>
        </div>
      )}

      {showPasswordModal && (
        <DeleteConfirmationModal
          text={
            "Are you sure you want to delete this user? This action cannot be undone."
          }
          url="/user/remove"
          id={currentUserId}
          show={setShowPasswordModal}
          onHide={() => setShowPasswordModal(false)}
          onDeleteConfirmed={() => fetchUsersInformation(currentPage)}
        />
      )}
      {selectedUser && (
        <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong className="form-control-custom">User Name: </strong>
              {selectedUser.userName}
            </p>
            <p>
              <strong className="form-control-custom">Full Name: </strong>
              {selectedUser.firstName + " " + selectedUser.lastName}
            </p>
            <p>
              <strong className="form-control-custom">Email: </strong>
              {selectedUser.email}
            </p>
            <p>
              <strong className="form-control-custom">Address: </strong>
              {selectedUser.address}
            </p>
            <p>
              <strong className="form-control-custom">Phone Number: </strong>
              {selectedUser.phoneNumber}
            </p>
            <p>
              <strong className="form-control-custom">Role: </strong>
              {selectedUser.role}
            </p>
            <p>
              <strong className="form-control-custom">Status: </strong>
              <Badge
                variant={selectedUser.isActive ? "success" : "danger"}
                className={
                  selectedUser.isActive ? "bg-success bg-sm" : "bg-danger bg-sm"
                }
              >
                {selectedUser.isActive ? "Active" : "Inactive"}
              </Badge>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDetailModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showResetPasswordModal && (
        <Modal
          show={showResetPasswordModal}
          onHide={() => setShowResetPasswordModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title className="form-control-custom">Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="newPassword">
                <Form.Label className="form-control-custom">New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label className="form-control-custom">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          {passwordMismachError && <ErrorProvider error={passwordMismachError} />}
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowResetPasswordModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleResetPasswordSubmit}>
              Reset Password
            </Button>
          </Modal.Footer>
        </Modal>
      )}
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
          disabled={startIndex + 7 >= users.length}
          block
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UsersInformation;
