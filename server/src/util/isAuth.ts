import Cookies from 'cookies';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getToken } from './auth';
import { config } from '../util/config';
import { User } from '../model/user';

export async function isAuth(req: express.Request, res: express.Response) {
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get('a_access');
  const refreshToken = cookies.get('a_refresh');
  const FIVE_MINUTE = 60 * 5;
  const MONTH = 1000 * 60 * 60 * 24 * 30;
  const saltRounds = 10;

  if (!accessToken || !refreshToken) {
    return res.send({ isAuth: false });
  } else {
    const me = await User.findOne({}, {}, { sort: { _id: -1 } });

    try {
      jwt.verify(accessToken, config.secret);
      return res.send({ isAuth: true });
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        try {
          const isMatch = await bcrypt.compare(me.auth.refreshToken, refreshToken);
          if (isMatch) {
            const id = uuidv4();

            me.auth.id = id;

            const payload = {
              refreshTokenId: id
            };

            const accessToken = getToken(payload, FIVE_MINUTE);
            const refreshToken = getToken(payload, MONTH);

            await bcrypt.hash(refreshToken, saltRounds).then((hashedRefreshToken) => {
              cookies.set('a_refresh', hashedRefreshToken, {
                httpOnly: false
              });
            });

            cookies.set('a_access', accessToken, {
              httpOnly: false
            });

            me.auth.refreshToken = refreshToken;
            me.save();

            return res.send({ isAuth: true });
          } else {
            cookies.set('a_refresh', '', {
              maxAge: 0,
              httpOnly: false
            });
            cookies.set('a_access', '', {
              maxAge: 0,
              httpOnly: false
            });
            return res.send({ isAuth: false });
          }
        } catch (err) {
          cookies.set('a_refresh', '', {
            maxAge: 0,
            httpOnly: false
          });
          cookies.set('a_access', '', {
            maxAge: 0,
            httpOnly: false
          });
          return res.send({ isAuth: false });
        }
      } else {
        cookies.set('a_refresh', '', {
          maxAge: 0,
          httpOnly: false
        });
        cookies.set('a_access', '', {
          maxAge: 0,
          httpOnly: false
        });
        // malformed error is prior than expired error
        return res.send({ isAuth: false });
      }
    }
  }
}
