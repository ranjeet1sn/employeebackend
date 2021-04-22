const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  assignee: {
    type: Object,
    require: true,
    ref:"User"
  },
  priority: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  status:{
    type:Object,
    require:true
  }
});
module.exports = mongoose.model("Task", schema);
