import { Router } from "express";
import catchFunction from "../utils/catchFunction";
import {
  createRestaurantController,
  deleteRestaurantController,
  updateRestaurantController,
  getRestaurantController,
  getRestaurantsController,
} from "../controllers/restaurant";
const router = Router();

router.post("/", catchFunction(createRestaurantController));
router.get("/", catchFunction(getRestaurantsController));
router.get("/:id", catchFunction(getRestaurantController));
router.put("/:id", catchFunction(updateRestaurantController));
router.delete("/:id", catchFunction(deleteRestaurantController));
export default router;
