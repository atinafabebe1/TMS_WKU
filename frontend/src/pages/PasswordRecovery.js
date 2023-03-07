import "../pages/css/Login.css";

import Button from "react-bootstrap/Button";
import React, { useState } from "react";

import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInput,
} from "mdb-react-ui-kit";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stateFields = { email };
    const response = await fetch("/user", {
      method: "POST",
      body: JSON.stringify(stateFields),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
  };

  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  return (
    <div>
      <div className="pages">
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <MDBTabs
            pills
            justify
            className="mb-3 d-flex flex-row justify-content-between"
          >
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick("tab1")}
                active={justifyActive === ""}
              >
                Enter Your Email to Forgot Password
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
          {/* sign in content */}
          <MDBTabsContent>
            <MDBTabsPane show={justifyActive === "tab1"}>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form1"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <Button variant="primary" size="lg" onClick={handleSubmit}>
                Forgot
              </Button>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBContainer>
      </div>
    </div>
  );
};

export default ForgetPassword;
