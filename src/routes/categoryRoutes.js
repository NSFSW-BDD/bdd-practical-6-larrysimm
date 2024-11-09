const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const furnitureController = require("../controllers/furnitureController");

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createNewCategory);
router.get("/:categoryid", categoryController.getCategoryById);
router.put("/:categoryid", categoryController.updateCategoryById);
router.delete("/:categoryid", categoryController.deleteCategoryById);
router.get(
  "/:categoryid/furniture",
  furnitureController.getFurnituresByCategoryId
);

module.exports = router;
