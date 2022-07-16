import { Types } from 'mongoose';

export interface IUser {
        _id: Types.ObjectId,
        email: string,
        name: string,
        createdAt: Date;
        updatedAt: Date;
}


export interface ICreateUser {
        email: string,
        password: string,
        name: string,
}

