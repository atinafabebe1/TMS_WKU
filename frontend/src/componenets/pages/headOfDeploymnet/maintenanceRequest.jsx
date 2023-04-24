import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import MaintenanceRequestTables from "../../common/maintenance/maintenancerequesttable";
import api from "../../../api/api";

const HODMaintenanceRequestPage = () => {
  const [requests, setRequest] = useState([]);
  
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    // Fetch the user's vehicle requests from your server API
    api
      .get("/Request/maintenance")
      .then((response) => {
        console.log(response.data.data);
        setRequest(response.data.data);
      })
      .catch((error) =>
        console.error("Error fetching vehicle requests:", error)
      );
  }, []);
  function handleTabSelect(tabName) {
    setActiveTab(tabName);
  }

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  );
  const inProgressRequests = requests.filter(
    (request) =>
      request.status === "in-progress" ||
      request.status === "approved-to-buy" ||
      request.status === "rejected-to-buy"
  );
  const completedRequests = requests.filter(
    (request) => request.status === "completed"
  );
  const canceledRequests = requests.filter(
    (request) => request.status === "canceled"
  );

  const handleApproveClick = async (request) => {
    try {
      await api.put(`/Request/maintenance/${request._id}`, {
        status: "completed",
      });
      const response = await api.get("/Request/maintenance");
      setRequest(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCompletedtoBuyClick = async (request) => {
    try {
      await api.put(`/Request/maintenance/${request._id}`, {
        status: "completed",
      });
      const response = await api.get("/Request/maintenance");
      setRequest(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectClick = async (request, rejectReason) => {
    try {
      await api.put(
        `/Request/maintenance/${request._id}`,
        {
          status: "canceled",
        },
        {
          rejectReason,
        }
      );
      const response = await api.get("/Request/maintenance");
      setRequest(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendToGarageD = async (request, rejectReason) => {
    try {
      await api.put(
        `/Request/maintenance/${request._id}`,
        {
          status: "in-progress",
        },
        {
          rejectReason,
        }
      );
      const response = await api.get("/Request/maintenance");
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
        <MaintenanceRequestTables
          requests={pendingRequests}
          handleApproveClick={handleApproveClick}
          handleRejectClick={handleRejectClick}
          handleRequestClick={handleRequestClick}
          handleSendToGarageD={handleSendToGarageD}
        />
      </Tab>
      <Tab eventKey="rejected" title="In Progress Requests">
        <MaintenanceRequestTables
          requests={inProgressRequests}
          handleCompletedtoBuyClick={handleCompletedtoBuyClick}
        />
      </Tab>
      <Tab eventKey="approved" title="Completed Requests">
        <MaintenanceRequestTables requests={completedRequests} />
      </Tab>
      <Tab eventKey="canceled" title="Canceled Requests">
        <MaintenanceRequestTables requests={canceledRequests} />
      </Tab>
    </Tabs>
    </>
  );
};

export default HODMaintenanceRequestPage;
