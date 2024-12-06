import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import TaskItem from "./TaskItem"; // Import TaskItem component
import { Container } from "react-bootstrap";

const FavoriteTasks = () => {
  const [favoriteTasks, setFavoriteTasks] = useState([]);

  useEffect(() => {
    // Fetch favorite tasks from the server
    axios
      .get("http://localhost:4000/api/favorite-tasks")
      .then((response) => {
        setFavoriteTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite tasks:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Favorite Tasks</h2>
      <Container className="mt-5">
        {favoriteTasks.map((task) => (
          <TaskItem key={task._id} myTask={task} /> // Pass necessary props
        ))}
      </Container>
    </div>
  );
};

export default FavoriteTasks;
