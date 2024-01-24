const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Score = require("./models/scoreModel");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi!!");
});

app.get("/scores", async (req, res) => {
  try {
    const scores = await Score.find({}).sort({ score: 1 });

    res.status(200).json(scores);
  } catch (error) {
    console.log(error.message);
    res.statusMessage(500).json({ message: error.message });
  }
});

app.post("/scores", async (req, res) => {
  try {
    const score = await Score.create(req.body);
    res.status(200).json(score);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`node is listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
