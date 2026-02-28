const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

// DEBUG CHECK
console.log("protect:", typeof protect);
console.log("sellProduct:", typeof controller.sellProduct);
console.log("addProduct:", typeof controller.addProduct);
console.log("getAllProducts:", typeof controller.getAllProducts);
console.log("refillProduct:", typeof controller.refillProduct);
console.log("updateTotalStock:", typeof controller.updateTotalStock);
console.log("getProductHistory:", typeof controller.getProductHistory);
console.log("getProductLocationIntelligence:", typeof controller.getProductLocationIntelligence);
console.log("getDeadStockReport:", typeof controller.getDeadStockReport);

// ROUTES
router.post("/add", protect, controller.addProduct);
router.get("/getall", protect, controller.getAllProducts);
router.post("/sell", protect, controller.sellProduct);
router.post("/refill", protect, controller.refillProduct);
router.post("/update", protect, controller.updateTotalStock);
router.get("/history/:id", protect, controller.getProductHistory);

router.get(
  "/location-intelligence/:id",
  protect,
  controller.getProductLocationIntelligence
);

router.get("/dead-stock", protect, controller.getDeadStockReport);

module.exports = router;
