import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { Restaurant as RestaurantModel } from "../../models/restaurant";
export default async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string);
  const pageSize = parseInt(req.query.pageSize as string);

  const startIndex = (page - 1) * pageSize;
  var restaurants = await RestaurantModel.find()
    .limit(pageSize)
    .skip(startIndex)
    .exec();
  if (!restaurants) restaurants = [];
  var total = await RestaurantModel.countDocuments().exec();
  sendResponse(req, res, 200, {
    message: "success",
    restaurants,
    pagination: {
      page,
      pageSize,
      total,
    },
  });
};
