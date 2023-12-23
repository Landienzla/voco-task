import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { checkPassword, createJWT } from "../../utils/index";
import { User as UserModel } from "../../models/user";
async function getUser(username: string) {
  const user_query_response = await UserModel.findOne({
    username,
  });

  const user = user_query_response?.toJSON();
  return user;
}

export default async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return sendResponse(req, res, 400, {
      message: "missing_fields",
    });
  }
  const user = await getUser(username as string);
  if (!user) {
    return sendResponse(req, res, 400, {
      message: "user_not_found",
    });
  }
  let isPasswordCorrect = await checkPassword(`${password}`, user.password);
  if (!isPasswordCorrect) {
    return sendResponse(req, res, 400, {
      message: "wrong_password",
    });
  }
  let jwt_token = createJWT({
    email: user.email,
    userId: user._id,
    expireIn: 1000 * 60 * 60 * 24 * 1, // 1 days
  });

  return sendResponse(req, res, 200, {
    message: "success",
    token: jwt_token,
  });
};
