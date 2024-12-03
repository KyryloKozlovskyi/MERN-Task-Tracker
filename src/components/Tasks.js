import React from "react";
import TaskItem from "./TaskItem";

// Tasks component
const Tasks = (props) => {
  // Maps the tasks to TaskItem components
  return props.tasks.map((task, index) => {
    return <TaskItem myTask={task} key={index} />; // Use index as a temporary unique key
  });
};

export default Tasks; // Exports the component
