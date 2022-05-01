const express = require("express");
const cors = require("cors");
require("dotenv").config();

//App amd Port
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is runing...");
});
app.listen(port, () => console.log("Listning to port", port));
