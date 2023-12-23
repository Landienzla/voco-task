import mongoose, { Schema } from "mongoose";
import { Order as OrderType } from "./types";

const orderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: "MenuItem" }],
  // comment: String,
  // rating: Number,
  orderDate: { type: Date, default: Date.now },
  review: { type: Schema.Types.ObjectId, ref: "Review" },
});

export const Order = mongoose.model<OrderType>("Order", orderSchema);
