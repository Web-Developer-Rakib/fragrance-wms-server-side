const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

//App and Port
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

// DB Info
const uri =
  "mongodb+srv://Rakib:<password>@cluster0.c95rx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Main API function

const run = async () => {
  try {
    //Create connection and Connect client
    await client.connect();
    const productCollection = client.db("FragranceWMS").collection("Products");

    // Insert data
    app.post(
      ("/products",
      async (req, res) => {
        const productsData = req.body;
        const result = await productCollection.insertOne(productsData);
        res.send(result);
      })
    );
  } finally {
    // Connection
  }
};
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Server is runing...");
});
app.listen(port, () => console.log("Listning to port", port));
