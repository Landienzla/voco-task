import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import { Order as OrderModel } from "../../models/order";
import { RequestWithUser } from "../../types";
export default async (req: RequestWithUser, res: Response) => {
  const userId = req.user.userId; // Extracting userId from req.user
  const orderId = req.params.id;

  const order = await OrderModel.findById(orderId).populate(
    "user restaurant items review"
  );

  // Check if the order exists
  if (!order)
    return sendResponse(req, res, 404, {
      message: "order_not_found",
    });

  // Check if the order belongs to the user making the request
  if (!order.user._id.equals(userId)) {
    return sendResponse(req, res, 403, {
      message: "access_denied",
    });
  }
  sendResponse(req, res, 200, {
    message: "success",
    order,
  });
};
