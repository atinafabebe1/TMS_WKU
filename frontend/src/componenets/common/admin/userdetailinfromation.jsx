import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import api from "../../../api/api";

const UserDetail = ({ user, showModal, handleCloseModal }) => {
  console.log(user);
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>
            Name: {user?.firstName} {user?.lastName}
          </p>
          <p>Email: {user?.email}</p>
          <p>Phone Number: {user?.phoneNumber}</p>
          <p>Role: {user?.role}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserDetail;
