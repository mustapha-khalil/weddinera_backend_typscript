import { Document, model, now, Schema, Types, ObjectId } from "mongoose";

export interface IService extends Document {
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  hallId: ObjectId;
  offerId: ObjectId | null;
}

const serviceSchema = new Schema<IService>({
  name: { type: String, required: true, minlength: 2 },
  description: { type: String, required: true, default: "" },
  price: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: now() },
  hallId: { type: Types.ObjectId, required: true, ref: "Hall" },
  offerId: { type: Types.ObjectId, required: true, default: null, ref: "Offer" },
});

const ServiceModel = model<IService>("Service", serviceSchema);

export default ServiceModel;
