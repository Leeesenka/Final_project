import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container, Form, Navbar, Offcanvas, Nav } from 'react-bootstrap';
import { faHouse} from '@fortawesome/free-solid-svg-icons'
const MyNavbar = () => {
  return (
    <Navbar expand={false} className="bg-transparent">
      <Container fluid>
      <Link className="navbar-brand" to="/main">
      <FontAwesomeIcon id='home-flag' icon={faHouse} />
  
        </Link>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/ticket_table">Ticket Table</Nav.Link>
              <Nav.Link href="/client_table">Client Table</Nav.Link>
              <Nav.Link href="/">Main</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
