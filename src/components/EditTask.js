import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Component for editing an existing task
const EditTask = () => {
  const { id } = useParams(); // Extract task ID from route parameters
  const navigate = useNavigate(); // Navigation hook for redirection

  // State variables for task fields
  const [_id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [due, setDueDate] = useState("");
  const [image, setImage] = useState(""); // Task image URL
  const [uplImg, setUplImage] = useState(null); // Task uploaded image file
  const [statusColor, setStatusColor] = useState("text-primary"); // Status-specific styling

  // Fetch task data from the server on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/task/${id}`)
      .then((response) => {
        const task = response.data; // Extract task data
        setId(task._id);
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setDueDate(task.due);
        setImage(task.image);
        setUplImage(task.uplImg);
        setStatusColor(getStatusColor(task.status)); // Set status color based on status
      })
      .catch((error) => {
        console.log("Error fetching task data:", error);
      });
  }, [id]);

  // Determine the color for the task status
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-primary";
      case "In Progress":
        return "text-warning";
      case "Completed":
        return "text-success";
      default:
        return "text-primary";
    }
  };

  // Handle status change and update corresponding color
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    setStatusColor(getStatusColor(value));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare form data for API request
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("due", due);
    formData.append("image", image);
    if (uplImg) {
      formData.append("uplImg", uplImg);
    }

    // Send PUT request to update task
    axios
      .put(`http://localhost:4000/api/task/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Task updated successfully:", res.data);
        navigate("/getTasks"); // Redirect to tasks list
      })
      .catch((err) => console.log("Error updating task:", err));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="form-group mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description Input */}
        <div className="form-group mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Status Selector */}
        <div className="form-group mb-3">
          <label className="form-label">Status:</label>
          <select
            className={`form-control ${statusColor}`}
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Pending" className="text-primary">
              Pending
            </option>
            <option value="In Progress" className="text-warning">
              In Progress
            </option>
            <option value="Completed" className="text-success">
              Completed
            </option>
          </select>
        </div>

        {/* Due Date Input */}
        <div className="form-group mb-3">
          <label className="form-label">Due Date:</label>
          <input
            type="date"
            className="form-control"
            value={due}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Image URL Input */}
        <div className="form-group mb-3">
          <label className="form-label">Image URL:</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        {/* File Upload Input */}
        <div className="form-group mb-3">
          <label className="form-label">Upload Image:</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setUplImage(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditTask;
