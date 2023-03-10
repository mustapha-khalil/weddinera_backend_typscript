import { Document, model, Schema, Types } from "mongoose";

export interface IReservation extends Document {
  userId?: Types.ObjectId;
  hallId?: Types.ObjectId;
  date: Date;
}

const reservationSchema = new Schema<IReservation>({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  hallId: { type: Types.ObjectId, ref: "Hall", required: true },
  date: { type: Date, required: true },
});

const reservationModel = model<IReservation>("Reservation", reservationSchema);

export default reservationModel;
