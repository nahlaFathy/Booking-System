import { Schema, model, Document, Types } from "mongoose";

export interface IMessage extends Document {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

// Create a method to fetch messages based on a certain guest
messageSchema.statics.findByGuestId = function (guestId: string) {
  return this.find({ $or: [{ sender: guestId }, { receiver: guestId }] });
};

const Message = model<IMessage>("Message", messageSchema);
export default Message;
