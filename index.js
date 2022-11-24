const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const stripe = require("stripe")();

// medilwoire
app.use(cors());
app.use(express.json());

// Assignment-12
// Jcnjp5Qu5gFeSLf2

// mongodb atlast

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://Assignment-12:Jcnjp5Qu5gFeSLf2@cluster0.gdl5efg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const allProducts = client.db("assignmentDb").collection("allproduct");
    const allCatagory = client.db("assignmentDb").collection("allCatagory");

    // all CATOCORY get
    app.get("/allCatagory", async (req, res) => {
      const query = {};
      const result = await allCatagory.find(query).toArray();
      res.send(result);
    });
    // all products get
    app.get("/allProducts/:id", async (req, res) => {
      const ide = req.params.id;
      console.log(ide);
      const query = { id: ide };
      const result = await allProducts.find(query).toArray();
      res.send(result);
    });
    // buy product   get
    app.get("/buy/:id", async (req, res) => {
      const ide = req.params.id;
      console.log(ide);
      const query = { _id: ObjectId(ide) };
      const result = await allProducts.find(query).toArray();
      res.send(result);
    });




    // pment explore
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("all ok ");
});

app.listen(port, () => {
  console.log(`sarver run in port ${port}`);
});
