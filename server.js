const express = require("express");
const cors = require("cors");
require("dotenv").config();

const postRoutes = require("./routes/post-routes");

const app = express();
const PORT = process.env.PORT || 3003;

// Register middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register individual custom routers
app.use("/api/posts", postRoutes);

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Server is live on port: ${PORT}`);
});

module.exports = app;
