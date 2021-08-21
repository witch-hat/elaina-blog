import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from './config';

export function comparePassword(password: string, hash: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await bcrypt.compare(password, hash);
      resolve(result);
      return true;
    } catch (err) {
      reject(err);
      return false;
    }
  });
}

export function getToken(payload: any, expire: number) {
  const refreshToken = jwt.sign(payload, config.secret, {
    expiresIn: expire
  });

  return refreshToken;
}

export function verifyToken(token?: string) {
  if (!token) return { login: false };
  try {
    const payload = jwt.verify(token, config.secret);

    return { login: true, payload };
  } catch (err) {
    console.log(err);
    throw err;
    // return { login: false, err };
  }
}
