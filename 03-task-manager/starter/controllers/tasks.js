const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status;
    console.log(err);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`id:${id}`);
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${id}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${id}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) return res.status(404).json({ msg: "ID not found." });
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
