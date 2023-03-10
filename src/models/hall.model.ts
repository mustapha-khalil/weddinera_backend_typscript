import { Document, model, Schema, Types } from "mongoose";

export interface IHall extends Document {
  hallName: string;
  mobileNumber: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  price: number;
  ownerId: Types.ObjectId | null;
  images: string[];
  bookings: Types.ObjectId[];
  chatRooms: Types.ObjectId[];
}

const hallSchema = new Schema<IHall>({
  hallName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  price: { type: Number, required: true }, // per person
  ownerId: { type: Types.ObjectId, required: true, ref: "User" },
  images: { type: [{ type: String, required: true }], default: [] },
  bookings: { type: [{ type: Types.ObjectId, required: true, ref: "Booking" }], default: [] },
  chatRooms: { type: [{ type: Types.ObjectId, ref: "ChatRoom" }], default: [] },
});

const HallModel = model<IHall>("Hall", hallSchema); // this will later be the name of the collection in the database( but with lowercase and plural)

export default HallModel;
