import { Response, Request, NextFunction } from 'express';

// Need to be logged in to get a session ! 

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if(!req.user){
        return res.status(403).send('Invalid Session')
    }

    return next();
}