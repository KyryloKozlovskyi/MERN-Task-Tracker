import React from "react";
import TaskItem from "./TaskItem";

// Tasks component
const Tasks = (props) => {
  // Maps the tasks to TaskItem components
  return props.tasks.map((task) => {
    return <TaskItem myTask={task} key={task.title} />;
  });
};

export default Tasks; // Exports the component
