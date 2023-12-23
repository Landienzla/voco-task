import { RequestWithUser } from "../../types";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import { Restaurant as RestaurantModel } from "../../models/restaurant";

export default async (req: RequestWithUser, res: Response) => {
  // Restoranlara yapılan puanlar baz alınarak, kategorilerinden en az 1 i fast food veya ev yemekleri olan veya restoran açıklamasında fast içeren, 4 puan üstü restoranların sadece adlarını, kategorilerini ve açıklamasını veren sorguyu yazınız.

  const restaurants = await RestaurantModel.aggregate([
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "restaurant",
        as: "reviews",
      },
    },
    { $unwind: { path: "$reviews", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        description: { $first: "$description" },
        categories: { $first: "$categories" },
        averageRating: { $avg: "$reviews.rating" },
      },
    },
    {
      $match: {
        $or: [
          { categories: { $in: ["fast-food", "home-cooking"] } },
          { description: /fast/ },
        ],
        averageRating: { $gt: 4 },

      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        categories: 1,
        description: 1,
      },
    },
  ]);

  return sendResponse(req, res, 200, {
    message: "success",
    restaurants,
  });
};
