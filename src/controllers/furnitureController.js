const model = require("../models/furnitureModel");

var furnitureController = {
  getAllFurnitures: (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error retrieving all furnitures:", error);
        res.status(500).json({
          message:
            "An error occurred while retrieving furniture data. Please try again later.",
        });
      } else {
        res.status(200).json(results);
      }
    };

    model.getAllFurnitures(callback);
  },
  getFurnitureById: (req, res, next) => {
    const data = {
      fid: req.params.furnitureid,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error retrieving furniture by ID:", error);
        res.status(500).json({
          message:
            "An error occurred while retrieving the furniture. Please check the ID and try again.",
        });
        if (results.length == 0) {
          res.status(404).json({
            message: "Furniture not found",
          });
        } else {
          res.status(200).json(results[0]);
        }
      }
    };

    model.getFurnitureById(data, callback);
  },
  createNewFurniture: (req, res, next) => {
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      catid: req.body.catid,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error creating new furniture:", error);
        res.status(500).json({
          message:
            "An error occurred while creating the furniture. Please ensure all required fields are valid.",
        });
      } else {
        res.status(201).json({ message: "New Furniture created successfully" });
      }
    };

    model.createNewFurniture(data, callback);
  },
  updateFurnitureById: (req, res, next) => {
    const data = {
      fid: req.params.furnitureid,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      catid: req.body.catid,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error Error updating furniture by ID:", error);
        res.status(500).json({
          message:
            "An error occurred while updating the furniture. Please check the provided data.",
        });
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "Furniture not found",
          });
        } else {
          res.status(204).send();
        }
      }
    };

    model.updateFurnitureById(data, callback);
  },
  deleteFurnitureById: (req, res, next) => {
    const data = {
      fid: req.params.furnitureid,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error deleting furniture by ID:", error);
        res.status(500).json({
          message:
            "An error occurred while deleting the furniture. Please check the ID and try again.",
        });
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "Furniture not found",
          });
        } else {
          res.status(204).send();
        }
      }
    };

    model.deleteFurnitureById(data, callback);
  },
  getFurnituresByCategoryId: (req, res, next) => {
    const categoryId = req.params.categoryid;

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error retrieving furniture by category ID:", error);
        res.status(500).json(error);
      } else {
        if (results.length === 0) {
          res
            .status(404)
            .json({ message: "No furniture found in this category" });
        } else {
          res.status(200).json(results);
        }
      }
    };

    model.getFurnituresByCategoryId(categoryId, callback);
  },
};

module.exports = furnitureController;
