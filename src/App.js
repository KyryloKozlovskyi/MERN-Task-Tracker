import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import ReadTask from "./components/ReadTask";
import CreateTask from "./components/CreateTask";

// App component with routing
function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/home" element={<Content />} />
        <Route path="/read" element={<ReadTask />} />
        <Route path="/create" element={<CreateTask />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
