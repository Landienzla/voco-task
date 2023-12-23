import { RequestWithUser } from "../../types";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import { Review as ReviewModel } from "../../models/review";

export default async (req: RequestWithUser, res: Response) => {
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
    { $sort: { age: 1 } },
    { $skip: 0 }, // offset // 0 dan başla
    { $limit: 20 }, // limit  // 20 erkek kullanıcı
  ]);
  return sendResponse(req, res, 200, {
    message: "success",
    result,
  });
};
