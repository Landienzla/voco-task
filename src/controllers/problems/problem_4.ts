import { RequestWithUser } from "../../types";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import { Review as ReviewModel } from "../../models/review";

export default async (req: RequestWithUser, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 20;
  const skip = (page - 1) * pageSize;
  // Restoranlara yapılan yorumlar baz alınarak, son yorum yapan 20 erkek kullanıcıyı yaşa göre sıralayınız. (Bir sonraki sorguda sonraki 20 erkek listelenecek şeklinde yorumlayıp sorguyu yazmanız beklenmektedir)
  const result = await ReviewModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",

        foreignField: "_id",
        as: "userData",
      },
    },
    { $unwind: "$userData" },
    { $match: { "userData.gender": "male" } },
    { $sort: { reviewDate: -1 } },
    {
      $group: {
        _id: "$userData._id",
        username: { $first: "$userData.username" },
        age: { $first: "$userData.age" },
        lastReviewDate: { $first: "$reviewDate" },
      },
    },
    {
      $facet: {
        paginatedResults: [
          { $sort: { age: 1 } },
          { $skip: skip },
          { $limit: pageSize },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
    // { $sort: { age: 1 } },
    // { $skip: skip }, // offset // 0 dan başla
    // { $limit: pageSize }, // limit  // 20 erkek kullanıcı
  ]);
  return sendResponse(req, res, 200, {
    message: "success",
    result: result?.[0]?.paginatedResults,
    pagination: {
      totalCount: result?.[0]?.totalCount?.[0]?.count,
      page,
      pageSize,
    },
  });
};
