import { gql } from 'apollo-server';
import { Date } from 'mongoose';

import { Event, Log, LogModel } from '../model/log';
import { ContextType } from '../types/context';

export const logTypeDef = gql`
  type Log {
    _id: Int!
    time: DateTime!
    event: Int!
    description: String!
    categoryId: Int!
  }

  extend type Query {
    logs: [Log]
  }

  extend type Mutation {
    pushLog(time: DateTime!, event: Int!, categoryId: Int!): Void
    deleteLog(id: Int!): Void
  }
`;

export const logResolver = {
  Query: {
    async logs() {
      try {
        const logList: Log[] = await LogModel.find();
        return logList;
      } catch (err) {
        throw err;
      }
    }
  },

  Mutation: {
    async pushLog(_: any, args: { time: Date; event: Event; categoryId: number }, context: ContextType) {
      try {
        const lastId: number = await LogModel.find({}, {}, { sort: { _id: -1 } });
        await LogModel.create({
          _id: lastId + 1,
          time: args.time,
          event: args.event,
          categoryId: args.categoryId
        });

        return;
      } catch (err) {
        throw err;
      }
    },
    async deleteLog(_: any, args: { _id: number }, context: ContextType) {
      try {
        await LogModel.deleteOne({ _id: args._id });
        return;
      } catch (err) {
        throw err;
      }
    }
  }
};
