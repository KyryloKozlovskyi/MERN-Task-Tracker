import React from "react";
import { Container } from "react-bootstrap";

// Footer Component
// Displays a footer section with a dark background and centered white text
const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      {/* Container for aligning content within the footer */}
      <Container>
        <h5>My Footer</h5>
      </Container>
    </footer>
  );
};

export default Footer;
