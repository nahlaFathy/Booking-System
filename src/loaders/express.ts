import cors from 'cors';
import express, { Application } from 'express';
import MasterRouter from '../routes';



export function loadExpress(app: Application) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use('/', MasterRouter);

}
