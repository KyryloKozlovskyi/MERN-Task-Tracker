import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem"; // Reuse TaskItem component
import { Container } from "react-bootstrap";

// FavoriteTasks Component
// Fetches and displays a list of favorite tasks
const FavoriteTasks = () => {
  const [favoriteTasks, setFavoriteTasks] = useState([]); // State to store favorite tasks

  // Fetch favorite tasks from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/favorite-tasks")
      .then((response) => {
        setFavoriteTasks(response.data); // Update state with fetched tasks
      })
      .catch((error) => {
        console.error("Error fetching favorite tasks:", error);
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Favorite Tasks</h2>
      {/* Container for task items */}
      <Container className="mt-5">
        {favoriteTasks.length > 0 ? (
          favoriteTasks.map((task) => (
            <TaskItem key={task._id} myTask={task} /> // Render each task using TaskItem
          ))
        ) : (
          <p>No favorite tasks available. Add some tasks to your favorites!</p>
        )}
      </Container>
    </div>
  );
};

export default FavoriteTasks;
