import { Router } from 'express';
import bodyParser from 'body-parser'
import UserRoutes from './guest.routes';
import AuthRoutes from './auth.routes';
import ReservationRotes from './reservation.routes';
import PropertyRoutes from './property.routes';
import MessageRoutes from './message.routes';

class MasterRouter {
	private _router = Router();
	private _userRouter = UserRoutes;
	private _authRouter = AuthRoutes;
	private _reservationRouter = ReservationRotes;
	private _propertyRouter = PropertyRoutes;
	private _messageRouter = MessageRoutes;

	get router() {
		return this._router;
	}

	constructor() {
		this._configure();
	}

	/**
	 * Connect routes to their matching routers.
	 */
	private _configure() {
		this._router.use(bodyParser.json());
		this._router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
		this._router.use('/guest', this._userRouter);
		this._router.use('/auth', this._authRouter);
		this._router.use('/reservation', this._reservationRouter);
		this._router.use('/property', this._propertyRouter);
		this._router.use('/message', this._messageRouter)
	}
}

export default new MasterRouter().router;
