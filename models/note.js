const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: mongoose.Schema.Types.ObjectId },
  author_name: { type:String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String },
  image: { type: String },
});

module.exports = mongoose.model('Note', noteSchema);
// https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616__340.jpg
