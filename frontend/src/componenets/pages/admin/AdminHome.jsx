import React, { useState } from "react";
import { useEffect } from "react";
import { animated, useSpring } from "react-spring";
import Card from "react-bootstrap/Card";
import UserPieChart from "./userPieChart";
import api from "../../../api/api";

function AdminHome() {
  const [user, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalActiveCount, setTotalActiveCount] = useState(0);
  const [mechanic, setMechanic] = useState(0);

  const fetchUsersInformation = async (page) => {
    await api.get(`/user/getusers`).then((response) => {
      console.log(response);
      setUsers(response.data.data);
      setTotalCount(response.data.count);
    });
    await api.get(`/user/getusers?isActive=true`).then((response) => {
      console.log(response);
      setActiveUser(response.data.data);
      setTotalActiveCount(response.data.count);
    });
    await api.get(`/user/getusers?role=ROLE_DRIVER`).then((response) => {
      console.log(response);
      setUsers(response.data.data);
      setMechanic(response.data.count);
    });
  };

  useEffect(() => {
    fetchUsersInformation();
  }, []);

  // Define the animation styles using useSpring
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "20px",
          paddingLeft: "90px",
        }}
      >
        <animated.div style={fadeIn}>
          <Card
            style={{ width: "18rem" }}
            className="mb-2"
            padding="2px"
            bg="secondary "
          >
            <Card.Body className="text-dark">
              <Card.Text
                style={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Total User<br></br>
                {totalCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </animated.div>
        <animated.div style={fadeIn}>
          <Card
            style={{ width: "18rem" }}
            className="mb-2"
            padding="1px"
            bg="success"
          >
            <Card.Body>
              <Card.Text
                style={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Active User
                <br />
                {totalActiveCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </animated.div>
      </div>
      <div>
        <UserPieChart />
      </div>
    </>
  );
}

export default AdminHome;
