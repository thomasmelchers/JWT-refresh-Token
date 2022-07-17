import { Request, Response } from 'express';
import config  from 'config';
import { createSession, invalidateSession } from '../services/session.services';
import { signJWT, verifyJWT } from '../utils/jwt.utils';
import cookieParser from 'cookie-parser';
import { getUser } from '../services/user.services';
import { UserModelInterface } from '../models/user.models';

const expireAccessToken: string = '5s';
const expireVerifyToken: string = '1y';

// const expireAccessToken: string = config.get<string>('expireAccessToken');
// const expireVerifyToken: string = config.get<string>('expireVerifyToken');


// LOGIN HANDLER
export const createSessionHandler = async(req: Request, res: Response) => {

    // Check if the password is correct
    const {email, password} = req.body;

    const user = await getUser({email, password});

    if (!user) {
    return res.status(401).send('Invalid credentials');}

    const session = createSession(email, user.name);

    // create access token
    const accessToken = signJWT({ email: user.email, name: user.name, sessionId: session.sessionId}, expireAccessToken);
    console.log(expireAccessToken);
    const refreshToken = signJWT({ sessionId: session.sessionId}, expireVerifyToken);
    console.log('refreshToken:', refreshToken)

    // set access token in cookie

    res.cookie('accessToken', accessToken, {
        maxAge: 300000, // 5 minutes
        httpOnly: true,
        secure: (config.get<string>('NODE_ENV')  === 'production')? true : false, // only works if https ! not working on localhost
        sameSite: (config.get<string>('NODE_ENV')  === 'production')? 'none': false
    });
    res.cookie('refreshToken', refreshToken, {
        maxAge: 3.154e10, // 1 year in millisecond
        httpOnly: true,
        secure: (config.get<string>('NODE_ENV')  === 'production')? true : false,
        sameSite: (config.get<string>('NODE_ENV')  === 'production')? 'none': false
    });

    // send user back

    return res.send(session);
    // return res.send(verifyJWT(accessToken).payload)
}
// GET SESSION

export const getSessionHandler = (req: Request, res: Response) => {
    // @ts-ignore
    return res.send(req.user);
}
// LOGOUT HANDLER

export const deleteSessionHandler = (req: Request, res: Response) => {
    res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
    });

    res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
    });

    //@ts-ignore
    const session = invalidateSession(req.user.sessionId);

    //res.send({success: true})
    res.send(session);
}