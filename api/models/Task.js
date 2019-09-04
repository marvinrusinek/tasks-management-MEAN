const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Task
const Task = new Schema({
  TaskTitle: {
    type: String
  },
  TaskStatus: {
    type: String
  },
  TaskDateStarted: {
    type: Date
  },
  TaskExpectedTime: {
    type: Number
  },
  TaskDuration: {
    type: Number
  },
  TaskPriority: {
    type: String
  }
},{
  collection: 'Task'
});

module.exports = mongoose.model('Task', Task);
