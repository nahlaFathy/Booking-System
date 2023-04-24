
import { Date, Types } from 'mongoose';
import Reservation, { IReservation } from '../models/reservation';
import Property from '../models/property';

class ReservationService {

    // Get reservations for a specific user
    async getReservationsByUserId(userId: Types.ObjectId): Promise<(IReservation)[]> {
        try {
            const reservations = await Reservation.find({ guest: userId });
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
            const reservation = await Reservation.findOne({ guest: userId, _id: reservationId });
            if (!reservation) {
                throw new Error('Reservation does not exist');
            }

            return reservation;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async getReservationByPropertyId(propertyId: Types.ObjectId): Promise<(IReservation)[]> {
        try {
            const reservations = await Reservation.find({ property: propertyId });
            if (!reservations) {
                throw new Error('Property does not exist');
            }

            return reservations;
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

    async createReservation({ guestId, propertyId, startDate, endDate }: { guestId: Types.ObjectId, propertyId: Types.ObjectId, startDate: Date, endDate: Date }): Promise<IReservation> {
        const property = await Property.findById(propertyId);
        if (!property) {
            throw new Error('Property does not exist');
        }
        const newReservation = new Reservation({
            guest: guestId,
            property: propertyId,
            startDate,
            endDate
        })
        // Save the reservation to the database
        const createdReservation = await newReservation.save();
        return createdReservation;
    }

    // Update an existing reservation for a specific user
    async updateReservation(userId: Types.ObjectId, reservationId: Types.ObjectId, updatedFields: IReservation): Promise<IReservation> {
        try {
            // Find the Reservation by user id and reservation id
            const reservation = await Reservation.findOne({ guest: userId, _id: reservationId });
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
    }

    // Get property guests
    async getPropertyGuests(propertyId: Types.ObjectId) {
        const property = await Property.findById(propertyId);
        if (!property) {
            throw new Error('Property does not exist');
        }

        const reservations = await Reservation.find({ property: propertyId }).populate("guest");
        const guests = reservations.map((reservation) => { reservation.guest });
        return guests;
    }

}

export default ReservationService;
