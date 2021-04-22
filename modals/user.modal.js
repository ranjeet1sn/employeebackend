const mongoose = require("mongoose");
const schema = mongoose.Schema({
  email:{
    type: String
  },
  password:{
    type: String
  },
  color:{
    type:String
  }
});
module.exports = mongoose.model("User", schema);
