import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import './navbar.css'
function NavBar(){
	return(
 <Navbar bg="primary" variant="dark" className="navtest">
   <Container>
    <Navbar.Brand href="/">Word Game</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/about">About</Nav.Link>
    </Nav>
   </Container>
  </Navbar>

)
}
export default NavBar;