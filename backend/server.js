// Load environment variables from .env file
require("dotenv").config();

// Server port, default 4000
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
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the database connection fails
  });

// Configure Multer for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define a Mongoose schema for tasks
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  due: { type: String, required: true },
  image: String, // URL of the image
  uplImg: {
    data: Buffer, // Image data stored in binary
    contentType: String, // Type of the uploaded image (e.g., "image/png")
  },
  isFavorite: { type: Boolean, default: false }, // True if the task is a favorite
});

// Create a Mongoose model for tasks
const Task = mongoose.model("Task", taskSchema);

// API Routes

// Create a new task
app.post("/api/tasks", upload.single("uplImg"), async (req, res) => {
  try {
    const { title, description, status, due, image } = req.body;

    if (!title || !description || !status || !due) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const uplImg = req.file
      ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        }
      : null;

    const newTask = new Task({
      title,
      description,
      status,
      due,
      image,
      uplImg,
    });
    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch a single task by its ID
app.get("/api/task/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch all favorite tasks
app.get("/api/favorite-tasks", async (req, res) => {
  try {
    const favoriteTasks = await Task.find({ isFavorite: true });
    res.json(favoriteTasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update an existing task
app.put("/api/task/:id", upload.single("uplImg"), async (req, res) => {
  try {
    const { title, description, status, due, image } = req.body;

    if (!title || !description || !status || !due) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const uplImg = req.file
      ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        }
      : null;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, due, image, uplImg },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Toggle favorite status of a task
app.put("/api/task/:id/favorite", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isFavorite = !task.isFavorite;
    await task.save();
    res.json({ message: "Favorite status updated", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete a task by its ID
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

// Global error handler for uncaught routes
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
