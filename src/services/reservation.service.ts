
import { Date, Types } from 'mongoose';
import Reservation, { IReservation } from '../models/reservation';
import Property from '../models/property';

class ReservationService {

    // Get reservations for a specific user
    async getReservationsByUserId(userId: Types.ObjectId): Promise<(IReservation)[]> {
        try {
            const reservations = await Reservation.find({ guestId: userId });
            if (!reservations) {
                throw new Error('User does not exist');
            }

            return reservations;
        } catch (err: any) {
            throw new Error(err);
        }
    };

    // list all reservations 
    getReservations(): Promise<(IReservation)[]> {
        try {
            return Reservation.find();
        } catch (err: any) {
            throw new Error(err);
        }
    };

    // Get specific reservation details for a specific user
    async getReservationDetailsByUserId(userId: Types.ObjectId, reservationId: Types.ObjectId): Promise<(IReservation)> {
        try {
            const reservation = await Reservation.findOne({ guestId: userId, _id: reservationId });
            if (!reservation) {
                throw new Error('Reservation does not exist');
            }

            return reservation;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    // Get specific reservation details
    async getReservationDetails(reservationId: Types.ObjectId): Promise<(IReservation)> {
        try {
            const reservation = await Reservation.findById(reservationId);
            if (!reservation) {
                throw new Error('Reservation does not exist');
            }

            return reservation;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async createReservation({ guestId, propertyId, startDate, endDate }: { guestId: Types.ObjectId, propertyId: Types.ObjectId, startDate: Date, endDate: Date }) {
        const property = await Property.findById(propertyId);
        if (property) {
            throw new Error('property does not exist');
        }
        const newReservation = new Reservation({
            guestId,
            propertyId,
            startDate,
            endDate
        })
        // Save the reservation to the database
        const createdReservation = await newReservation.save();
        return createdReservation;
    }

    // Update an existing reservation for a specific user
    async updateReservation(userId: Types.ObjectId, reservationId: Types.ObjectId, updatedFields: IReservation) {
        try {
            // Find the Reservation by user id and reservation id
            const reservation = await Reservation.findOne({ guestId: userId, _id: reservationId });
            if (!reservation) {
                throw new Error('Reservation does not exist');
            }

            // Update the Reservation fields
            const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, updatedFields, { new: true });
            if (!updatedReservation) {
                throw new Error('Error while updating reservation');
            }

            return updatedReservation;
        } catch (err: any) {
            throw new Error(err);
        }
    };

}

export default ReservationService;
