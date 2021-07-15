const mongoose = require('mongoose');

const diarySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String },
});

module.exports = mongoose.model('Diary', diarySchema);
