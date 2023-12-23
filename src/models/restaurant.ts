import mongoose, { Schema, Document } from "mongoose";
import { Restaurant as RestaurantType } from "./types";

const restaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: String,
  logo: String,
  address: {
    city: String,
    district: String,
    street: String,
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
  branches: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }], 
  menuItems: [{ type: Schema.Types.ObjectId, ref: "MenuItem" }],
  categories: [{ type: String }], // fast-food, home-food, etc.
});

restaurantSchema.index({ location: "2dsphere" });

export const Restaurant = mongoose.model<RestaurantType>(
  "Restaurant",
  restaurantSchema
);
