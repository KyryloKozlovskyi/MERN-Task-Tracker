import React from "react";
import TaskItem from "./TaskItem";
import Row from "react-bootstrap/Row";

// Tasks component
const Tasks = (props) => {
  // Maps the tasks to TaskItem components
  return (
    <div className="container mt-5">
      <Row className="g-4">
        {props.tasks.map((task) => (
          <TaskItem myTask={task} key={task._id} Reload={props.ReloadData} />
        ))}
      </Row>
    </div>
  );
};

export default Tasks; // Exports the component
