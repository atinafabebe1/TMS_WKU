import React, { useState, useEffect } from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import Avatar from "react-avatar";
import api from "../../../api/api";
import VehicleDisplayTable from "../../common/vehicle/VehicleDisplayTable";
import { useAuth } from "../../../context/AuthContext";

const DetailVehicleInfo = ({ link }) => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    // Fetch the user's spare
    //Part requests from your server API
    api
      .get("/VehicleRecord")
      .then((response) => {
        console.log(response.data.data);
        setVehicles(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching Vehicles:", error));
  }, []);
  console.log(vehicles);
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

  const notAvailableVehicle = vehicles.filter(
    (vehicle) => vehicle.assignedTo !== null
  );

  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.assignedTo === null
  );
  const deletedVehicles = vehicles.filter(
    (vehicle) => vehicle.isDeleted === true
  );

  const handleApproveClick = async (request) => {
    try {
      await api.put(`/Request/sparePart/${request._id}`, {
        status: "completed",
      });
      const response = await api.get("/Request/sparePart");
      setVehicles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCompletedtoBuyClick = async (request) => {
    try {
      await api.put(`/Request/sparePart/${request._id}`, {
        status: "completed",
      });
      const response = await api.get("/Request/sparePart");
      setVehicles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handledeleteClick = async (vehicle) => {
    try {
      await api.put(`/VehicleRecord/${vehicle._id}`, {
        isDeleted: true,
      });
      const response = await api.get("/VehicleRecord");
      setVehicles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendToStore = async (request, rejectReason) => {
    try {
      await api.put(
        `/Request/sparePart/${request._id}`,
        {
          status: "in-progress",
        },
        {
          rejectReason,
        }
      );
      const response = await api.get("/Request/sparePart");
      setVehicles(response.data.data);
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
        <Tab eventKey="availableVehicles" title="Available Vehicles">
          <VehicleDisplayTable
            vehicles={availableVehicles}
            handledeleteClick={handledeleteClick}
          />
        </Tab>
        <Tab eventKey="unavailableVehicle" title="UnavailableVehicle">
          <VehicleDisplayTable vehicles={notAvailableVehicle} />
        </Tab>

        <Tab eventKey="deletedVehicles" title="Deleted Vehicles">
          <VehicleDisplayTable vehicles={deletedVehicles} />
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

export default DetailVehicleInfo;
