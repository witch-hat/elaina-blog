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

  type Comment {
    _id: Int!
    count: Int!
    comments: [Comment]
  }

  extend type Query {
    comments(_id: Int!): Comment
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
  }
};
