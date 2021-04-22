const mongoose = require("mongoose");
const schema = mongoose.Schema({
  status:{
      type:Array
  }
});
module.exports = mongoose.model("Status", schema);
