import React, { useEffect } from "react";
import { Buffer } from "buffer";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// TaskItem Component
// Displays a single task with functionality to edit, delete, and display its details
function TaskItem(props) {
  const navigate = useNavigate();

  // Logs task data to the console whenever it changes
  useEffect(() => {
    console.log("Task Item:", props.myTask);
  }, [props.myTask]);

  // Generate the image URL (Base64 or regular URL)
  const imageUrl = props.myTask.uplImg
    ? `data:${props.myTask.uplImg.contentType};base64,${Buffer.from(
        props.myTask.uplImg.data
      ).toString("base64")}`
    : props.myTask.image;

  console.log("uplImg Data:", props.myTask.uplImg);

  // Determine the card color based on the task's status
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-primary text-white";
      case "In Progress":
        return "bg-warning text-white";
      case "Completed":
        return "bg-success text-white";
      default:
        return "bg-primary text-white";
    }
  };

  // Handle task deletion
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/api/task/${props.myTask._id}`)
      .then(() => {
        props.Reload(); // Reload the task list after deletion
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  // Navigate to the edit page for the task
  const handleEdit = () => {
    navigate(`/edit/${props.myTask._id}`);
  };

  // Handle toggling favorite status
  const handleFavorite = () => {
    axios
      .put(`http://localhost:4000/api/task/${props.myTask._id}/favorite`)
      .then((response) => {
        console.log(response.data.message);
        props.Reload(); // Reload the task list after updating favorite status
      })
      .catch((error) => {
        console.error("Error updating favorite status:", error);
      });
  };

  return (
    <Col xs={12} sm={6} md={4} className="mb-4 px-4">
      <Card
        className={`h-100 p-3 border border-dark ${getStatusColor(
          props.myTask.status
        )}`}
      >
        {/* Task Title */}
        <Card.Header className="border border-dark rounded">
          {props.myTask.title}
        </Card.Header>

        {/* Task Details */}
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p className="border-bottom border-dark p-2">
              {props.myTask.description}
            </p>
            {/* Display Task Image if available */}
            {imageUrl && (
              <div className="d-flex justify-content-center">
                <img
                  src={imageUrl}
                  alt={props.myTask.title}
                  className="img-fluid"
                  style={{
                    maxWidth: "50%",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
              </div>
            )}
          </blockquote>
        </Card.Body>

        {/* Task Footer with Due Date and Status */}
        <Card.Footer className="border border-dark mb-1 rounded">
          Due: {props.myTask.due} <br />
          <span>Status: {props.myTask.status}</span>
        </Card.Footer>

        {/* Action Buttons for Edit and Delete */}
        <div className="d-flex justify-content-between">
          <Button
            className="border border-dark mb-1 rounded"
            variant="primary"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            className="border border-dark mb-1 rounded d-flex justify-content-center align-items-center"
            onClick={handleFavorite}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              className={`bi bi-star${props.myTask.isFavorite ? "-fill" : ""}`}
              viewBox="0 0 16 16"
            >
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"></path>
            </svg>
          </Button>
          <Button
            className="border border-dark mb-1 rounded"
            variant="danger"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Card>
    </Col>
  );
}

export default TaskItem;
