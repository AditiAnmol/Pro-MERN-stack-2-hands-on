import React from 'react';
import { Glyphicon, Grid, MenuItem, Nav, Navbar, NavDropdown, NavItem, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Content from './Content.jsx';

const NavBar = () => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>Issue Tracker</Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer exact to="/">
                    <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer exact to="/issues">
                    <NavItem>Issue List</NavItem>
                </LinkContainer>
                <LinkContainer exact to="/report">
                    <NavItem>Report</NavItem>
                </LinkContainer>
            </Nav>
            <Nav pullRight>
                <NavItem>
                    <OverlayTrigger
                        delayShow={200}
                        placement="left"
                        overlay={<Tooltip id="create-issue">Create Issue</Tooltip>}
                    >
                        <Glyphicon glyph="plus" />
                    </OverlayTrigger>
                </NavItem>
                <NavDropdown
                    id="user-dropdown"
                    title={<Glyphicon glyph="option-vertical" />}
                    noCaret
                >
                    <MenuItem>About</MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar>
    )
}

function Footer() {
    return (
        <small>
            <p className="text-center">
                Full source code available at this
                {' '}
                <a href="https://github.com/vasansr/pro-mern-stack-2">
                    Github repository
                </a>
            </p>
        </small>
    )
}

const Page = () => {
    return (
        <div>
            <NavBar />
            <Grid fluid><Content /></Grid>
            <Footer />
        </div>
    )
}

export default Page
