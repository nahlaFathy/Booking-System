import { Schema, model, Document, Types } from 'mongoose';

// Define ReservationStatus enum
enum ReservationStatus {
  Booked = 'booked',
  CheckedIn = 'checked-in',
  CheckedOut = 'checked-out',
  Cancelled = 'cancelled'
}

export interface IReservation extends Document {
  guestId: Types.ObjectId;
  propertyId: Types.ObjectId;
  status?: ReservationStatus;
  startDate: Date;
  endDate: Date;
}

const ReservationSchema = new Schema(
  {
    guestId: { type: Types.ObjectId, ref: "User", required: true },
    propertyId: { type: Types.ObjectId, ref: "Property", required: true },
    status: { type: ReservationStatus, required: true, default: ReservationStatus.Booked },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Reservation = model<IReservation>("Reservation", ReservationSchema);


export default Reservation;

