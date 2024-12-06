require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rnab3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    //await client.connect();

    const moviesCollection = client.db("movieDB").collection("movies");

    const favoriteMoviesCollection = client
      .db("movieDB")
      .collection("favorites");

    //all-movies
    app.get("/all-movies", async (req, res) => {
      const cursor = moviesCollection.find();
      const movies = await cursor.toArray();
      res.send(movies);
    });

    app.get("/movies", async (req, res) => {
      const cursor = moviesCollection.find().sort({ rating: -1 }).limit(6);
      const movies = await cursor.toArray();

      res.send(movies);
    });

    app.get("/movie/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const movie = await moviesCollection.findOne(query);

      res.send(movie);
    });

    app.post("/add-movie", async (req, res) => {
      const newMovie = req.body;

      const result = await moviesCollection.insertOne(newMovie);
      res.send(result);
    });

    app.put("/update-movie/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          title: req.body.title,
          genre: req.body.genre,
          duration: req.body.duration,
          releaseYear: req.body.releaseYear,
          rating: req.body.rating,
          summary: req.body.summary,
        },
      };

      const result = await moviesCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.get("/search-movies/:searchTerm", async (req, res) => {
      const title = req.params.searchTerm;
      const cursor = moviesCollection.find({
        title: { $regex: title, $options: "i" },
      });
      const movies = await cursor.toArray();
      res.send(movies);
    });

    app.delete("/delete-movie/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await moviesCollection.deleteOne(query);
      res.send(result);
    });

    //favorite movies
    app.post("/add-favorite", async (req, res) => {
      const newFavorite = req.body;

      const result = await favoriteMoviesCollection.insertOne(newFavorite);
      res.send(result);
    });

    app.get("/favorites/:email", async (req, res) => {
      const email = req.params.email;
      const cursor = favoriteMoviesCollection.find({ currentUser: email });
      const favorites = await cursor.toArray();
      res.send(favorites);
    });

    app.delete("/delete-favorite/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await favoriteMoviesCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
