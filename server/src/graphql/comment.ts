import { gql } from 'apollo-server';
import { CommentModel } from '../model/comment';
import { ContextType } from '../types/context';

export const commentTypeDef = gql`
  type Reply {
    username: String
    password: String
    createdAt: DateTime
    comment: String
  }

  type Comment {
    username: String
    password: String
    createdAt: DateTime
    comment: String
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
    writeComment(_id: Int!, username: String!, password: String!, comment: String!, createdAt: DateTime!): MutationResponse
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
      args: { _id: number; username: string; password: string; comment: string; createdAt: Date },
      context: ContextType
    ) {
      try {
        const existComments = await CommentModel.findById(args._id);
        const newComment = {
          username: args.username,
          password: args.password,
          comment: args.comment,
          createdAt: args.createdAt,
          replies: []
        };

        existComments.comments.push(newComment);
        existComments.count += 1;

        existComments.save();

        return { isSuccess: true };
      } catch (err) {
        throw { isSuccess: false, errorMsg: 'Cannor write comment; Server Error' };
      }
    }
  }
};
