import { Document, model, now, Schema, Types, ObjectId } from "mongoose";

export interface IMessage extends Document {
  message: string;
  date: Date;
  senderId: string;
  receiverId: string;
  chatRoom: ObjectId;
}

const messageSchema = new Schema<IMessage>({
  message: { type: String, required: true },
  date: { type: Date, required: true, default: now(), immutable: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  chatRoom: { type: Types.ObjectId, required: true, ref: "ChatRoom" },
});

const MongooseModel = model<IMessage>("Message", messageSchema);

export default MongooseModel;
