require("dotenv").config();
const port = process.env.SERVER_PORT || 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

// Enable CORS for all requests
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

// Parse incoming request bodies in a middleware before handlers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB database using Mongoose
mongoose.connect(process.env.MONGO_URL);

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a schema for tasks
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  due: String,
  image: String,
  uplImg: {
    data: Buffer,
    contentType: String,
  },
});

// Create a model for the schema
const Task = mongoose.model("Task", taskSchema);

// Create a new task in MongoDB database
app.post("/api/tasks", upload.single("uplImg"), async (req, res) => {
  const { title, description, status, due, image } = req.body;
  const uplImg = req.file
    ? {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }
    : null;
  const newTask = new Task({ title, description, status, due, image, uplImg });
  await newTask.save();
  res.status(201).json({ message: "Task created successfully", task: newTask });
});

// Fetch all tasks from MongoDB
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

// Port listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
