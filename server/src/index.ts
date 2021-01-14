import { gql, ApolloServer } from 'apollo-server';
import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import { profileTypeDef } from './graphql/schema/profile';
import { profileResolver } from './graphql/resolver/profile';

dotenv.config();

const MONGO_URL = `${process.env.DB_URL}`;
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;
console.log(db.name);

const server = new ApolloServer({ typeDefs: profileTypeDef, resolvers: profileResolver });

server.listen().then(({ url }) => {
  console.log(`Server Ready at ${url}`);
});
