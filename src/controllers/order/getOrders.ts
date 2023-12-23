import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import { Order as OrderModel } from "../../models/order";
import { RequestWithUser } from "../../types";
export default async (req: RequestWithUser, res: Response) => {
  const userId = req.user.userId; // Extracting userId from req.user
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const skip = (page - 1) * pageSize;
  const orders = await OrderModel.find({ user: userId })
    .populate("restaurant items review")
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 });
  const total = await OrderModel.countDocuments({ user: userId });

  sendResponse(req, res, 200, {
    message: "success",
    orders,
    pagination: {
      page,
      pageSize,
      total,
    },
  });
};
