
import { Request, Response } from 'express';
import PropertyService from '../services/property.service';
const propertyService = new PropertyService();
import { Types } from 'mongoose';
import ReservationService from '../services/reservation.service';
const reservationService = new ReservationService();

class PropertyController {

    async getProperties(req: Request, res: Response) {
        try {
            const properties = await propertyService.getProperties();
            return res.status(200).json({ data: properties })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async getProperty(req: Request, res: Response) {
        try {
            const { id: propertyId } = req.params;
            const property = await propertyService.getPropertyDetails(new Types.ObjectId(propertyId));
            return res.status(200).json({ data: property })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async addProperty(req: Request, res: Response) {
        try {
            const manager = req.userId;
            const { name } = req.body;
            const property = await propertyService.addProperty({ name, manager: new Types.ObjectId(manager) });
            return res.status(201).json({ data: property })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async updateProperty(req: Request, res: Response) {
        try {
            const { id: propertyId } = req.params;
            const updatedFields = req.body;
            const updatedProperty = await propertyService.updateProperty(new Types.ObjectId(propertyId), updatedFields);
            return res.status(200).json({ data: updatedProperty });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async deleteProperty(req: Request, res: Response) {
        try {
            const { id: propertyId } = req.params;
            const deletedProperty = await propertyService.deleteProperty(new Types.ObjectId(propertyId));
            return res.status(200).json({ data: deletedProperty });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async getPropertyReservations(req: Request, res: Response) {
        try {
            const { id: propertyId } = req.params;
            const reservations = await reservationService.getReservationByPropertyId(new Types.ObjectId(propertyId))
            return res.status(200).json({ data: reservations });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async getPropertyGuests(req: Request, res: Response) {
        try {
            const { id: propertyId } = req.params;
            const guests = await reservationService.getPropertyGuests(new Types.ObjectId(propertyId));
            return res.status(200).json({ data: guests });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

}

export default new PropertyController();
