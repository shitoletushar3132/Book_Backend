const express = require("express");
require("dotenv").config();
const app = express();
const router = require("./routers/index");
const connectionDB = require("./config/connectionDB");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
const PORT = process.env.PORT || 5000; // Fallback to port 5000 if not defined in .env

app.post("/add", (req, res) => {
  console.log(req.body);
});

connectionDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to the database:", error.message);
  });
