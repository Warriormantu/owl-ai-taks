const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/todoapp")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
