import { Request, Response } from "express";
import logger from "../utils/logger";
import {omit} from "lodash";
import { createUser, getUser } from "../services/user.services";
import { IUser } from "../models/interfaces/user.interface";



export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        console.log(user)
        return res.status(201).send(user);

    } catch (err: any) {

        res.status(403).send(err.message);

    }
}

export const getUserHandler = async (req: Request, res: Response) => {
    try {

        const { password, email } = req.body
        const user = await getUser({ email, password });
        res.status(200).send(user);

    } catch (err: any) {

        logger.error(err);
        res.status(401).send(err.message)

    }
}