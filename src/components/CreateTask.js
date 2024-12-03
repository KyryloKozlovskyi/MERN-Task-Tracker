import React, { useState } from "react";
import axios from "axios";

// Create component
const CreateTask = () => {
  // Adds state variables to functional components
  // Stores data returned from an API and manages the state of the application.
  const [title, setTitle] = useState(""); // manages title state
  const [description, setDescription] = useState(""); // manages year state
  const [status, setStatus] = useState(""); // manages poster state
  const [due, setDueDate] = useState(""); // manages poster state
  const [image, setImage] = useState(""); // manages poster state

  // Logs data submited to the form to the console
  // Logs data submited to the form to the console
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, description, status, due, image); // Logs data to the console

    const task = {
      title: title,
      description: description,
      status: status,
      due: due,
      image: image,
    };

    axios
      .post("http://localhost:4000/api/tasks", task)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  };
  // Returns the relevant message
  return (
    <div>
      <h2>This is my Create Component.</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/*Input box for task title*/}
          <label>Add Task Title: </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {/*Input box for task description*/}
          <label>Add Task Description: </label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {/*Input box for task status*/}
          <label>Add Task Status: </label>
          <input
            type="text"
            className="form-control"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
          {/*Input box for due date*/}
          <label>Add Task Due Date: </label>
          <input
            type="text"
            className="form-control"
            value={due}
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
          />
          {/*Input box for task image*/}
          <label>Add Task Image: </label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </div>
        {/*Submit button*/}
        <input type="submit" value="Add Task" />
      </form>
    </div>
  );
};

export default CreateTask; // Exports the component
