import { RequestWithUser } from "../../types";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import { Restaurant as RestaurantModel } from "../../models/restaurant";

export default async (req: RequestWithUser, res: Response) => {
  // Oluşturduğunuz veritabanına NodeJS içinde Mongoose ile bağlanıp restoranları pagination olacak şekilde client tarafına servis eden endpointi yazınız ve restorana verilen puanların ortalaması yüksek olandan düşük olana göre sıralayınız.
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const skip = (page - 1) * pageSize;

  const restaurants = await RestaurantModel.aggregate([
    {
      $lookup: {
        from: "reviews", // Assuming your review collection is named 'reviews'
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
        averageRating: { $avg: { $ifNull: ["$reviews.rating", 0] } }, // Set to 0 if no reviews
      },
    },
    { $sort: { averageRating: -1 } },
    { $skip: skip },
    { $limit: pageSize },
  ]);
  return sendResponse(req, res, 200, {
    message: "success",
    restaurants,
  });
};
