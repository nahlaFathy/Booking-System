
import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
const userService = new UserService();
import ReservationService from '../services/reservation.service';
const reservationService = new ReservationService();
import { Types } from 'mongoose';
import MessageService from '../services/message.service';
const messageService = new MessageService();

class UserController {

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const guestId = req.userId;
            const user = await userService.getUserByUserId(new Types.ObjectId(guestId));
            delete user.secret;
            return res.status(200).json({ data: user })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async getGuestReservations(req: Request, res: Response) {
        try {
            const guestId = req.userId;
            const userReservations = await reservationService.getReservationsByUserId(new Types.ObjectId(guestId));
            return res.status(200).json({ data: userReservations })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async getGuestReservation(req: Request, res: Response) {
        try {
            const guestId = req.userId;
            const { reservationId } = req.params;
            const userReservations = await reservationService.getReservationDetailsByUserId(new Types.ObjectId(guestId), new Types.ObjectId(reservationId));
            return res.status(200).json({ data: userReservations })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }


    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const guestId = req.userId;
            const updatedFields = req.body;
            const updatedUser = await userService.updateUser(new Types.ObjectId(guestId), updatedFields);
            return res.status(200).json({ data: updatedUser });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async getUserMessages(req: Request, res: Response) {
        try {
            const guestId = req.userId;
            const userReservations = await messageService.getMessagesByGuestId(new Types.ObjectId(guestId))
            return res.status(200).json({ data: userReservations })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async createMessage(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const { receiver, body } = req.body;
            const messages = await messageService.createMessage({ sender: new Types.ObjectId(userId), receiver: new Types.ObjectId(receiver), body });
            return res.status(200).json({ data: messages });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }
}

export default new UserController();
