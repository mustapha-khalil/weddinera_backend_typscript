import { Document, model, now, Schema, Types, ObjectId } from "mongoose";

export interface IChatroom extends Document {
  userId: ObjectId;
  hallId: ObjectId;
  createdAt: Date;
  messages: Types.ObjectId[];
}

const chatroomSchema = new Schema<IChatroom>({
  userId: { type: Types.ObjectId, required: true },
  hallId: { type: Types.ObjectId, required: true },
  createdAt: { type: Date, required: true, default: now() },
  messages: { type: [{ type: Types.ObjectId, ref: "Message" }], default: [] },
});

const ChatroomModel = model<IChatroom>("ChatRoom", chatroomSchema);

export default ChatroomModel;
