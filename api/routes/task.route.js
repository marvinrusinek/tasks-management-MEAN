const express = require('express');
const app = express();
const taskRoutes = express.Router();

// Require Task model in our routes module
const Task = require('../models/Task');

// Defined store route
taskRoutes.route('/add').post(function (req, res) {
  const task = new Task(req.body);
  task.save()
    .then(task => {
      res.status(200).json({'Task': 'Task has been added successfully'});
    })
  .catch(err => {
    res.status(400).send("Unable to save to database");
  });
});

// Defined get data(index or listing) route
taskRoutes.route('/').get(function (req, res) {
  Task.find(function (err, tasks){
    if(err){
      console.log(err);
    }
    else {
      res.json(tasks);
    }
  });
});

// Defined edit route
taskRoutes.route('/edit/:id').get(function (req, res) {
  const id = req.params.id;
  Task.findById(id, function (err, task){
    res.json(task);
  });
});

//  Defined update route
taskRoutes.route('/update/:id').post(function (req, res) {
  Task.findById(req.params.id, function(err, task) {
    if (!task)
      res.status(404).send("Record not found");
    else {
      task.TaskTitle = req.body.TaskTitle;
      task.TaskStatus = req.body.TaskStatus;
      task.TaskDateStarted = req.body.TaskDateStarted;
      task.TaskExpectedTime = req.body.TaskExpectedTime;
      task.TaskDuration = req.body.TaskDuration;
      task.TaskPriority = req.body.TaskPriority;

      task.save().then(task => {
        res.json('Update complete');
    })
    .catch(err => {
        res.status(400).send("Unable to update the database");
    });
    }
  });
});

// Defined delete | remove | destroy route
taskRoutes.route('/delete/:id').get(function (req, res) {
  Task.findByIdAndRemove({_id: req.params.id}, function(err, task){
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = taskRoutes;
