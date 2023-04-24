import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
const authService = new AuthService();

class AuthController {

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { phone, secret } = req.body;
            const token = await authService.login(phone, secret);
            return res.status(200).json({ token });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, secret, type } = req.body;
            const user = await authService.signup(username, email, secret, type);
            return res.status(200).json({ user });
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ error: error.message })
        }
    }

}

export default new AuthController();