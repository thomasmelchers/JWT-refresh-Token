import { NextFunction, Request, Response } from 'express';
import { signJWT, verifyJWT } from '../utils/jwt.utils';
import config from 'config';
import { getSession } from '../services/session.services';

const expireAccessToken = config.get<string>('expireAccessToken');

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const {accessToken, refreshToken} = req.cookies;

    if (!accessToken) {
        return next();
    }

    
    const {payload, expired} = verifyJWT(accessToken);
   
    // For a valid access token
    if(payload) {
        // @ts-ignore
        req.user = payload;

        return next();
    }

    // expired but valid access token
    const { payload: refresh } = 
        expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };
    if(!refresh){
        return next();
    }

    //@ts-ignore
    const session = getSession(refresh.sessionId);

    //@ts-ignore
    if(!session){
        return next();
    }

    // creation of a new accessToken if the session exists into the cookie
    const newAccessToken = signJWT(session, "5s");
    
    res.cookie('accessToken', newAccessToken, {
        maxAge: 300000, // 5 minutes
        httpOnly: true,
    });

    //@ts-ignore
    req.user = verifyJWT(newAccessToken).payload;

    return next();
}

export default deserializeUser;