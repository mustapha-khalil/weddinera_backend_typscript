import { Document, model, now, Schema, Types } from "mongoose";
import { IHall } from "./hall.model";
export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  type: "user" | "admin";
  countryCode: string | null;
  mobileNumber: string | null;
  profileImage: string | null;
  passwordResetToken: string | null;
  createdAt: Date;
  halls: Types.Array<Types.ObjectId | IHall>;
  reservations: Types.Array<Types.ObjectId>;
  favorites: Types.Array<Types.ObjectId>;
  chatRooms: Types.Array<Types.ObjectId>;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  type: { type: String, enum: ["user", "admin"], required: true, default: "user" },
  password: { type: String, required: true, minlength: 6 },
  countryCode: { type: String, default: null },
  mobileNumber: { type: String, default: null },
  profileImage: { type: String, default: null },
  passwordResetToken: { type: String, default: null },
  createdAt: { type: Date, default: now() },
  halls: { type: [{ type: Types.ObjectId, ref: "Hall" }], default: [] },
  reservations: { type: [{ type: Types.ObjectId, ref: "Reservation" }], default: [] },
  favorites: { type: [{ type: Types.ObjectId, ref: "Hall" }], default: [] },
  chatRooms: { type: [{ type: Types.ObjectId, ref: "ChatRoom" }], default: [] },
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
