const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  embedding: {
    type: [Number], // Array of numbers
    required: true,
  },
  source: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);