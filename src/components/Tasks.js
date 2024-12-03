import React from "react";
import TaskItem from "./TaskItem";

// Tasks component
const Tasks = (props) => {
  // Maps the tasks to TaskItem components
  return props.tasks.map((task) => {
    return <TaskItem myTask={task} key={task._id} />; // Use index as a temporary unique key
  });
};

export default Tasks; // Exports the component
