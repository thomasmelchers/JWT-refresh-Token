import UserModel from "../models/user.models";
import { omit } from 'lodash';
import { ICreateUser, IUser } from "../models/interfaces/user.interface";


export const createUser = async (input: ICreateUser) : Promise<IUser> => {
    try {
        const user = await UserModel.create(input);
        return omit(user.toJSON(), "password");

    } catch (err: any) {
        return (err);
    }
}

export const getUser = async ({email, password}:{email: string, password: string}) : Promise<IUser | false> => {
    try {
        
        const user = await UserModel.findOne({email});

        if(!user) { return false };

        const isValid = await user.comparePassword(password);
         if (!isValid) { return false };

        //return user;
        return omit(user.toJSON(), "password");

    } catch (err: any) {
        return (err);
    }
}