import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import { Order as OrderModel } from "../../models/order";
import { Review as ReviewModel } from "../../models/review";
import { Restaurant as RestaurantModel } from "../../models/restaurant";
import { RequestWithUser } from "../../types";
export default async (req: RequestWithUser, res: Response) => {
  const userId = req.user.userId; // Extracting userId from req.user
  const order = await OrderModel.findById(req.params.orderId);

  if (!order)
    return sendResponse(req, res, 404, {
      message: "order_not_found",
    });
  if (order.review)
    return sendResponse(req, res, 400, {
      message: "order_already_has_review",
    });
  const reviewData = {
    ...req.body,
    user: userId,
    order: order._id,
    restaurant: order.restaurant,
  };
  const review = new ReviewModel(reviewData);
  await review.save();

  order.review = review._id;
  await order.save();
  sendResponse(req, res, 200, {
    message: "success",
    order,
  });
};
