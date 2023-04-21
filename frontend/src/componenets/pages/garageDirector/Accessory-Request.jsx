import React, { useState, useEffect } from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import Avatar from "react-avatar";
import api from "../../../api/api";
import SparePartRequestTable from "../../common/sparepart/SparePartRequestTable";
import { useAuth } from "../../../context/AuthContext";
import { ROLE_GARAGEDIRECTOR } from "../../../constants/index";

const AccessoryRequest = ({ link }) => {
  const { user } = useAuth();

  const [requests, setRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    // Fetch the user's spare Part requests from your server API
    api
      .get("/Request/sparePart")
      .then((response) => {
        console.log(response.data.data);
        setRequest(response.data.data);
        setIsLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching Spare Part requests:", error)
      );
  }, []);
  console.log(requests);
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

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  );
  const inProgressRequests = requests.filter(
    (request) => request.status === "in-progress"
  );
  const completedRequests = requests.filter(
    (request) => request.status === "completed"
  );
  const canceledRequests = requests.filter(
    (request) => request.status === "canceled"
  );

  const handleApproveClick = async (request) => {
    try {
      await api.put(`/Request/sparePart/${request._id}`, {
        status: "completed",
      });
      const response = await api.get("/Request/sparePart");
      setRequest(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectClick = async (request, rejectReason) => {
    try {
      await api.put(
        `/Request/sparePart/${request._id}`,
        {
          status: "canceled",
        },
        {
          rejectReason,
        }
      );
      const response = await api.get("/Request/sparePart");
      setRequest(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendToStore = async (request, rejectReason) => {
    try {
      await api.put(
        `/Request/sparePart/${request._id}`,
        {
          status: "in_progress",
        },
        {
          rejectReason,
        }
      );
      const response = await api.get("/Request/sparePart");
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
    <>
      <Tabs
        activeKey={activeTab}
        onSelect={handleTabSelect}
        id="vehicle-request-tabs"
        className="my-2"
      >
        <Tab eventKey="pending" title="Pending Requests">
          <SparePartRequestTable
            requests={pendingRequests}
            handleApproveClick={handleApproveClick}
            handleRejectClick={handleRejectClick}
            handleRequestClick={handleRequestClick}
            handleSendToStore={handleSendToStore}
          />
        </Tab>
        <Tab eventKey="rejected" title="In Progress Requests">
          <SparePartRequestTable requests={inProgressRequests} />
        </Tab>
        <Tab eventKey="approved" title="Completed Requests">
          <SparePartRequestTable requests={completedRequests} />
        </Tab>
        <Tab eventKey="canceled" title="Canceled Requests">
          <SparePartRequestTable requests={canceledRequests} />
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
    </>
  );
};

export default AccessoryRequest;
