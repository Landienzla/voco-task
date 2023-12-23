import { Router } from "express";
import authRoutes from "./routes/auth";
import problemsRoutes from "./routes/problems";
import restaurantRoutes from "./routes/restaurant";
import orderRoutes from "./routes/order";
import sendResponse from "./utils/sendResponse";
const routes = Router();

routes.get("/", (req, res) => {
  return sendResponse(req, res, 200, {
    api_status: "live",
  });
});
routes.use("/auth", authRoutes);
routes.use("/problems", problemsRoutes);
routes.use("/restaurants", restaurantRoutes);
routes.use("/orders", orderRoutes);
export default routes;
