import express from 'express';
import AuthController from '../controllers/auth.controller';

class AuthRouter {
	private _router =  express();
    get router() {
		return this._router;
	}

    constructor() {
		this._routes();
	}

    private _routes() {
		this._router.post('/login', AuthController.login);
        this._router.post('/signup', AuthController.signup);
	}

}

export default new AuthRouter().router;
