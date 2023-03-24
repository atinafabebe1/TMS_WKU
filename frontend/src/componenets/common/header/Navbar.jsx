import React, { useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import LogoutLink from "../../pages/logout/Logout";

function MyNavbar({ links, title, role }) {
  const [navbarOpen, setNavbarOpen] = useState(false);

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
                    <NavDropdown.Item key={index} href={child.url}>
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
          <div className="ms-3">
            <NavDropdown
              title={<FaUser />}
              id="basic-nav-dropdown"
              className="dropdown-menu-right bg-dark text-light"
              align="end"
            >
              <NavDropdown.Item href={role}>My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <LogoutLink />
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
