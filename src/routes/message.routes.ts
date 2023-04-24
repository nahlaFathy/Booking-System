import express from 'express';
import MessageController from '../controllers/message.controller';
import { authenticateUser } from '../middlewares/authentication';

class MessageRouter {
    private _router = express();
    get router() {
        return this._router;
    }

    constructor() {
        this._routes();
    }

    private _routes() {
        this._router.get('/', authenticateUser, MessageController.listMessages);
        this._router.get('/:id', authenticateUser, MessageController.getMessage);

    }

}

export default new MessageRouter().router;
