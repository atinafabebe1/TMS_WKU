import React, { useState, useEffect } from "react";
import { Modal, Tabs, Tab, Row, Col } from "react-bootstrap";
import Avatar from "react-avatar";
import api from "../../../api/api";
import RequestTable from "./vehicleRequestTable";
import { useAuth } from "../../../context/AuthContext";
import { ROLE_HEADOFDEPLOYMENT } from "../../../constants/index";

const VehiclesRequest = ({ link }) => {
  const { user } = useAuth();
  const [requests, setRequest] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        console.log(link);
        const response = await api.get(link);
        setRequest(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRequest();
  }, []);

  useEffect(() => {
    console.log("selectedRequest");
    console.log(selectedRequest);
    const fetchPhoto = async (req) => {
      try {
        const response = await api.get(`/user/${req.user.image.photo}/image`, {
          responseType: "arraybuffer",
        });
        const blob = new Blob([response.data], {
          type: "image/jpeg",
        });
        const url = URL.createObjectURL(blob);
        setPhoto(url);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedRequest) {
      fetchPhoto(selectedRequest);
    } else {
      setPhoto(null);
    }
  }, [selectedRequest]);

  function handleTabSelect(tabName) {
    setActiveTab(tabName);
  }
  let pendingRequests;
  if (user.role === ROLE_HEADOFDEPLOYMENT) {
    pendingRequests = requests.filter(
      (request) =>
        request.firstApproval.status === "pending" &&
        request.status === "pending"
    );
  } else {
    pendingRequests = requests.filter((request) => {
      const result =
        request.status === "pending" &&
        request.firstApproval.status === "approved";
      return result;
    });
  }

  const approvedRequests = requests.filter(
    (request) => request.status === "approved"
  );
  const rejectedRequests = requests.filter(
    (request) => request.status === "rejected"
  );

  const handleApproveClick = async (request) => {
    try {
      await api.put(`/Request/vehicle/${request._id}/approve`);
      const response = await api.get("/Request/vehicle");
      setRequest(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectClick = async (request, rejectReason) => {
    try {
      await api.put(`/Request/vehicle/${request._id}/reject`, { rejectReason });
      const response = await api.get("/Request/vehicle");
      setRequest(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setShowUserModal(true);
  };

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h4 className="form-control-custom">Last Sent Vehicle Request</h4>
        </Col>
      </Row>
      <hr></hr>

      <Tabs
        activeKey={activeTab}
        onSelect={handleTabSelect}
        id="vehicle-request-tabs"
        className="form-control-custom"
      >
        <Tab eventKey="pending" title="Pending Requests">
          <RequestTable
            requests={pendingRequests}
            handleApproveClick={handleApproveClick}
            handleRejectClick={handleRejectClick}
            handleRequestClick={handleRequestClick}
          />
        </Tab>
        <Tab eventKey="approved" title="Approved Requests">
          <RequestTable
            requests={approvedRequests}
            handleRequestClick={handleRequestClick}
          />
        </Tab>
        <Tab eventKey="rejected" title="Rejected Requests">
          <RequestTable
            requests={rejectedRequests}
            handleRequestClick={handleRequestClick}
          />
        </Tab>
      </Tabs>

      {selectedRequest && (
        <Modal
          show={showUserModal}
          onHide={() => setShowUserModal(false)}
          size="md"
        >
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-light">
            <div className="d-flex align-items-center mb-3">
              <div className="me-3">
                {photo ? (
                  <Avatar src={photo} size={80} round={true} />
                ) : (
                  <Avatar
                    name={`${selectedRequest.user.firstName} ${selectedRequest.user.lastName}`}
                    size={80}
                    round={true}
                  />
                )}
              </div>
              <h5 className="mb-0 ml-3">
                {selectedRequest.user.firstName} {selectedRequest.user.lastName}
              </h5>
            </div>
            <p>
              <strong>Email:</strong> {selectedRequest.user.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedRequest.user.phoneNumber}
            </p>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default VehiclesRequest;
