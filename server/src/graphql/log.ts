import { ApolloError, gql } from 'apollo-server';
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
    pushLog(time: DateTime!, event: Int!, categoryId: Int!, postId: Int, commentIndex: Int, replyIndex: Int): Void
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
    async pushLog(
      _: any,
      args: {
        time: Date;
        event: Event;
        categoryId: number;
        postId?: number;
        commentIndex?: number;
        replyIndex?: number;
      },
      context: ContextType
    ) {
      try {
        const lastId: number = await LogModel.find({}, {}, { sort: { _id: -1 } });

        await LogModel.create({
          _id: lastId + 1,
          time: args.time,
          event: args.event,
          categoryId: args.categoryId,
          postId: args.postId ? args.postId : null,
          commentIndex: args.commentIndex ? args.commentIndex : null,
          replyIndex: args.replyIndex ? args.replyIndex : null
        });

        return;
      } catch (err) {
        throw err;
      }
    },
    async deleteLog(_: any, args: { _id: number }, context: ContextType) {
      try {
        const deletedLog: Log = await LogModel.deleteOne({ _id: args._id });

        switch (deletedLog.event) {
          case Event.newCategory:
            await LogModel.deleteMany({ categoryId: deletedLog.categoryId });
            break;
          case Event.newPost:
            await LogModel.deleteMany({ postId: deletedLog.postId });
            break;
          case Event.newComment:
            await LogModel.deleteMany({ postId: deletedLog.postId, commentIndex: deletedLog.commentIndex });
            break;
          case Event.newReply:
            await LogModel.deleteMany({
              postId: deletedLog.postId,
              commentIndex: deletedLog.commentIndex,
              replyIndex: deletedLog.replyIndex
            });
            break;
          case Event.movePost:
            await LogModel.deleteMany({ postId: deletedLog.postId });
            break;
          default:
            throw new ApolloError('Invalid Log Event');
        }

        return;
      } catch (err) {
        throw err;
      }
    }
  }
};
