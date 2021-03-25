import { gql } from 'apollo-server';
import { CommentModel, Comments, Comment, Reply } from '../model/comment';
import { ContextType } from '../types/context';
import { comparePassword } from '../util/auth';
import bcrypt from 'bcrypt';
import { userResolver } from './user';

const SALT = 10;

export const commentTypeDef = gql`
  type Reply {
    username: String
    password: String
    createdAt: DateTime
    comment: String
    isAdmin: Boolean
  }

  type Comment {
    username: String
    password: String
    createdAt: DateTime
    comment: String
    isAdmin: Boolean
    replies: [Reply]
  }

  type Comments {
    _id: Int
    count: Int!
    comments: [Comment]
  }

  extend type Query {
    comments(_id: Int!): Comments
  }

  extend type Mutation {
    writeComment(_id: Int!, username: String, password: String, comment: String!, createdAt: DateTime!, isAdmin: Boolean!): MutationResponse
    deleteComment(_id: Int!, index: Int!, password: String): MutationResponse
    writeReply(
      _id: Int!
      commentIndex: Int!
      username: String
      password: String
      comment: String!
      createdAt: DateTime!
      isAdmin: Boolean!
    ): MutationResponse
    deleteReply(_id: Int!, commentIndex: Int!, replyIndex: Int!, password: String): MutationResponse
  }
`;

export const commentResolver = {
  Query: {
    async comments(_: any, args: { _id: number }, context: ContextType) {
      try {
        const comment = await CommentModel.findById(args._id);
        return comment;
      } catch (err) {
        throw err;
      }
    }
  },

  Mutation: {
    async writeComment(
      _: any,
      args: { _id: number; username: string; password: string; comment: string; createdAt: Date; isAdmin: boolean },
      context: ContextType
    ) {
      try {
        const existComments: Comments = await CommentModel.findById(args._id);

        let newComment: Comment;
        if (args.isAdmin) {
          newComment = {
            comment: args.comment,
            createdAt: args.createdAt,
            replies: [],
            isAdmin: args.isAdmin
          };
        } else {
          newComment = {
            username: args.username,
            password: args.password,
            comment: args.comment,
            createdAt: args.createdAt,
            replies: [],
            isAdmin: args.isAdmin
          };
        }

        existComments.comments.push(newComment);
        existComments.count += 1;

        existComments.save();

        return { isSuccess: true };
      } catch (err) {
        return { isSuccess: false, errorMsg: 'Cannor write comment; Server Error' };
      }
    },

    async deleteComment(_: any, args: { _id: number; index: number; password?: string }, context: ContextType) {
      try {
        const commentContainer: Comments = await CommentModel.findById(args._id);

        if (args.password) {
          const hash = commentContainer.comments[args.index].password;
          const isMatch = await comparePassword(args.password, hash || '');

          if (!isMatch) {
            return { isSuccess: false, errorMsg: 'Cannot delete: password not matched' };
          }
        }

        const decreaseCount = commentContainer.comments[args.index].replies.length + 1;
        commentContainer.comments.splice(args.index, 1);

        commentContainer.count -= decreaseCount;

        commentContainer.save();

        return { isSuccess: true };
      } catch (err) {
        return { isSuccess: false, errorMsg: 'Cannor delete comment; Server Error' };
      }
    },

    async writeReply(
      _: any,
      args: { _id: number; commentIndex: number; username: string; password: string; comment: string; createdAt: Date; isAdmin: boolean },
      context: ContextType
    ) {
      try {
        const commentContainer: Comments = await CommentModel.findById(args._id);

        let newReply: Reply;

        if (args.isAdmin) {
          newReply = {
            comment: args.comment,
            createdAt: args.createdAt,
            isAdmin: args.isAdmin
          };
        } else {
          newReply = {
            username: args.username,
            password: args.password,
            comment: args.comment,
            createdAt: args.createdAt,
            isAdmin: args.isAdmin
          };
        }

        commentContainer.comments[args.commentIndex].replies.push(newReply);
        commentContainer.count += 1;

        commentContainer.save();

        return { isSuccess: true };
      } catch {
        return { isSuccess: false, errorMsg: 'ServerError: Cannot write reply' };
      }
    },

    async deleteReply(_: any, args: { _id: number; commentIndex: number; replyIndex: number; password?: string }, context: ContextType) {
      try {
        const commentContainer: Comments = await CommentModel.findById(args._id);

        if (args.password) {
          const hash = commentContainer.comments[args.commentIndex].replies[args.replyIndex].password;
          const isMatch = await comparePassword(args.password, hash || '');

          if (!isMatch) {
            return { isSuccess: false, errorMsg: 'Cannot delete: password not matched' };
          }
        }

        commentContainer.comments[args.commentIndex].replies.splice(args.replyIndex, 1);
        commentContainer.count -= 1;

        commentContainer.save();

        return { isSuccess: true };
      } catch {
        return { isSuccess: false, errorMsg: 'Server Error: Cannot delete reply' };
      }
    }
  }
};
