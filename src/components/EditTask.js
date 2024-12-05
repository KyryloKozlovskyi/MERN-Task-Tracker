import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [_id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [due, setDueDate] = useState("");
  const [image, setImage] = useState("");
  const [uplImg, setUplImage] = useState(null);
  const [statusColor, setStatusColor] = useState("text-primary");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/task/${id}`)
      .then((response) => {
        const task = response.data;
        setId(task._id);
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setDueDate(task.due);
        setImage(task.image);
        setUplImage(task.uplImg);
        setStatusColor(getStatusColor(task.status));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    setStatusColor(getStatusColor(value));
  };

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
      .put(`http://localhost:4000/api/task/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Task</h2>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default EditTask;
