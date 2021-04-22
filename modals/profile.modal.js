const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  image: {
    type: Object,
    require: true,
  },
  number: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("Profile", schema);
