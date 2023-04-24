
import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
const userService = new UserService();
import ReservationService from '../services/reservation.service';
const reservationService = new ReservationService();
import { Types } from 'mongoose';
class UserController {


    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId  = req.userId;
            const updatedFields = req.body;
            const updatedUser = await userService.updateUser(new Types.ObjectId(userId), updatedFields);
            return res.status(200).json({ data: updatedUser });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId  = req.userId;
            const deletedUser = await userService.deleteUser(new Types.ObjectId(userId));
            return res.status(200).json({ data: deletedUser });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId  = req.userId;
            const userUser = await userService.getUserByUserId(new Types.ObjectId(userId));
            return res.status(200).json({ data: userUser })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async getReservations(req: Request, res: Response) {
        try {
            const userId  = req.userId;
            const userReservations = await reservationService.getReservationsByUserId(new Types.ObjectId(userId));
            return res.status(200).json({ data: userReservations })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async getReservation(req: Request, res: Response) {
        try {
            const userId  = req.userId;
            const { reservationId } = req.params;
            const userReservations = await reservationService.getReservationDetailsByUserId(new Types.ObjectId(userId), new Types.ObjectId(reservationId));
            return res.status(200).json({ data: userReservations })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }
}

export default new UserController();
