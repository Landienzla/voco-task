import { RequestWithUser } from "../../types";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import { Restaurant as RestaurantModel } from "../../models/restaurant";
// @ts-ignore
import { MenuItem as MenuItemModel } from "../../models/MenuItem";

import mongoose from "mongoose";
import { logInfo } from "../../utils/logger";

export default async (req: RequestWithUser, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let restaurant = await RestaurantModel.findOne({
      name: "Voco Fast Food",
    }).session(session);

    if (!restaurant) {
      // If restaurant not found, create a new one
      logInfo("Restaurant not found. Creating a new one...");
      restaurant = new RestaurantModel({
        name: "Voco Fast Food",
        location: {
          type: "Point",
          coordinates: [32.85, 39.93],
        },
        categories: ["fast-food"],
      });
      await restaurant.save({ session });
    }

    const newMenuItems = [
      {
        restaurant: restaurant._id,
        name: "Küçük boy peynirli pizza",
        price: 50,
      },
      {
        restaurant: restaurant._id,
        name: "Orta boy mantarlı pizza",
        price: 100,
      },
      { restaurant: restaurant._id, name: "Hamburger", price: 120 },
    ];

    let menuItems = await MenuItemModel.insertMany(newMenuItems, { session });
    console.log("New menu items added successfully", menuItems);

    await session.commitTransaction();
  } catch (error) {
    console.error("Error in addMenuItemsWithTransaction:", error);
    await session.abortTransaction();
    return sendResponse(req, res, 500, {
      message: "error",
      sessionId: session.id,
    });
  } finally {
    session.endSession();
  }

  return sendResponse(req, res, 200, {
    message: "success",
    sessionId: session.id,
  });
};
