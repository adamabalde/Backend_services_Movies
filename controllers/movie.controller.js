const db = require("../models");
const Movie = db.movies;

// Créer un nouveau film
exports.create = async (req, res) => {
  try {
    // Vérifier si les données requises sont présentes dans la requête
    if (!req.body.title || !req.body.release) {
      return res.status(400).send({ message: "Le titre et la date sont requises!" });
    }

    // Créer un nouveau film
    const movie = new Movie({
      title: req.body.title,
      release: req.body.release,
      synopsis: req.body.synopsis || "", 
    });

    // Enregistrer le film dans la base de données
    const savedMovie = await movie.save();
    res.send(savedMovie);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the movie.",
    });
  }
};

// Récupérer tous les films de la base de données.
exports.findAll = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving movies.",
    });
  }
};

// Trouver un film avec un ID spécifique
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send({ message: "Movie not found with id " + id });
    }
    res.send(movie);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving movie with id " + id });
  }
};

// Mettre à jour un film par son ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.body) {
      return res.status(400).send({ message: "Data to update can not be empty!" });
    }
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    if (!updatedMovie) {
      return res.status(404).send({ message: `Cannot update Movie with id=${id}. Movie not found!` });
    }
    res.send({ message: "Movie was updated successfully." });
  } catch (err) {
    res.status(500).send({ message: "Error updating Movie with id=" + id });
  }
};

// Supprimer un film avec l'ID spécifié dans la requête
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMovie = await Movie.findByIdAndRemove(id);
    if (!deletedMovie) {
      return res.status(404).send({ message: `Cannot delete Movie with id=${id}. Movie not found!` });
    }
    res.send({ message: "Movie was deleted successfully." });
  } catch (err) {
    res.status(500).send({ message: "Impossible de supprimer le film avec l'id=" + id });
  }
};

// Supprimer tous les films de la base de données
exports.deleteAll = async (req, res) => {
  try {
    const { deletedCount } = await Movie.deleteMany({});
    res.send({ message: `${deletedCount} Movies were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Une erreur s'est produite lors de la suppresion des films.",
    });
  }
};
