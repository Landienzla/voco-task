import { Document } from "mongoose";
export interface Restaurant extends Document {
  name: string;
  description?: string;
  logo?: string;
  address: {
    city: string;
    district: string;
    street: string;
  };
  location: {
    type: string;
    coordinates: number[];
  };
  branches: Restaurant["_id"][];
  menuItems: MenuItem["_id"][];
}
export interface User extends Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  age?: number;
  gender?: string;
  profilePicture?: string;
  addresses: string[];
  verificationToken?: string;
  verificationTokenExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  auth?: {
    token: string;
  };
}
export interface MenuItem extends Document {
  restaurant: Restaurant["_id"];
  name: string;
  price: number;
  content?: string;
  coverImage?: string;
}
export interface Order extends Document {
  user: User["_id"];
  restaurant: Restaurant["_id"];
  items: MenuItem["_id"][];
  comment?: string;
  rating?: number;
  orderDate: Date;
  review?: Review["_id"];
}
export interface Review extends Document {
  user: User["_id"];
  restaurant: Restaurant["_id"];
  rating: number;
  comment?: string;
  reviewDate: Date;
  order: Order["_id"];
}
