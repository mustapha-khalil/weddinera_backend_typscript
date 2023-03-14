import { Document, model, now, Schema, Types, ObjectId } from "mongoose";
import { IService } from "./service.model";

export interface IOffer extends Document {
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  services: Types.Array<ObjectId | IService>;
}

const offerSchema = new Schema<IOffer>({
  name: { type: String, required: true, minlength: 2 },
  description: { type: String, required: true, minlength: 10 },
  price: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: now(), immutable: true },
  updatedAt: { type: Date, required: true, default: now() },
  services: { type: [{ type: Types.ObjectId, ref: "Service" }], required: true, default: [] },
});

const OfferModel = model<IOffer>("Offer", offerSchema);

export default OfferModel;
