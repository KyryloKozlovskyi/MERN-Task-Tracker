import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import FavoriteTasks from "./components/FavoriteTasks";
import ReadTask from "./components/ReadTask";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import React, { useState } from "react";
import "./App.css";

// Main App Component
function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  ); // Initialize theme from localStorage or default to "light"

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Store theme state in localStorage
  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme; // Set theme class on body
  }, [theme]);

  return (
    <div className={`app ${theme} d-flex flex-column min-vh-100`}>
      <Router>
        {/* Pass theme and toggleTheme to NavigationBar */}
        <NavigationBar theme={theme} toggleTheme={toggleTheme} />
        <div className="flex-grow-1">
          {/* Routes */}
          <Routes>
            <Route path="/" element={<FavoriteTasks />} />
            <Route path="/favoriteTasks" element={<FavoriteTasks />} />
            <Route path="/getTasks" element={<ReadTask />} />
            <Route path="/createTask" element={<CreateTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
          </Routes>
        </div>
        <Footer theme={theme} />
      </Router>
    </div>
  );
}

export default App;
