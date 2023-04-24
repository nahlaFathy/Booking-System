import express from 'express';
import PropertyController from '../controllers/property.controller';
import { authenticateUser } from '../middlewares/authentication';

class PropertyRouter {
	private _router = express();
	get router() {
		return this._router;
	}

	constructor() {
		this._routes();
	}

	private _routes() {
		this._router.get('/', authenticateUser, PropertyController.getProperties);
        this._router.get('/:id', authenticateUser, PropertyController.getProperty);
        this._router.post('/', authenticateUser, PropertyController.createProperty);
        this._router.patch('/:id', authenticateUser, PropertyController.updateProperty);
        this._router.delete('/:id', authenticateUser, PropertyController.deleteProperty);
	}

}

export default new PropertyRouter().router;
