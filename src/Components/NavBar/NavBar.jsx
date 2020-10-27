import React, { useState } from 'react';
import { FiPower } from 'react-icons/fi';
// import classes from './NavBar.module.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavbarText
} from 'reactstrap';

import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ email, signout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Link className="navbar-brand" to="/">uriShortly</Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink className="nav-link" activeStyle={{
                                fontWeight: "bold",
                                color: "red"
                            }} to="/dashboard">Dashboard</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                activeStyle={{
                                    fontWeight: "bold",
                                    color: "red"
                                }}
                                className="nav-link" to="/urlslist">Urls</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText style={{ display: 'flex', justifyContent: 'center' }}>{email}<FiPower onClick={signout} /></NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;