import { Document, model, now, Schema, Types, ObjectId } from "mongoose";
import { IOffer } from "./offer.model";
import { IService } from "./service.model";

export interface IReservation extends Document {
  userId: ObjectId;
  hallId: ObjectId;
  date: Date;
  createdAt: Date;
  totalPrice: number;
  status: "approved" | "cancelled";
  services: Types.Array<ObjectId | IService>;
  offers: Types.Array<ObjectId | IOffer>;
}

const reservationSchema = new Schema<IReservation>({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  hallId: { type: Types.ObjectId, ref: "Hall", required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, required: true, default: now() },
  totalPrice: { type: Number, required: true, default: 0 },
  status: { type: String, required: true, enum: ["approved", "cancelled"], default: "approved" },
  services: { type: [{ type: Types.ObjectId, ref: "Service" }], required: true, default: [] },
  offers: { type: [{ type: Types.ObjectId, ref: "Offer" }], required: true, default: [] },
});

const reservationModel = model<IReservation>("Reservation", reservationSchema);

export default reservationModel;
