import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Cookies from 'cookies';

import { schema } from './graphql';
import { verifyToken } from './util/auth';

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

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    const cookies = new Cookies(req, res);
    const token = cookies.get('admin');
    // 나중에 resolver에서 context.user 값으로 인증 가능ㄴ
    const user = verifyToken(token);

    return { cookies, user, req };
  }
});

server.applyMiddleware({ app, path: '/graphql', cors: false });
app.listen({ port: 4000 }, () => {
  console.log(`http://localhost:4000`);
});
