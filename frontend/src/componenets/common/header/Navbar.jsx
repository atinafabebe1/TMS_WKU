import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import React, { useState } from 'react';
import LogoutButton from '../../pages/logout/Logout';

function MyNavbar({ links, title }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/" style={{ fontWeight: 'bold', color: '#fff' }}>
        <span style={{ marginLeft: '2rem', fontSize: '1.5rem' }}>{title}</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <span className="navbar-toggler-icon" />}
      </Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav" className={menuOpen ? 'show' : ''}>
        <Nav className="ms-auto" style={{ marginRight: '2rem',}} >
          {links.map((link, index) => {
            if (link.children) {
              return (
                <NavDropdown key={index} title={link.name} style={{ fontWeight: 'bold', color: '#fff' }} className="my-dropdown" >
                  {link.children.map((child, index) => (
                    <NavDropdown.Item key={index} href={child.url} style={{ fontWeight: 'bold', color: '#212529' }}>
                      {child.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              );
            } else {
              return (
                <Nav.Link key={index} href={link.url} style={{ fontWeight: 'bold', color: '#fff' }}>
                  {link.name}
                </Nav.Link>
              );
            }
          })}
            <Nav.Link style={{ fontWeight: 'bold', color: '#fff' }}><LogoutButton/></Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
