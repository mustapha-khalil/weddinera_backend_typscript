import { Document, model, Schema, Types } from "mongoose";
import { IHall } from "./hall.model";

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  profileImage?: string;
  favorites: Types.ObjectId[];
  hallId?: IHall | Types.ObjectId;
  reservation?: Types.ObjectId;
  chatRooms: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  profileImage: { type: String },
  favorites: [{ type: Types.ObjectId, ref: "Hall" }],
  hallId: { type: Types.ObjectId, ref: "Hall" },
  reservation: { type: Types.ObjectId, ref: "Booking" },
  chatRooms: [{ type: Types.ObjectId, ref: "ChatRoom" }],
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
