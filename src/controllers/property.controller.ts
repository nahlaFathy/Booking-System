
import { Request, Response } from 'express';
import PropertyService from '../services/property.service';
const propertyService = new PropertyService();
import { Types } from 'mongoose';

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
            const {id: propertyId } = req.params;
            const property = await propertyService.getPropertyDetails(new Types.ObjectId(propertyId));
            return res.status(200).json({ data: property })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async createProperty(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const property = await propertyService.createProperty({ name });
            return res.status(201).json({ data: property })
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async updateProperty(req: Request, res: Response) {
        try {
            const {id: propertyId } = req.params;
            const updatedFields = req.body;
            const updatedProperty = await propertyService.updateProperty( new Types.ObjectId(propertyId), updatedFields);
            return res.status(200).json({ data: updatedProperty });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }
    
    async deleteProperty(req: Request, res: Response) {
        try {
            const {id: propertyId } = req.params;
            const deletedProperty = await propertyService.deleteProperty( new Types.ObjectId(propertyId));
            return res.status(200).json({ data: deletedProperty });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

}

export default new PropertyController();
