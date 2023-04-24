import express from 'express';
import UserController from '../controllers/user.controllers';
import { authenticateUser } from '../middlewares/authentication';

class UserRouter {
	private _router = express();
	get router() {
		return this._router;
	}

	constructor() {
		this._routes();
	}

	private _routes() {
		this._router.get('/', authenticateUser, UserController.getUser);
		this._router.get('/messages', authenticateUser, UserController.getUserMessages);
		this._router.get('/reservations', authenticateUser, UserController.getGuestReservations);
		this._router.get('/reservations/:reservationId', authenticateUser, UserController.getGuestReservation);
		this._router.patch('/', authenticateUser, UserController.updateUser);
		this._router.post('/message', authenticateUser, UserController.createMessage);

	}

}

export default new UserRouter().router;
