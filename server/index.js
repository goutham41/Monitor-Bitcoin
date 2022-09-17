require("dotenv").config();

const mongoose = require("mongoose");
const connection = mongoose.connect(
  "mongodb+srv://sugarcosmetics:masaiuint5@cluster0.nfskqzh.mongodb.net/monitor?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
const express = require("express");
const MonitorRouter = require("./routes/Monitor");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/start", (req, res) => {
  res.send("server start");
});
app.use("/", MonitorRouter);
app.listen(process.env.PORT, async () => {
  await connection;
  console.log("connected to db");
  console.log(`Server started on ${process.env.PORT}`);
});
