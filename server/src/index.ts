import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Cookies from 'cookies';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

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

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    return { req, res };
  },
  uploads: false
});

server.applyMiddleware({ app, path: '/graphql', cors: false });
app.listen({ port: 4000 }, () => {
  console.log(`http://localhost:4000`);
});
