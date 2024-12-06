import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import FavoriteTasks from "./components/FavoriteTasks";
import ReadTask from "./components/ReadTask";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";

// Main App Component
// Provides routing and overall structure of the application
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <NavigationBar />
        {/* Main content area with dynamic routing */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<FavoriteTasks />} />
            <Route path="/favoriteTasks" element={<FavoriteTasks />} />
            <Route path="/getTasks" element={<ReadTask />} />
            <Route path="/createTask" element={<CreateTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
