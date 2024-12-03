import React from "react";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";

// Logs new data to the console
function TaskItem(props) {
  useEffect(() => {
    console.log("Task Item:", props.myTask);
  }, [props.myTask]);
  return (
    <div>
      <Card>
        <Card.Header>{props.myTask.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>{props.myTask.description}</p>
            <img
              src={props.myTask.image}
              alt={props.myTask.title}
              style={{ width: "100px", height: "100px", marginBottom: "10px" }}
            />
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
