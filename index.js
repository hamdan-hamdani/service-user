require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`This app is service user for Vehicle Rental Apps listen on port ${PORT}`);
});
