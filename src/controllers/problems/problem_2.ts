import { RequestWithUser } from "../../types";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import { Restaurant as RestaurantModel } from "../../models/restaurant";

export default async (req: RequestWithUser, res: Response) => {
  // Açıklamasında lahmacun içeren, (39.93, ) koordinatlara en yakın 5 restoranı listeleyiniz.
  const latitude = 39.93;
  const longitude = 32.85;
  if (!latitude || !longitude) {
    return sendResponse(req, res, 400, {
      message: "missing_fields",
    });
  }
  const restaurants = await RestaurantModel.find({
    description: /lahmacun/i,
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: 100000, // Maximum distance in meters (optional)
      },
    },
  }).limit(5);

  return sendResponse(req, res, 200, {
    message: "success",
    restaurants,
  });
};
