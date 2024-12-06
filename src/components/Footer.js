import React from "react";
import { Container } from "react-bootstrap";

// Footer Component
// Displays a footer section with a dark background and centered white text
const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-4 p-2 text-center">
      {/* Container for aligning content within the footer */}
      <Container>
        <p className="pt-3">2024 Data Representation & Querying Project</p>
        <p>MERN Task Tracker - Kyrylo Kozlovskyi</p>
      </Container>
    </footer>
  );
};

export default Footer;
