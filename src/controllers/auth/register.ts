import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { encryptPassword, createToken, createJWT } from "../../utils/index";
import sendEmail, { verificationEmailTemplate } from "../../utils/email";
import { User as UserModel } from "../../models/user";
async function createUser(
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  token: string,
  age: number,
  gender: string,
  profilePicture: string,
  addresses: string[]
) {
  try {
    let currentDate = new Date().toISOString();
    let verificationExpires = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24
    ).toISOString(); // 24 hours
    console.log(currentDate, verificationExpires);

    const user_query_response = await UserModel.create({
      username,
      email,
      password,
      firstName,
      lastName,
      verificationToken: token,
      verificationExpires,
      age,
      gender,
      profilePicture,
      addresses,
    });
    const user = user_query_response?.toJSON();
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function checkEmailOrUsernameExists(email_or_username: string) {
  const user_query_response = await UserModel.findOne({
    $or: [{ email: email_or_username }, { username: email_or_username }],
  });
  // const user = user_query_response?.rows?.length > 0;
  const isExists = user_query_response?.toJSON();
  return isExists;
}

export default async (req: Request, res: Response) => {
  const {
    email,
    password,
    firstName,
    lastName,
    username,
    age,
    gender,
    address,
  } = req.body; // get body params
  var { send_email } = req.query; // get query params
  if (!send_email) send_email = "true"; // default value
  var send_email_boolean: boolean = Boolean(send_email === "true"); // convert string to boolean

  function isVerificationEmailSend() {
    // check if verification email is send
    if (send_email_boolean) {
      // if send_email_boolean is true
      return true; // return true
    } else if (!send_email_boolean) {
      // if send_email_boolean is false
      return false; // return false
    }
  }
  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !username ||
    !age ||
    !gender
  ) {
    // check required fields
    return sendResponse(req, res, 400, {
      message: "missing_fields",
    });
  }
  const userExists =
    (await checkEmailOrUsernameExists(email)) ||
    (await checkEmailOrUsernameExists(username)); // check if email or username exists
  let token = createToken(); // create token

  if (userExists) {
    return sendResponse(req, res, 400, {
      message: "email_or_username_already_exists",
    });
  }
  let encryptedPassword = await encryptPassword(`${password}`); // encrypt password

  const user = await createUser(
    username,
    email,
    encryptedPassword,
    firstName,
    lastName,
    token,
    age,
    gender,
    "",
    Array.isArray(address) ? address : [address]
  );
  if (!user) {
    return sendResponse(req, res, 404, {
      message: "user_cannot_be_created",
    });
  }

  if (isVerificationEmailSend()) {
    const resp = await sendEmail(
      email,
      "Verify your email",
      verificationEmailTemplate
        .replace(
          `{{verificationLink}}`,
          `${process.env.BASE_URL}/auth/verify_code?token=${user.verificationToken}`
        )
        .replace(`{{verificationCode}}`, `${user.verificationToken}`)
    );
    // send email
  }
  user.auth = {
    token: createJWT({
      email,
      userId: user.id,
      expireIn: 1000 * 60 * 60 * 24 * 1, // 1 days
    }),
  };
  return sendResponse(req, res, 200, {
    message: "success",
    token: user.auth.token,
    ...(!isVerificationEmailSend() && {
      emailVerificationToken: token,
    }),
  });
};
