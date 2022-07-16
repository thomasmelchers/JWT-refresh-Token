import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');


// sign jwt
export const signJWT = (payload: object, expiresIn: string | number) => {
    return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn })
}
// verify jwt
export const verifyJWT = (token: string) => {
  
    try {
        const decoded = jwt.verify(token, publicKey);
        return { payload: decoded, expired: false }
    } catch (e: any) {
        return { payload: null, expired: e.message.includes('jwt expired') }
    }
}