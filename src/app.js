const express = require("express");
const testRoutes = require("./routes/test.routes");
const app = express();

app.use(express.json());
app.use("/test", testRoutes);
app.get("/", (req, res) => {
  res.json({ message: "IntelliDoc-AI API Running" });
});

module.exports = app;