import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

import { schema } from './graphql';
import { verifyToken, getToken } from './util/auth';
import { graphqlUploadExpress } from 'graphql-upload';

import { User } from './model/user';

dotenv.config();

const MONGO_URL = `mongodb+srv://Elaina:AnSung99@elainatest.c88ha.mongodb.net/Test?retryWrites=true&w=majority`;
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(graphqlUploadExpress({ maxFileSize: 33554432, maxFiles: 10 }));

app.post('/refresh_token', async (req, res) => {
  if (!req.cookies) return res.send({ ok: false, accessToken: '' });
  const token = req.cookies['a_refresh'];

  if (!token) {
    return res.send({ ok: false, accessToken: '' });
  }

  let payload: any = null;

  try {
    payload = verifyToken(token);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: '' });
  }

  const me = await User.findOne({}, {}, { sort: { _id: -1 } });
  if (!me) {
    return res.send({ ok: false, accessToken: '' });
  }

  res.cookie('a_refresh', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 14
  });

  const accessToken = getToken({ userId: me.emailId }, 60 * 5);

  res.cookie('a_access', accessToken, {
    maxAge: 1000 * 60 * 5
  });

  // 5 min access token
  return res.send({ ok: true, accessToken });
});

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    const cookies = new Cookies(req, res);

    const accessTokenHeader = req.headers.authorization?.substr(7);
    const accessTokenCookie = cookies.get('a_access');

    // 나중에 resolver에서 context.user 값으로 인증 가능ㄴ
    console.log('accessTokenCookie', accessTokenCookie);
    console.log('accessTokenHeader', accessTokenHeader);
    const user = verifyToken(accessTokenCookie);
    console.log('user', user);

    return { cookies, user, req, res };
  },
  uploads: false
});

server.applyMiddleware({ app, path: '/graphql', cors: false });
app.listen({ port: 4000 }, () => {
  console.log(`http://localhost:4000`);
});
