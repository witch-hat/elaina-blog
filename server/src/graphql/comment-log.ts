import { gql } from 'apollo-server';
import { Date } from 'mongoose';

import { CommentEvent, CommentLog, CommentLogModel } from '../model/comment-log';
import { ContextType } from '../types/context';

export const commentLogTypeDef = gql`
  type CommentLog {
    _id: Int
    time: DateTime
    event: Int
    categoryId: Int
    postId: Int
    commentIndex: Int
    replyIndex: Int
  }

  extend type Query {
    commentLogs: [CommentLog]
  }

  extend type Mutation {
    pushCommentLog(time: DateTime!, event: Int!, categoryId: Int!, postId: Int!, commentIndex: Int!, replyIndex: Int): Void
    deleteCommentLog(postId: Int!, commentIndex: Int!, replyIndex: Int): MutationResponse
    deletePostAllCommentLog(postId: Int!): Void
  }
`;

export const commentLogResolver = {
  Query: {
    async commentLogs() {
      try {
        const logList: CommentLog[] = await CommentLogModel.find();
        return logList;
      } catch (err) {
        throw err;
      }
    }
  },

  Mutation: {
    async pushCommentLog(
      _: any,
      args: {
        time: Date;
        event: CommentEvent;
        categoryId: number;
        postId: number;
        commentIndex: number;
        replyIndex?: number;
      },
      context: ContextType
    ) {
      try {
        const lastLog: CommentLog | null = await CommentLogModel.findOne({}, {}, { sort: { _id: -1 } });

        await CommentLogModel.create({
          _id: lastLog ? lastLog._id + 1 : 1,
          time: args.time,
          commentEvent: args.event,
          categoryId: args.categoryId,
          postId: args.postId,
          commentIndex: args.commentIndex ? args.commentIndex : null,
          replyIndex: args.replyIndex ? args.replyIndex : null
        });

        return;
      } catch (err) {
        throw err;
      }
    },

    async deleteCommentLog(
      _: any,
      args: { categoryId: number; postId: number; commentIndex: number; replyIndex?: number },
      context: ContextType
    ) {
      try {
        const foundLog: CommentLog | null = await CommentLogModel.findOne({
          postId: args.postId,
          commentIndex: args.commentIndex,
          replyIndex: args.replyIndex ? args.replyIndex : null
        });

        if (foundLog) {
          await CommentLogModel.deleteOne({ _id: foundLog._id });

          if (foundLog.commentEvent === 0) {
            await CommentLogModel.deleteMany({ postId: foundLog.postId, commentIndex: foundLog.commentIndex });
          }
        } else {
          return { isSuccess: false };
        }

        return { isSuccess: true };
      } catch (err) {
        throw err;
      }
    },

    async deletePostAllCommentLog(_: any, args: { postId: number }, context: ContextType) {
      try {
        await CommentLogModel.deleteMany({ postId: args.postId });
        return;
      } catch (err) {
        throw err;
      }
    }
  }
};
