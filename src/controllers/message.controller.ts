import { Request, Response } from 'express';
import MessageService from '../services/message.service';
import { Types } from 'mongoose';
const messageService = new MessageService();

class MessageController {

    async listMessages(req: Request, res: Response) {
        try {
            const messages = await messageService.listMessages();
            return res.status(200).json({ data: messages });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async getMessage(req: Request, res: Response) {
        try {
            const { id: messageId } = req.params;
            const messages = await messageService.getMessage(new Types.ObjectId(messageId));
            return res.status(200).json({ data: messages });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }


}

export default new MessageController();