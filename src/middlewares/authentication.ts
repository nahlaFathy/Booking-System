// auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

// Middleware function to check if user is authenticated
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the request header
    const token = req.header('Authorization');
    const _jwt = token?.replace('Bearer ', '');

    // Check if token is present
    if (!_jwt || _jwt === 'undefined') {
        return next(new Error("Unauthorized"));
    }
    try {
        // Verify and decode the token
        const decoded = jwt.verify(_jwt, process.env.JWT_SECRET_KEY || 'secret-key') as unknown as { userId: string };

        const user = await User.findById(decoded.userId);
        if (!user) {
            return next(new Error("Unauthorized"));
        }
        // Set the decoded user ID to the request object
        req.userId = decoded.userId;

        // Continue to the next middleware or route handler
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid authorization token' });
    }
};
