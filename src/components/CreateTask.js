import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Component to create a new task
const CreateTask = () => {
  const navigate = useNavigate();

  // State variables to manage form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending"); // Task status (default: Pending)
  const [due, setDueDate] = useState("");
  const [image, setImage] = useState(""); // Image URL
  const [uplImg, setUplImage] = useState(null); // Uploaded image file
  const [statusColor, setStatusColor] = useState("text-primary"); // Status color for dynamic styling

  // Handle status changes and dynamically update color based on status
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    switch (value) {
      case "Pending":
        setStatusColor("text-primary");
        break;
      case "In Progress":
        setStatusColor("text-warning");
        break;
      case "Completed":
        setStatusColor("text-success");
        break;
      default:
        setStatusColor("text-primary");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

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

    // Send POST request to backend API
    axios
      .post("http://localhost:4000/api/tasks", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/getTasks"); // Navigate to task list page after success
      })
      .catch((err) => console.log(err.response?.data || err));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="form-group mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description Input */}
        <div className="form-group mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
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
            required
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
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
