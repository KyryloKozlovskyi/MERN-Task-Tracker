import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Switch from "react-switch";

const NavigationBar = ({ theme, toggleTheme }) => {
  return (
    <Navbar
      bg={theme === "light" ? "light" : "dark"}
      variant={theme}
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="/">TaskTracker</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/favoriteTasks">Favorite Tasks</Nav.Link>
          <Nav.Link href="/getTasks">All Tasks</Nav.Link>
          <Nav.Link href="/createTask">New Task</Nav.Link>
        </Nav>
        <div className="d-flex align-items-center">
          <span className="me-2">
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </span>
          {/* Toggle Switch */}
          <Switch
            className="border border-dark"
            onChange={toggleTheme}
            checked={theme === "dark"}
            onColor="#343a40"
            offColor="#D2D2D2"
            checkedIcon={false}
            uncheckedIcon={false}
            height={20}
            width={40}
          />
        </div>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
