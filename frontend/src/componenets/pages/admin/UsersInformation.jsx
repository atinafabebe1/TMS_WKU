import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Badge } from "react-bootstrap";
import api from "../../../api/api";
import Search from "../../common/search/search";
import DeleteConfirmationModal from "../../common/confirmDelete/confirmModal";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import RejectModal from "./RejectModal";

const UsersInformation = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(2);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const fetchUsersInformation = async (page) => {
    const limit = 10;
    await api
      .get(
        `/user/getusers?page=${page.page}&limit=${limit}&search=${searchQuery}`
      )
      .then((response) => {
        console.log(response);
        setUsers(response.data.data);
        setTotalCount(response.data.count);
        setPagination(response.data.pagination);
      });
  };

  useEffect(() => {
    fetchUsersInformation(currentPage);
  }, [searchQuery]);

  const handlePageChange = (page) => {
    fetchUsersInformation(page);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleEditClick = (id) => {
    console.log(id);
    navigate(`/admin/${id}`);
  };
  const handleDeleteUser = (id) => {
    setShowPasswordModal(true);
    setCurrentUserId(id);
  };

  return (
    <div>
      <div className="table-responsive p-2 my-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Users List</h2>
          <div>
            <Link to="/admin/register">
              <Button variant="success" className="btn-sm">
                <FaUserPlus /> Register new user
              </Button>
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-end my-1">
          <Search onSearch={handleSearch} />
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.role}</td>
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
                    variant="warning"
                    className="btn-sm mx-1"
                    onClick={() => handleEditClick(user.id)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
        )}{" "}
        <div className="d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {pagination.prev && (
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => handlePageChange(pagination.prev)}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
              )}
              {pagination.pages &&
                pagination.pages.map((page) => (
                  <li
                    className={`page-item ${
                      page === pagination.current ? "active" : ""
                    }`}
                    key={page}
                  >
                    <a
                      className="page-link"
                      onClick={() => handlePageChange(page)}
                      aria-label={`Page ${page}`}
                    >
                      {page}
                    </a>
                  </li>
                ))}
              {pagination.next && (
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => handlePageChange(pagination.next)}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default UsersInformation;
