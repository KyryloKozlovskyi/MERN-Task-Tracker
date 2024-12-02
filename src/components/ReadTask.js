import React from "react";
import Tasks from "./Tasks";

// ReadTask Component
const ReadTask = () => {
  // Sample data. Array of tasks
  const data = [
    {
      title: "Complete Project Proposal",
      description:
        "Write and submit the proposal for the new software project.",
      status: "pending",
      dueDate: "2023-12-05T00:00:00Z",
      image: "https://www.freeiconspng.com/uploads/tasks-icon-9.png",
    },
    {
      title: "Team Meeting",
      description:
        "Discuss project milestones and assign tasks to team members.",
      status: "completed",
      dueDate: "2023-12-01T14:00:00Z",
      image: "https://www.freeiconspng.com/uploads/tasks-icon-9.png",
    },
    {
      title: "Update Documentation",
      description: "Ensure all project documents are up to date and accurate.",
      status: "pending",
      dueDate: "2023-12-10T00:00:00Z",
      image: "https://www.freeiconspng.com/uploads/tasks-icon-9.png",
    },
    {
      title: "Client Feedback",
      description:
        "Review and implement feedback from the last client meeting.",
      status: "in-progress",
      dueDate: "2023-12-07T00:00:00Z",
      image: "https://www.freeiconspng.com/uploads/tasks-icon-9.png",
    },
    {
      title: "Code Review",
      description: "Review pull requests and merge approved changes.",
      status: "completed",
      dueDate: "2023-11-29T00:00:00Z",
      image: "https://www.freeiconspng.com/uploads/tasks-icon-9.png",
    },
    {
      title: "Prepare Presentation",
      description:
        "Create slides and speaking notes for the project update presentation.",
      status: "pending",
      dueDate: "2023-12-12T00:00:00Z",
      image: "https://www.freeiconspng.com/uploads/tasks-icon-9.png",
    },
    {
      title: "Database Backup",
      description:
        "Perform a full backup of the database before making schema changes.",
      status: "completed",
      dueDate: "2023-11-25T00:00:00Z",
      image: "https://www.freeiconspng.com/uploads/tasks-icon-9.png",
    },
    {
      title: "Write Test Cases",
      description: "Develop test cases for the new API endpoints.",
      status: "in-progress",
      dueDate: "2023-12-03T00:00:00Z",
      image: "https://www.freeiconspng.com/uploads/tasks-icon-9.png",
    },
  ];

  // Returns the relevant message and the tasks array
  return (
    <div>
      <h3>Hello from the ReadTask component</h3>
      <Tasks tasks={data} />
    </div>
  );
};

export default ReadTask; // Exports the component
