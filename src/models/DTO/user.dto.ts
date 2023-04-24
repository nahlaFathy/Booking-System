import { Types } from "mongoose";

export default interface IGuest {
    _id?: Types.ObjectId,
    name: string,
    phone: string,
    secret?: string
}