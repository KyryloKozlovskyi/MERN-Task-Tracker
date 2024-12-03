// Enable EXPRESS
const express = require("express");
const app = express();
const port = 4000; // Port number

// Enable COORS to allow communication between app and server
// This middleware allows your frontend app to make API requests to the backend
const cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// body-parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection with Mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.egsdr.mongodb.net/tasksdb"
);

// Database schema and data model:
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  due: String,
  image: String,
});

const Task = mongoose.model("Task", taskSchema);

// Method to Add Data to MongoDB
// Updates the db
app.post("/api/tasks", async (req, res) => {
  const { title, description, status, due, image } = req.body;

  const newTask = new Task({ title, description, status, due, image });
  await newTask.save();

  res.status(201).json({ message: "Task created successfully", task: newTask });
});

// Fetch all movie records
// It’s sent back in JSON format.
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

// Retrieve Data by ID
// If a movie is found, it’s sent back in JSON format.
app.get("/api/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.send(task);
});

// Port listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log to the console
});
