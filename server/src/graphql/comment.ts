import { gql } from 'apollo-server';
import { CommentModel, Comments, Comment, Reply } from '../model/comment';
import { ContextType } from '../types/context';
import { userResolver } from './user';

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
    deleteComment(_id: Int!, index: Int!): MutationResponse
    writeReply(
      _id: Int!
      commentIndex: Int!
      username: String
      password: String
      comment: String!
      createdAt: DateTime!
      isAdmin: Boolean!
    ): MutationResponse
    deleteReply(_id: Int!, commentIndex: Int!, replyIndex: Int!): MutationResponse
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

    async deleteComment(_: any, args: { _id: number; index: number }, context: ContextType) {
      try {
        const commentContainer: Comments = await CommentModel.findById(args._id);
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
        const nc = commentContainer.comments;
        commentContainer.comments = nc;
        commentContainer.count += 1;

        console.log(commentContainer.comments[args.commentIndex].replies);

        commentContainer.save();

        return { isSuccess: true };
      } catch {
        return { isSuccess: false, errorMsg: 'ServerError: Cannot write reply' };
      }
    },

    async deleteReply(_: any, args: { _id: number; commentIndex: number; replyIndex: number }, context: ContextType) {
      try {
        const commentContainer: Comments = await CommentModel.findById(args._id);

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
