require("dotenv").config();

const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const express = require("express");
const MonitorRouter = require("./routes/Monitor")
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// "/?date=0125555&page=11&limit=5"
app.use("/start", (req, res) => {
  res.send("server start");
});
app.use("/", MonitorRouter);
app.listen(process.env.PORT, async () => {
  await connection;
  console.log("connected to db");
  console.log(`Server started on ${process.env.PORT}`);
});
