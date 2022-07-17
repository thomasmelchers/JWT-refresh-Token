import mongoose from 'mongoose';
import config from 'config';
import logger from './logger'


export const connect = async () => {
    const databaseUrl  = process.env.DATABASEURL!;

    try {
        await mongoose.connect(databaseUrl);
        logger.info('Connected to DB')
    } catch (error: any) {
        logger.error('Could not connect to DB')
        // Method used to end the process which is running
        // if param = 0 : exit without failure
        // if param = 1 : exit with failure 
        process.exit(1);
    }
}