import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import { Order as OrderModel } from "../../models/order";
import { RequestWithUser } from "../../types";
export default async (req: RequestWithUser, res: Response) => {
  const userId = req.user.userId; // Extracting userId from req.user
  const orderData = { ...req.body, user: userId };
  const order = new OrderModel(orderData);
  await order.save();
  sendResponse(req, res, 200, {
    message: "success",
    order,
  });
};
