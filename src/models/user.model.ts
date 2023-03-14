import { Document, model, now, Schema, Types, ObjectId } from "mongoose";
import { IChatroom } from "./chatroom.model";
import { IHall } from "./hall.model";
import { IReservation } from "./reservation.model";
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
  updatedAt: Date;
  halls: Types.Array<ObjectId | IHall>;
  reservations: Types.Array<ObjectId | IReservation>;
  favorites: Types.Array<ObjectId | IHall>;
  chatRooms: Types.Array<ObjectId | IChatroom>;
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
  createdAt: { type: Date, required: true, default: now(), immutable: true },
  updatedAt: { type: Date, required: true, default: now() },
  halls: { type: [{ type: Types.ObjectId, ref: "Hall" }], required: true, default: [] },
  favorites: { type: [{ type: Types.ObjectId, ref: "Hall" }], required: true, default: [] },
  chatRooms: { type: [{ type: Types.ObjectId, ref: "ChatRoom" }], required: true, default: [] },
  reservations: {
    type: [{ type: Types.ObjectId, ref: "Reservation" }],
    required: true,
    default: [],
  },
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
