import "../pages/css/Login.css";
import jwtDecode from "jwt-decode";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useAuthContext } from "../Hooks/useAuthcontext";
import { useEffect } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const Login = () => {
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stateFields = { email, password };
    const response = await fetch("/user/login", {
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

    if (rememberMe) {
      localStorage.setItem("rememberMe", true);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    }

    if (response.ok) {
      console.log(json.accessToken);
      const { id, role } = jwtDecode(json.accessToken);
      if (role === "ROLE_DRIVER") {
        // Redirect admin to the admin page
        window.location.href = "/driver";
      } else if (role === "ROLE_EMPLOYEE") {
        // Redirect user to the user page
        window.location.href = "/employee";
      } else if (role === "ROLE_DIRECTOR") {
        window.location.href = "/director";
      } else {
        // Redirect to a default page if role is unknown
        window.location.href = "/";
      }
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setEmail("");
      setPassword("");
      setError("");
    }
  };

  useEffect(() => {
    const rememberMeValue = localStorage.getItem("rememberMe");
    if (rememberMeValue === "true") {
      const savedEmail = localStorage.getItem("email");
      const savedPassword = localStorage.getItem("password");
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  return (
    <div>
      <div>
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
                Login
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
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className="d-flex justify-content-between mx-2 mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <a href="/forgotpassword">Forgot Password?</a>
              </div>
              {error && <div className="error">{error}</div>}
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={handleSubmit}>
                  Sign in
                </Button>
              </div>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Login;
