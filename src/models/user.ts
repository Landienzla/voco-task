import mongoose, { Schema } from "mongoose";
import { User as UserType } from "./types";

const userSchema: Schema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    gender: String,
    profilePicture: String,
    addresses: [String],
    verificationToken: String,
    verificationTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<UserType>("User", userSchema);
