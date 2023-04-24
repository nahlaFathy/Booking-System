import { Schema, model, Document, Types } from "mongoose";

interface IMessage extends Document {
  senderId: Types.ObjectId; 
  receiverId: Types.ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "Guest", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "Guest", required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

// Create a method to fetch messages based on a certain guest
messageSchema.statics.findByGuestId = function (guestId: string) {
  return this.find({ $or: [{ sender: guestId }, { receiver: guestId }] });
};

export const Message = model<IMessage>("Message", messageSchema);
