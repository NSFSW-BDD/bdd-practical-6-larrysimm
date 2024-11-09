const model = require("../models/categoryModel");

var categoryController = {
  getAllCategories: (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error retrieving all categories:", error);
        res.status(500).json({
          message:
            "An error occurred while retrieving category data. Please try again later.",
        });
      } else {
        res.status(200).json(results);
      }
    };

    model.getAllCategories(callback);
  },
  getCategoryById: (req, res, next) => {
    const data = {
      catid: req.params.categoryid,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error retrieving category by ID:", error);
        res.status(500).json({
          message:
            "An error occurred while retrieving the category. Please check the ID and try again.",
        });
      } else {
        if (results.length == 0) {
          res.status(404).json({
            message: "Category not found",
          });
        } else {
          res.status(200).json(results[0]);
        }
      }
    };

    model.getCategoryById(data, callback);
  },
  createNewCategory: (req, res, next) => {
    const data = {
      name: req.body.name,
      description: req.body.description,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error creating new category", error);
        res.status(500).json({
          message:
            "An error occurred while creating the category. Please ensure all required fields are valid.",
        });
      } else {
        res.status(201).json({ message: "New Category created successfully" });
      }
    };

    model.createNewCategory(data, callback);
  },
  updateCategoryById: (req, res, next) => {
    const data = {
      catid: req.params.categoryid,
      name: req.body.name,
      description: req.body.description,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error updating category by ID:", error);
        res.status(500).json({
          message:
            "An error occurred while updating the category. Please check the provided data.",
        });
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "Category not found",
          });
        } else {
          res.status(204).send();
        }
      }
    };

    model.updateCategoryById(data, callback);
  },
  deleteCategoryById: (req, res, next) => {
    const data = {
      catid: req.params.categoryid,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error deleting category by ID:", error);
        res.status(500).json({
          message:
            "An error occurred while deleting the category. Please check the ID and try again.",
        });
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "Category not found",
          });
        } else {
          res.status(204).send();
        }
      }
    };

    model.deleteCategoryById(data, callback);
  },
};

module.exports = categoryController;
