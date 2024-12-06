import React, { useEffect, useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TaskItem from "./TaskItem"; // Import TaskItem component

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
      <Row>
        {favoriteTasks.map((task) => (
          <TaskItem key={task._id} myTask={task} Reload={() => {}} /> // Pass necessary props
        ))}
      </Row>
    </div>
  );
};

export default FavoriteTasks;
