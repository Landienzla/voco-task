import mongoose, { Schema } from "mongoose";
import { MenuItem as MenuItemType } from "./types";

const menuItemSchema: Schema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: { type: String, required: true },
  price: Number,
  content: String,
  coverImage: String,
});

export const MenuItem = mongoose.model<MenuItemType>(
  "MenuItem",
  menuItemSchema
);
