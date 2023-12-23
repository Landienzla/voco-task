import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { Restaurant as RestaurantModel } from "../../models/restaurant";
export default async (req: Request, res: Response) => {
  const restaurant = new RestaurantModel(req.body);
  await restaurant.save();
  sendResponse(req, res, 200, {
    message: "success",
    restaurant,
  });
};
