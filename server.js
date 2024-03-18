const express = require("express");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());
app.use("/api", require("./Routes/routes"));
app.use("/images", express.static("upload/images"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
