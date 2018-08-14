const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
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

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;