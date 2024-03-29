import React, { useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import LogoutLink from "../../pages/logout/Logout";
import { useAuth } from "../../../context/AuthContext";

function MyNavbar({ links, title, role, profile }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      className="d-flex justify-content-between"
    >
      <Navbar.Brand className="ms-2">{title}</Navbar.Brand>
      <Navbar.Toggle onClick={() => setNavbarOpen(!navbarOpen)}>
        <FaBars />
      </Navbar.Toggle>
      <Navbar.Collapse className="justify-content-end">
        <Nav className="d-flex align-items-center ml-auto">
          {links.map((link, index) => {
            if (link.children) {
              return (
                <NavDropdown
                  key={index}
                  title={link.name}
                  id="basic-nav-dropdown"
                  className="dropdown-menu-right bg-dark text-light"
                >
                  {link.children.map((child, index) => (
                    <NavDropdown.Item
                      key={index}
                      href={child.url}
                      className="form-control-custom"
                    >
                      {child.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              );
            } else {
              return (
                <Nav.Link key={index} href={link.url}>
                  {link.name}
                </Nav.Link>
              );
            }
          })}
          <div style={{ paddingLeft: "20px" }}>
            <div className="ms-3">
              {user && (
                <NavDropdown
                  title={<FaUser />}
                  id="basic-nav-dropdown"
                  className="dropdown-menu-right bg-dark text-light"
                  align="end"
                >
                  <NavDropdown.Item
                    href={profile}
                    className="form-control-custom"
                  >
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="form-control-custom">
                    <LogoutLink />
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </div>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
