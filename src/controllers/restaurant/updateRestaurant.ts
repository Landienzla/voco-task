import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { Restaurant as RestaurantModel } from "../../models/restaurant";
export default async (req: Request, res: Response) => {
  const restaurant = await RestaurantModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!restaurant)
    return res.status(404).json({ message: "restaurant_not_found" });
  sendResponse(req, res, 200, {
    message: "success",
    restaurant,
  });
};
