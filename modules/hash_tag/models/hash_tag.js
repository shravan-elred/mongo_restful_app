const mongoose = require("mongoose");

const hashTagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const HashTag = mongoose.model("HashTag", hashTagSchema);

module.exports = HashTag;
