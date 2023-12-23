import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { Restaurant as RestaurantModel } from "../../models/restaurant";
export default async (req: Request, res: Response) => {
  const restaurant = await RestaurantModel.findById(req.params.id);
  if (!restaurant)
    return sendResponse(req, res, 404, { message: "restaurant_not_found" });
  sendResponse(req, res, 200, {
    message: "success",
    restaurant,
  });
};
