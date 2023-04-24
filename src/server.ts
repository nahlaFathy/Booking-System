import express, {Application} from "express";
import load from "./loaders/index";
import dotenv from 'dotenv';
dotenv.config({
	path: '.env'
});
const url: string = process.env.DATABASE_CONNECTION!

export function createServer(): Application {
    const app: Application = express();

    load({
        express: app,
        url
    })

    return app;
}
