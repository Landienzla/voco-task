import mongoose, { Schema } from "mongoose";
import { Review as ReviewType } from "./types";
const reviewSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  rating: Number,
  comment: String,
  reviewDate: { type: Date, default: Date.now },
  order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
});

export const Review = mongoose.model<ReviewType>("Review", reviewSchema);
