// Load environment variables from .env file
require("dotenv").config();

// Define the server port, defaulting to 4000 if not specified
const port = process.env.SERVER_PORT || 4000;

// Import required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

// Initialize Express app
const app = express();

// Enable CORS for all incoming requests
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure Multer for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define a Mongoose schema for tasks
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  due: String,
  image: String, // URL of the image
  uplImg: {
    data: Buffer, // Image data stored in binary
    contentType: String, // Type of the uploaded image (e.g., "image/png")
  },
});

// Create a Mongoose model for tasks
const Task = mongoose.model("Task", taskSchema);

// API Routes

// 1. Create a new task
app.post("/api/tasks", upload.single("uplImg"), async (req, res) => {
  const { title, description, status, due, image } = req.body;

  // If an image is uploaded, process it
  const uplImg = req.file
    ? {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }
    : null;

  // Create and save the new task
  const newTask = new Task({
    title,
    description,
    status,
    due,
    image,
    uplImg,
  });
  await newTask.save();

  res.status(201).json({ message: "Task created successfully", task: newTask });
});

// 2. Fetch all tasks
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

// 3. Fetch a single task by its ID
app.get("/api/task/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});

// 4. Update an existing task
app.put("/api/task/:id", upload.single("uplImg"), async (req, res) => {
  try {
    const { title, description, status, due, image } = req.body;

    // If an image is uploaded, process it
    const uplImg = req.file
      ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        }
      : null;

    // Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status,
        due,
        image,
        uplImg,
      },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 5. Delete a task by its ID
app.delete("/api/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
