import config from 'config';
import dotenv from 'dotenv'

dotenv.config();

export default {

NODE_ENV: process.env.NODE_ENV!,

dbURL: process.env.DATABASEURL!,

privateKey: process.env.PRIVATEKEY!,

publicKey: process.env.PUBLICKEY!,

expireAccessToken: process.env.EXPIREACCESSTOKEN!,
expireVerifyToken: process.env.EXPIREVERIFYTOKEN!,

saltWorkFactor: process.env.SALTWORKFACTOR!,
}
