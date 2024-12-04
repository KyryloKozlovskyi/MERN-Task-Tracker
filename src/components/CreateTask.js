import React, { useState } from "react";
import axios from "axios";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [due, setDueDate] = useState("");
  const [image, setImage] = useState("");
  const [uplImg, setUplImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("due", due);
    formData.append("image", image);
    if (uplImg) {
      formData.append("uplImg", uplImg);
    }

    axios
      .post("http://localhost:4000/api/tasks", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Status:</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Due Date:</label>
          <input
            type="date"
            className="form-control"
            value={due}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Image URL:</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Upload Image:</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setUplImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
