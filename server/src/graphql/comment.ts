import { ApolloError, AuthenticationError, gql, UserInputError } from 'apollo-server';

import { CommentModel, Comments, Comment, Reply } from '../model/comment';
import { ContextType } from '../types/context';
import { comparePassword } from '../util/auth';

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
    writeComment(_id: Int!, username: String, password: String, comment: String!, createdAt: DateTime!, isAdmin: Boolean!): Void
    editComment(_id: Int!, index: Int!, newComment: String!, password: String): Void
    deleteComment(_id: Int!, index: Int!, password: String): Void
    writeReply(
      _id: Int!
      commentIndex: Int!
      username: String
      password: String
      comment: String!
      createdAt: DateTime!
      isAdmin: Boolean!
    ): Void
    editReply(_id: Int!, commentIndex: Int!, replyIndex: Int!, newReply: String!, password: String): Void
    deleteReply(_id: Int!, commentIndex: Int!, replyIndex: Int!, password: String): Void
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
        if (!args.comment) {
          throw new UserInputError('내용을 입력해 주세요.');
        }
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
          if (args.password.length < 4 || args.password.length > 12 || args.username.length < 2 || args.username.length > 10) {
            throw new UserInputError('username: 2~10 자 이내, password: 4~12자 이내로 입력해주세요');
          }

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

        return null;
      } catch (err) {
        throw err;
      }
    },

    async editComment(_: any, args: { _id: number; index: number; newComment: string; password?: string }, context: ContextType) {
      try {
        if (!args.newComment.length) {
          throw new UserInputError('내용을 입력해 주세요.');
        }

        if (args.password) {
          if (args.password.length < 4 || args.password.length > 12) {
            throw new UserInputError('password: 4~12자 이내로 입력해주세요');
          }
        }

        const commentContainer: Comments = await CommentModel.findById(args._id);

        if (args.password) {
          const hash = commentContainer.comments[args.index].password;
          const isMatch = await comparePassword(args.password, hash || '');

          if (!isMatch) throw new AuthenticationError('비밀번호가 맞지 않습니다.');
        }

        commentContainer.comments[args.index].comment = args.newComment;
        commentContainer.save();

        return null;
      } catch (err) {
        throw err;
      }
    },

    async deleteComment(_: any, args: { _id: number; index: number; password?: string }, context: ContextType) {
      try {
        const commentContainer: Comments = await CommentModel.findById(args._id);

        if (args.password) {
          const hash = commentContainer.comments[args.index].password;
          const isMatch = await comparePassword(args.password, hash || '');

          if (!isMatch) throw new AuthenticationError('비밀번호가 맞지 않습니다.');
        }

        const decreaseCount = commentContainer.comments[args.index].replies.length + 1;
        commentContainer.comments.splice(args.index, 1);

        commentContainer.count -= decreaseCount;

        commentContainer.save();

        return null;
      } catch (err) {
        throw err;
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
          if (args.password.length < 4 || args.password.length > 12 || args.username.length < 2 || args.username.length > 10) {
            throw new UserInputError('username: 2~10 자 이내, password: 4~12자 이내로 입력해주세요');
          }

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

        return null;
      } catch (err) {
        throw err;
      }
    },

    async editReply(
      _: any,
      args: { _id: number; commentIndex: number; replyIndex: number; newReply: string; password?: string },
      context: ContextType
    ) {
      try {
        if (!args.newReply.length) {
          throw new UserInputError('내용을 입력해 주세요.');
        }

        if (args.password) {
          if (args.password.length < 4 || args.password.length > 12) {
            throw new UserInputError('password: 4~12자 이내로 입력해주세요');
          }
        }

        const commentContainer: Comments = await CommentModel.findById(args._id);

        if (args.password) {
          const hash = commentContainer.comments[args.commentIndex].password;
          const isMatch = await comparePassword(args.password, hash || '');

          if (!isMatch) throw new AuthenticationError('비밀번호가 맞지 않습니다.');
        }

        commentContainer.comments[args.commentIndex].replies[args.replyIndex].comment = args.newReply;
        commentContainer.save();

        return null;
      } catch (err) {
        throw err;
      }
    },

    async deleteReply(_: any, args: { _id: number; commentIndex: number; replyIndex: number; password?: string }, context: ContextType) {
      try {
        const commentContainer: Comments = await CommentModel.findById(args._id);

        if (args.password) {
          const hash = commentContainer.comments[args.commentIndex].replies[args.replyIndex].password;
          const isMatch = await comparePassword(args.password, hash || '');

          if (!isMatch) throw new AuthenticationError('비밀번호가 맞지 않습니다.');
        }

        commentContainer.comments[args.commentIndex].replies.splice(args.replyIndex, 1);
        commentContainer.count -= 1;

        commentContainer.save();

        return null;
      } catch (err) {
        throw err;
      }
    }
  }
};
