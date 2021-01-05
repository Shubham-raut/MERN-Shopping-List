import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';
import Logout from './auth/Logout';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import { useSelector } from 'react-redux';

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <Navbar color="dark" dark expand="sm" className="mb-5">
      <Container>
        <NavbarBrand href="/">ShoppingList</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuthenticated ? (
              <>
                <NavItem>
                  <RegisterModal />
                </NavItem>
                <NavItem>
                  <LoginModal />
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <span className="navbar-text mr-3">
                    <b>{user ? `Welcome ${user.name.slice(0, 15)}` : ''}</b>
                  </span>
                </NavItem>
                <NavItem>
                  <Logout />
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
