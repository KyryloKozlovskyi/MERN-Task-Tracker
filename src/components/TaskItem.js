import React from "react";
import { useEffect } from "react";
import { Buffer } from "buffer";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

// Logs new data to the console
function TaskItem(props) {
  useEffect(() => {
    console.log("Task Item:", props.myTask);
  }, [props.myTask]);

  // Checks if the image is uploaded and converts it to base64
  const imageUrl = props.myTask.uplImg
    ? `data:${props.myTask.uplImg.contentType};base64,${Buffer.from(
        props.myTask.uplImg.data
      ).toString("base64")}`
    : props.myTask.image;

  console.log("uplImg Data:", props.myTask.uplImg);

  // Determine card color based on task status
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

  return (
    <Col xs={12} sm={6} md={4} className="mb-4 px-4 ">
      <Card
        className={`h-100 p-3 border border-dark ${getStatusColor(
          props.myTask.status
        )}`}
      >
        <Card.Header className="border border-dark rounded">
          {props.myTask.title}
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p className="border-bottom border-dark p-2">
              {props.myTask.description}
            </p>
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
        <Card.Footer className="border border-dark mb-1 rounded">
          Due: {props.myTask.due} <br />
          <span>Status: {props.myTask.status}</span>
        </Card.Footer>
        <Link
          to={"/edit/" + props.myTask._id}
          className="btn text-white border border-dark"
        >
          Edit
        </Link>
      </Card>
    </Col>
  );
}

export default TaskItem; // Exports the component
