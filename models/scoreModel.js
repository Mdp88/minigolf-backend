const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please insert your name"],
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
