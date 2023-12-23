import { Router } from "express";
import catchFunction from "../utils/catchFunction";
import {
  getOrderController,
  createOrderController,
  createReviewController,
  getOrdersController,
} from "../controllers/order";
import Auth from "../middlewares/auth";
const router = Router();

router.post("/", Auth, catchFunction(createOrderController));
router.get("/", Auth, catchFunction(getOrdersController));
router.get("/:id", Auth, catchFunction(getOrderController));
router.post("/:orderId/review", Auth, catchFunction(createReviewController));
export default router;
