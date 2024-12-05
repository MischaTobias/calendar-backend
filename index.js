const path = require("path");
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

const app = express();

dbConnection();

app.use(cors());

const PORT = process.env.PORT;

app.use(express.static("public"));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
