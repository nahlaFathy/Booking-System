
import { loadExpress } from './express';
import { Application } from 'express';
import connect from './mongoConnection';


export default function ({ express: app, url }: { express: Application, url: string }) {
    loadExpress(app);
    connect(url);
}