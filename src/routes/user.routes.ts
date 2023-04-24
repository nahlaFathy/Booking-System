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

		this._router.put('/', authenticateUser, UserController.updateUser);

		this._router.delete('/', authenticateUser, UserController.deleteUser);
	}

}

export default new UserRouter().router;
