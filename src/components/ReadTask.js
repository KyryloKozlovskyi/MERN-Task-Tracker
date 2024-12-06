import Tasks from "./Tasks"; // Import Tasks component
import { useEffect, useState } from "react";
import axios from "axios";

// Component to fetch and display tasks
function ReadTask() {
  const [tasks, setTasks] = useState([]); // State to store task data

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/tasks")
      .then((response) => {
        setTasks(response.data); // Set fetched tasks to state
      })
      .catch((error) => {
        console.log("Error fetching tasks:", error); // Log errors to console
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to reload task data
  const Reload = () => {
    console.log("Reloading task data...");
    axios
      .get("http://localhost:4000/api/tasks")
      .then((response) => {
        setTasks(response.data); // Update state with the new data
      })
      .catch((error) => {
        console.error("Error reloading data:", error); // Log errors during reload
      });
  };

  return (
    <div>
      <h2>This is my Read Component.</h2>
      {/* Pass tasks and reload functionality as props to Tasks component */}
      <Tasks tasks={tasks} ReloadData={Reload} />
    </div>
  );
}

export default ReadTask;
