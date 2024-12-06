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
