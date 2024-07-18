import express from "express";

import orderController from "./controllers/orders.controller";
import productController from "./controllers/products.controller";
import paymentController from "./controllers/payment.controller";
import vipaymentController from "./controllers/vipayment.controller";

const router = express.Router();

router.post("/products", productController.create);
router.get("/products", productController.getAll);
router.get("/products/:id", productController.getById);

router.post("/orders", orderController.create);
router.get("/orders", orderController.getAll);
router.get("/orders/:id", orderController.getById);

router.post("/orders/:id/pay", paymentController.create);
router.post("/payment-success", paymentController.callback);

router.post("/check-nickname", vipaymentController.checkNickname);

export default router;
