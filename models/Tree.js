const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TreeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sciName: {
      type: String,
      required: true
  },
  range: {
    type: String,
    required: true
  }
});

const Tree = mongoose.model("Tree", TreeSchema);

module.exports = Tree;