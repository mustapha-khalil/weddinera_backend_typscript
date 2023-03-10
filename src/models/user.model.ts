import { Document, model, Schema, Types } from "mongoose";
import { IHall } from "./hall.model";

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  profileImage?: string;
  hallId?: IHall | Types.ObjectId;
  reservation?: Types.ObjectId;
  passwordResetToken: string | null;
  favorites: Types.ObjectId[];
  chatRooms: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  profileImage: { type: String, default: null },
  hallId: { type: Types.ObjectId, ref: "Hall", default: null },
  reservation: { type: Types.ObjectId, ref: "Booking", default: null },
  passwordResetToken: { type: String, default: null },
  favorites: { type: [{ type: Types.ObjectId, ref: "Hall" }], default: [] },
  chatRooms: { type: [{ type: Types.ObjectId, ref: "ChatRoom" }], default: [] },
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
