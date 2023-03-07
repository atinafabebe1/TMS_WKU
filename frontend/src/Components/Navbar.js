import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLogout } from "../Hooks/useLogout";
import { useAuthContext } from "../Hooks/useAuthcontext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListGroup from "react-bootstrap/ListGroup";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Button from "react-bootstrap/Button";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkmode = () => {
    setDarkMode(!darkMode);
  };

  const handleClick = () => {
    logout();
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h2>Wolkite University Transport Management System</h2>
        </Link>
        <nav>
          {user && (
            <ListGroup.Item variant="primary">
              <NotificationsNoneIcon color="white" /> <span> </span>
            </ListGroup.Item>
          )}
          <span> </span>
          {user && (
            <div>
              {" "}
              <span>{user.email}</span>
              <Button
                variant="secondary"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  width: "100px",
                  height: "30px",
                  border: "none",
                }}
              >
                <AccountCircleIcon color="light" />
              </Button>
              <div className={isOpen ? "dropdown-menu show" : "dropdown-menu"}>
                <ListGroup>
                  <ListGroup.Item
                    variant="primary"
                    action
                    href="/profile"
                    className="hover-effect"
                  >
                    <AccountCircleIcon color="primary" />
                    <span> </span>
                    Profile
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    onClick={toggleDarkmode}
                    className="hover-effect"
                  >
                    <DarkModeIcon color="primary" />
                    <span> </span>
                    {darkMode ? "Dark Mode" : "Light Mode"}
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    action
                    href="/profile"
                    className="hover-effect"
                  >
                    <SettingsApplicationsIcon color="primary" />
                    <span> </span>Setting
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    onClick={handleClick}
                    className="hover-effect"
                  >
                    <LogoutIcon color="primary" />
                    <span> </span>Logout
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          )}
          {!user && (
            <div>
              <Link to={"/Login"}>
                <button>Login</button>
              </Link>
            </div>
          )}
        </nav>
      </div>
      <hr></hr>
    </header>
  );
};

export default Navbar;
