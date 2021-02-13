import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from './config';
import { UserModel } from '../model/user';

export function encryptPassword(password: string) {
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err: Error, salt: string) => {
      if (err) {
        reject(err);
        return false;
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(hash);
        return true;
      });
    });
  });
}

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

export function getToken(payload: UserModel) {
  const token = jwt.sign(payload.toJSON(), config.secret, {
    expiresIn: '1h'
  });
  console.log(token);
  return token;
}

export function verifyToken(token?: string) {
  if (!token) return { login: false };
  try {
    const payload = jwt.verify(token, config.secret);
    return { login: true, payload };
  } catch (err) {
    return { login: false };
  }
}
