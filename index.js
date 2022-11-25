const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const stripe = require("stripe")(process.env.PMENT_SICRET);

// medilwoire
app.use(cors());
app.use(express.json());

// Assignment-12
// Jcnjp5Qu5gFeSLf2

// mongodb atlast

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.gdl5efg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const allProducts = client.db("assignmentDb").collection("allproduct");
    const allCatagory = client.db("assignmentDb").collection("allCatagory");
    const bookcollictions = client.db("assignmentDb").collection("books");
    const userscollictions = client.db("assignmentDb").collection("users");

    // all CATOCORY get
    app.get("/allCatagory", async (req, res) => {
      const query = {};
      const result = await allCatagory.find(query).toArray();
      res.send(result);
    });
    // all products get
    app.get("/allProducts/:id", async (req, res) => {
      const ide = req.params.id;

      const query = { id: ide };
      const result = await allProducts.find(query).toArray();
      res.send(result);
    });
    // buy product   get
    app.get("/books/:id", async (req, res) => {
      const ide = req.params.id;
      const query = { _id: ObjectId(ide) };
      const result = await allProducts.find(query).toArray();
      res.send(result);
    });

    // order **********************************
    //  post
    app.post("/books", async (req, res) => {
      const useinfo = req.body;
      const result = await bookcollictions.insertOne(useinfo);
      res.send(result);
    });
    //get order
    app.get("/books", async (req, res) => {
      const query = {};
      const result = await bookcollictions.find(query).toArray();
      res.send(result);
    });

    // user informaito sate in database***************************
    //post
    app.post("/users", async (req, res) => {
      const userinformation = req.body;
      const result = await userscollictions.insertOne(userinformation);
      res.send(result);
    });
    //get
    app.get("/users", async (req, res) => {
      const userinformation = {};
      const result = await userscollictions.find(userinformation).toArray();
      res.send(result);
    });

    // pment explore**********************************
    app.post("/create-payment-intent", async (req, res) => {
      const p = req.body;
      const amount = parseInt(p.Price) * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "inr",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
      
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
