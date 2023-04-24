import express from 'express';
import ReservationController from '../controllers/reservation.controller';
import { authenticateUser } from '../middlewares/authentication';
class ReservationRouter {
	private _router = express();
	get router() {
		return this._router;
	}

	constructor() {
		this._routes();
	}

	private _routes() {
		this._router.get('/', authenticateUser, ReservationController.getReservations);
        this._router.get('/:id', authenticateUser, ReservationController.getReservation);
        this._router.post('/', authenticateUser, ReservationController.createReservations);
        this._router.patch('/:id', authenticateUser, ReservationController.updateReservation);
	}

}

export default new ReservationRouter().router;
