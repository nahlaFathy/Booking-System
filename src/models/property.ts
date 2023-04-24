import { Schema, model, Document, Types } from 'mongoose';

export interface IProperty extends Document {
  name: string;
  manager: Types.ObjectId;
  deletedAt?: Date;
}

const PropertySchema = new Schema(
  {
    name: { type: String, required: true },
    manager: { type: Types.ObjectId, ref: "User", required: true },
    deletedAt: { type: Date, required: false, default: null }   // for soft delection
  },
  { timestamps: true }
);

const Property = model<IProperty>("Property", PropertySchema);

export default Property;