import React from "react";
import TaskItem from "./TaskItem";
import Row from "react-bootstrap/Row";

// Tasks Component
// Displays a list of tasks by mapping them to individual TaskItem components
const Tasks = (props) => {
  return (
    <div className="container mt-5">
      <Row className="g-4">
        {/* Map over tasks and render a TaskItem for each task */}
        {props.tasks.map((task) => (
          <TaskItem myTask={task} key={task._id} Reload={props.ReloadData} />
        ))}
      </Row>
    </div>
  );
};

export default Tasks;
