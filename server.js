const express = require("express");
const app = express();
app.use(express.json());
const port = 4000;

const movies = require("./movies.json"); // Importation des données des films depuis le fichier JSON

app.get("/", (req, res) => {
  console.log(`Request from ${req.url}`);
  res.send("Server running");
});

app.get("/movies/:id", (req, res) => {
  const id_movie = parseInt(req.params.id);
  const movie = movies.find(m => m.id === id_movie);
  res.status(200).json(movie);
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.post("/movies", (req, res) => {
  const newMovie = req.body;
  movies.push(newMovie);
  res.status(200).json(movies);
});

app.put("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let movie = movies.find(m => m.id === id);
  if (movie) {
    movie.title = req.body.title || movie.title;
    movie.synopsis = req.body.synopsis || movie.synopsis;
    movie.genre = req.body.genre || movie.genre;
    movie.release = req.body.release || movie.release;
    res.status(200).json(movie);
  } else {
    res.status(404).send("Movie not found");
  }
});

app.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex(m => m.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
    res.status(200).json(movies);
  } else {
    res.status(404).send("Movie not found");
  }
});

app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);
