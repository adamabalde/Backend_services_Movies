const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

// Routes pour les films
router.post("/", movieController.create);
router.get("/", movieController.findAll);
router.get("/:id", movieController.findOne);
router.put("/:id", movieController.update);
router.delete("/:id", movieController.delete);
router.delete("/", movieController.deleteAll);

module.exports = router;
