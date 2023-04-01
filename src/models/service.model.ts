import { Document, model, now, Schema, Types, ObjectId } from "mongoose";
import { IOffer } from "./offer.model";
import { IReservation } from "./reservation.model";

export interface IService extends Document {
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  hallId: ObjectId;
  reservations: Types.Array<ObjectId | IReservation>;
  offers: Types.Array<ObjectId | IOffer>;
}

const serviceSchema = new Schema<IService>({
  name: { type: String, required: true, minlength: 2 },
  description: { type: String, required: true, default: "" },
  price: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: now(), immutable: true },
  updatedAt: { type: Date, required: true, default: now() },
  hallId: { type: Types.ObjectId, required: true, ref: "Hall" },
  reservations: {
    type: [{ type: Types.ObjectId, ref: "Reservation" }],
    required: true,
    default: [],
  },
  offers: { type: [{ type: Types.ObjectId, ref: "Offer" }], required: true, default: [] },
});

const ServiceModel = model<IService>("Service", serviceSchema);

export default ServiceModel;

export const fillServices = async (hallId: string) => {
  const services = [];

  let service = new ServiceModel({
    name: "some name",
    description: "description",
    price: 5,
    hallId: "640e1a4d022d66b3c94b5fd4",
  });

  let anotherService = new ServiceModel({
    name: "another service",
    description: "description",
    price: 8,
    hallId: hallId,
  });

  services.push(service);
  services.push(anotherService);

  await ServiceModel.insertMany(services);
};
