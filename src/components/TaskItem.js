import React from "react";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Buffer } from "buffer";

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

  return (
    <div>
      <Card>
        <Card.Header>{props.myTask.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>{props.myTask.description}</p>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={props.myTask.title}
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "10px",
                }}
              />
            )}
            <footer>
              Due: {props.myTask.due} <br />
              <span>Status: {props.myTask.status}</span>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TaskItem; // Exports the component
