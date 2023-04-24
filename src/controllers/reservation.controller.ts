
import { Request, Response } from 'express';
import ReservationService from '../services/reservation.service';
const reservationService = new ReservationService();
import { Types } from 'mongoose';

class ReservationController {

    async getReservations(req: Request, res: Response) {
        try {
            const reservations = await reservationService.getReservations();
            return res.status(200).json({ data: reservations })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async getReservation(req: Request, res: Response) {
        try {
            const { id: reservationId } = req.params;
            const userReservations = await reservationService.getReservationDetails(new Types.ObjectId(reservationId));
            return res.status(200).json({ data: userReservations })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async createReservations(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const { propertyId, startDate, endDate } = req.body;
            const reservation = await reservationService.createReservation({ guestId: new Types.ObjectId(userId), propertyId: new Types.ObjectId(propertyId), startDate, endDate });
            return res.status(201).json({ data: reservation })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async updateReservation(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const { id: reservationId } = req.params;
            const updatedFields = req.body;
            const updatedReservation = await reservationService.updateReservation(new Types.ObjectId(userId), new Types.ObjectId(reservationId), updatedFields);
            return res.status(200).json({ data: updatedReservation });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

}

export default new ReservationController();
