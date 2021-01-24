import { gql, ApolloServer, ApolloError } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { schema } from './graphql';

dotenv.config();

const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@elainatest.c88ha.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
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

const db = mongoose.connection;

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`Server Ready at ${url}`);
});
