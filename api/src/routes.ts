import { Express } from "express";
import { createSessionHandler, getSessionHandler, deleteSessionHandler } from './controllers/session.controller';
import { createUserHandler, getUserHandler } from './controllers/user.controller';
import { requireUser } from "./middleware/requireUser";

function routes(app: Express) {

    // CREATE USER ACCOUNT
    app.post('/api/signup', createUserHandler);

    // GET USER DATA
    app.get('/api/login', getUserHandler)

    // LOGIN
    app.post('/api/session', createSessionHandler);

    // GET THE CURRENT SESSION
    app.get('/api/session', requireUser, getSessionHandler);

    // LOGOUT
    app.delete('/api/session', requireUser, deleteSessionHandler);
}

export default routes;
