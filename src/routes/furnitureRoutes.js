const express = require("express");
const router = express.Router();
const furnitureController = require("../controllers/furnitureController");

router.get("/", furnitureController.getAllFurnitures);
router.post("/", furnitureController.createNewFurniture);
router.get("/:furnitureid", furnitureController.getFurnitureById);
router.put("/:furnitureid", furnitureController.updateFurnitureById);
router.delete("/:furnitureid", furnitureController.deleteFurnitureById);

module.exports = router;
