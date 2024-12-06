import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";

// NavigationBar Component
// Provides a navigation menu to switch between different pages
const NavigationBar = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/favoriteTasks">TaskTracker</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            href="/favoriteTasks"
            active={location.pathname === "/favoriteTasks"}
          >
            Favorite Tasks
          </Nav.Link>
          <Nav.Link href="/getTasks" active={location.pathname === "/getTasks"}>
            All Tasks
          </Nav.Link>
          <Nav.Link
            href="/createTask"
            active={location.pathname === "/createTask"}
          >
            New Task
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
