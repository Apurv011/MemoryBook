const mongoose = require('mongoose');

const memorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  author_name: { type:String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String },
  comments: {type: Array, default:[]},
  image: { type: String, default:"" }
});

module.exports = mongoose.model('Memory', memorySchema);
