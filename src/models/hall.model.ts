import { Document, model, Schema, Types } from "mongoose";

export interface IHall extends Document {
  hallName: string;
  email: string;
  mobileNumber: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  price: number;
  images: [string];
  bookings: [Types.ObjectId];
  ownerId: Types.ObjectId | null;
  chatRooms: [Types.ObjectId];
}

const hallSchema = new Schema<IHall>({
  hallName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  price: { type: Number, required: true }, // per person
  images: [{ type: String, required: true }],
  bookings: [{ type: Types.ObjectId, required: true, ref: "Booking" }],
  ownerId: { type: Types.ObjectId, required: true, ref: "User" },
  chatRooms: [{ type: Types.ObjectId, ref: "ChatRoom" }],
});

const HallModel = model<IHall>("Hall", hallSchema); // this will later be the name of the collection in the database( but with lowercase and plural)

export default HallModel;
