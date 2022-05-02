const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//App and Port
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

// DB Info
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c95rx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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

    // Create product
    app.post("/add-product", async (req, res) => {
      const productsData = req.body;
      const result = await productCollection.insertOne(productsData);
      res.send(result);
    });
    // Read all products
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // Read a single product
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    });
    // Update product's quantity
    app.put("/update-quantity/:id", async (req, res) => {
      const id = req.params.id;
      const updatedQuantityInfo = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const setUpdatedQuantity = {
        $set: {
          quantity: updatedQuantityInfo.calculatedQuantity,
        },
      };
      await productCollection.updateOne(filter, setUpdatedQuantity, options);
      res.send(setUpdatedQuantity.$set);
    });
    //Update delivery status
    app.put("/delivered/:id", async (req, res) => {
      const id = req.params.id;
      const deliveryInfo = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const setUpdatedDeliveryStatus = {
        $set: {
          quantity: deliveryInfo.deliveredOne,
        },
      };
      await productCollection.updateOne(
        filter,
        setUpdatedDeliveryStatus,
        options
      );
      res.send(setUpdatedDeliveryStatus.$set);
    });
  } finally {
    // Connection open
  }
};
run().catch(console.dir);
app.listen(port, () => console.log("Listning to port", port));
