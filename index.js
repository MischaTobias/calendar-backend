const express = require("express");

const app = express();

const PORT = process.env.PORT;

app.use(express.static("public"));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
// todo: crud

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
