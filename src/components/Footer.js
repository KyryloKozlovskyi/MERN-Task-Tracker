import React from "react";
import { Container } from "react-bootstrap";

// Footer Component
// Dynamically updates the theme based on the current mode (light/dark)
const Footer = ({ theme }) => {
  return (
    <footer
      className={`mt-4 p-2 text-center ${
        theme === "light" ? "bg-light text-dark" : "bg-dark text-white"
      }`}
    >
      {/* Container for aligning content within the footer */}
      <Container>
        <p className="pt-3">2024 Data Representation & Querying Project</p>
        <p>MERN Task Tracker - Kyrylo Kozlovskyi</p>
      </Container>
    </footer>
  );
};

export default Footer;
