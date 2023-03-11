import { Document, model, now, Schema, Types } from "mongoose";

export interface IReservation extends Document {
  userId?: Types.ObjectId;
  hallId?: Types.ObjectId;
  date: Date;
  createdAt: Date;
}

const reservationSchema = new Schema<IReservation>({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  hallId: { type: Types.ObjectId, ref: "Hall", required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, required: true, default: now() },
});

const reservationModel = model<IReservation>("Reservation", reservationSchema);

export default reservationModel;
