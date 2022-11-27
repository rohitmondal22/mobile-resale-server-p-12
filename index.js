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
const { query } = require("express");
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

    //all  products **********************************
    // all products get
    app.get("/allProducts/:id", async (req, res) => {
      const ide = req.params.id;

      const query = { id: ide };
      const result = await allProducts.find(query).toArray();
      res.send(result);
    });

     //all seler get
     app.get("/advatise", async (req, res) => {
      const query = { advertise: "done" };
      const result = await allProducts.find(query).toArray();
      res.send(result);
    });

    //my products get with email
    app.get("/mypro", async (req, res) => {
      const emails = req.query.email;
      const userinformation = { emali: emails };
      const result = await allProducts.find(userinformation).toArray();
      res.send(result);
    });

    app.delete("/mypro/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await allProducts.deleteOne(query);
      res.send(result);
    });

    // buy product   get
    app.get("/books/:id", async (req, res) => {
      const ide = req.params.id;
      const query = { _id: ObjectId(ide) };
      const result = await allProducts.find(query).toArray();
      res.send(result);
    });

    app.post("/allProduct", async (req, res) => {
      const info = req.body;
      console.log(info);
      const result = await allProducts.insertOne(info);
      res.send(result);
    });

    //update book in pmant sistem is done
    app.put("/advertise/:id", async (req, res) => {
      const ids = req.params.id;
      console.log(ids);

      const filter = { _id: ObjectId(ids) };

      const option = { upsert: true };
      const updateUser = {
        $set: {
          advertise: "done",
        },
      };
      const result = await allProducts.updateOne(filter, updateUser, option);
      res.send(result);
    });
    //update book in pmant sistem is detet
    app.put("/advertisedetel/:id", async (req, res) => {
      const ids = req.params.id;
      console.log(ids);

      const filter = { _id: ObjectId(ids) };

      const option = { upsert: true };
      const updateUser = {
        $set: {
          advertise: "non",
        },
      };
      const result = await allProducts.updateOne(filter, updateUser, option);
      res.send(result);
    });

    // book **********************************
    //  post
    app.post("/books", async (req, res) => {
      const useinfo = req.body;
      const result = await bookcollictions.insertOne(useinfo);
      res.send(result);
    });
    //get book
    app.get("/booking", async (req, res) => {
      const email = req.query.email;
      const query = { productemail: email };
      const baiours = await bookcollictions.find(query).toArray();
      res.send(baiours);
    });
    //my order
    app.get("/myorders", async (req, res) => {
      const email = req.query.email;
      const query = { useremail: email };
      const baiour = await bookcollictions.find(query).toArray();
      res.send(baiour);
    });
    //update book in pmant sistem is done
    app.put("/bokingd/:id", async (req, res) => {
      const ids = req.params.id;
      console.log(ids);

      const filter = { _id: ObjectId(ids) };

      const option = { upsert: true };
      const updateUser = {
        $set: {
          pmant: "done",
        },
      };
      const result = await bookcollictions.updateOne(
        filter,
        updateUser,
        option
      );
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
      const emails = req.query.email;
      const userinformation = { email: emails };
      const result = await userscollictions.find(userinformation).toArray();
      res.send(result);
    });
    //all seler get
    app.get("/allseler", async (req, res) => {
      const query = { roll: "Seller account" };
      const result = await userscollictions.find(query).toArray();
      res.send(result);
    });

    //update user vary fid
    app.put("/allseler", async (req, res) => {
      const ids = req.query.email;
      console.log(ids);

      const filter = { email: ids };

      const option = { upsert: true };
      const updateUser = {
        $set: {
          varefy: "done",
        },
      };
      const result = await userscollictions.updateOne(filter, updateUser, option);
      res.send(result);
    });
    //update allProducts vary fid
    app.put("/allseler", async (req, res) => {
      const ids = req.query.email;
      console.log(ids);

      const filter = { emali: ids };

      const option = { upsert: true };
      const updateUser = {
        $set: {
          varefy: "done",
        },
      };
      const result = await allProducts.updateOne(filter, updateUser, option);
      res.send(result);
    });
    //all Buyers account get
    app.get("/allbuyers", async (req, res) => {
      const query = { roll: "Buyers account" };
      const result = await userscollictions.find(query).toArray();
      res.send(result);
    });
    //seler delete
    app.delete("/seler/:id", async (req, res) => {
      const ids = req.params.id;
      console.log(ids);
      const query = { _id: ObjectId(ids) };
      const result = await userscollictions.deleteOne(query);
      res.send(result);
    });

    // pment explore**********************************
    app.post("/create-payment-intent", async (req, res) => {
      const price = req.body;
      const amount = parseInt(price.price) * 100;
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
