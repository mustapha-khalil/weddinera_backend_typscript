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
  offerId: { type: Types.ObjectId, default: null, ref: "Offer" },
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
