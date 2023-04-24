
import { Types } from 'mongoose';
import Message, { IMessage } from '../models/message';
import User from '../models/user';

class MessageService {
    // Get smessages for a specific guest
    async getMessagesByGuestId(guestId: Types.ObjectId): Promise<IMessage[]> {
        try {
            const messages = await Message.find({ $or: [{ sender: guestId }, { receiver: guestId }] });
            if (!messages) {
                throw new Error('User not found');
            }

            return messages;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    listMessages() {
        try {
            return Message.find();
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async getMessage(messageId: Types.ObjectId): Promise<IMessage> {
        try {
            const message = await Message.findById(messageId);
            if (!message) {
                throw new Error('Message does not exist');
            }
            return message;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async createMessage({ sender, receiver, body }: { sender: Types.ObjectId, receiver: Types.ObjectId, body: string }) {
        try {
            const receiverUser = await User.findById(receiver);
            if (!receiverUser) {
                throw new Error('receiver does not exist');
            }

            const newMessage = new Message({
                sender,
                receiver,
                body
            })
            // Save the user to the database
            const createdMessage = await newMessage.save();
            return createdMessage;

        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default MessageService;
