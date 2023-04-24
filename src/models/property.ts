import { Schema, model, Document } from 'mongoose';

export interface IProperty extends Document {
  name: string;
  deletedAt?: Date;
}

const PropertySchema = new Schema(
  {
    name: { type: String, required: true },
    deletedAt: { type: Date, required: false, default: null }   // for soft delection
  },
  { timestamps: true }
);

const Property = model<IProperty>("Property", PropertySchema);

export default Property;