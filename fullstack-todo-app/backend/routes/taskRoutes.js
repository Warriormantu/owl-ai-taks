const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE
router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title
  });
  await task.save();
  res.json(task);
});

// READ
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );
  res.json(updatedTask);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
