import { Document, model, now, Schema, Types } from "mongoose";

export interface IHall extends Document {
  hallName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  price: number;
  ownerId: Types.ObjectId | null;
  createdAt: Date;
  status: "pending" | "approved" | "rejected";
  images: string[];
  reservations: Types.ObjectId[];
  chatRooms: Types.ObjectId[];
}

const hallSchema = new Schema<IHall>({
  hallName: { type: String, required: true },
  countryCode: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  ownerId: { type: Types.ObjectId, required: true, ref: "User" },
  createdAt: { type: Date, default: now() },
  status: { type: String, enum: ["approved", "rejected", "pending"], default: "pending" },
  images: { type: [{ type: String, required: true }], default: [] },
  reservations: {
    type: [{ type: Types.ObjectId, required: true, ref: "Reservation" }],
    default: [],
  },
  chatRooms: { type: [{ type: Types.ObjectId, ref: "ChatRoom" }], default: [] },
});

const HallModel = model<IHall>("Hall", hallSchema); // this will later be the name of the collection in the database( but with lowercase and plural)

export default HallModel;
