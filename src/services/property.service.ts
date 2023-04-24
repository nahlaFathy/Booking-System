
import { Date, Types } from 'mongoose';
import Property, { IProperty } from '../models/property';

class PropertyService {

    // list all properties 
    async getProperties(): Promise<(IProperty)[]> {
        try {
            const propertys = await Property.find();
            if (!propertys) {
                throw new Error('User does not exist');
            }

            return propertys;
        } catch (err: any) {
            throw new Error(err);
        }
    };

    // Get specific property details
    async getPropertyDetails(propertyId: Types.ObjectId): Promise<(IProperty)> {
        try {
            const property = await Property.findById(propertyId);
            if (!property) {
                throw new Error('Property does not exist');
            }

            return property;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    // Crreate new property
    async addProperty({ name }: { name: string }): Promise<(IProperty)> {

        const newProperty = new Property({
            name
        });

        // Save the property to the database
        const createdProperty = await newProperty.save();
        return createdProperty;
    }

    // Update an existing property
    async updateProperty(propertyId: Types.ObjectId, updatedFields: IProperty): Promise<(IProperty)> {
        try {
            // Find the Property by user id and property id
            const property = await Property.findById(propertyId);
            if (!property) {
                throw new Error('Property does not exist');
            }

            // Update the Property fields
            const updatedProperty = await Property.findByIdAndUpdate(propertyId, updatedFields, { new: true });
            if (!updatedProperty) {
                throw new Error('Error while updating property');
            }

            return updatedProperty;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    // soft delete property as it has reference in reservation and can't be hard deleted 
    async deleteProperty(propertyId: Types.ObjectId): Promise<boolean> {
        try {
            // Find the Property by user id and property id
            const property = await Property.findById(propertyId);
            if (!property) {
                throw new Error('Property does not exist');
            }

            // Update the Property fields
            const softDeleteProperty = await Property.findByIdAndUpdate(propertyId, { deletedAt: Date.now() }, { new: true });
            if (!softDeleteProperty) {
                throw new Error('Error while deleting property');
            }

            return true;
        } catch (err: any) {
            throw new Error(err);
        }
    }


}

export default PropertyService;
