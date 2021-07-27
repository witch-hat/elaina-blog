import { ApolloError, AuthenticationError, gql, UserInputError } from 'apollo-server';

import { CommentModel, CommentConatiner, Comment, Reply } from '../model/comment';
import { PostModel, Post } from '../model/post';
import { ContextType } from '../types/context';
import { comparePassword } from '../util/auth';

export const commentTypeDef = gql`
  type Reply {
    createdAt: DateTime!
    comment: String!
    isAdmin: Boolean!
    username: String
    password: String
  }

  type Comment {
    createdAt: DateTime!
    comment: String!
    isAdmin: Boolean!
    replies: [Reply]!
    username: String
    password: String
  }

  type CommentConatiner {
    _id: Int
    count: Int!
    comments: [Comment]
  }

  extend type Query {
    comments(_id: Int!): CommentConatiner
  }

  extend type Mutation {
    writeComment(_id: Int!, comment: String!, createdAt: DateTime!, isAdmin: Boolean!, username: String, password: String): Comment
    editComment(_id: Int!, index: Int!, newComment: String!, password: String): MutationResponse
    deleteComment(_id: Int!, index: Int!, password: String): MutationResponse
    writeReply(
      _id: Int!
      commentIndex: Int!
      comment: String!
      createdAt: DateTime!
      isAdmin: Boolean!
      username: String
      password: String
    ): Reply
    editReply(_id: Int!, commentIndex: Int!, replyIndex: Int!, newReply: String!, password: String): MutationResponse
    deleteReply(_id: Int!, commentIndex: Int!, replyIndex: Int!, password: String): MutationResponse
  }
`;

export const commentResolver = {
  Query: {
    async comments(_: any, args: { _id: number }) {
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
      args: { _id: number; comment: string; createdAt: Date; isAdmin: boolean; username?: string; password?: string }
    ) {
      const passwordRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})');

      try {
        if (!args.comment) {
          throw new UserInputError('내용을 입력해 주세요.');
        }

        const comments = await CommentModel.findById(args._id);

        if (comments) {
          let newComment: Comment;

          if (args.isAdmin) {
            newComment = {
              createdAt: args.createdAt,
              comment: args.comment,
              isAdmin: args.isAdmin,
              replies: []
            };
          } else {
            if (!args.username || !args.password) {
              throw new UserInputError('username: 2~10 자 이내, password: 8~20자 이내로 입력해주세요');
            }

            if (args.password.length < 8 || args.password.length > 20 || args.username.length < 2 || args.username.length > 10) {
              throw new UserInputError('username: 2~10 자 이내, password: 8~20자 이내로 입력해주세요');
            }

            if (args.password.match(passwordRegex) === null) {
              throw new UserInputError('비밀번호: 영문자, 숫자, 특수문자 조합');
            }

            newComment = {
              createdAt: args.createdAt,
              comment: args.comment,
              isAdmin: args.isAdmin,
              replies: [],
              username: args.username,
              password: args.password
            };
          }

          comments.comments.push(newComment);
          comments.count += 1;

          const post = await PostModel.findByIdAndUpdate(args._id, { commentCount: comments.count });

          if (post === null) {
            throw new ApolloError('Cannot write comment.. please retry!');
          }

          await comments.save();
          return newComment;
        }

        throw new ApolloError('Cannot write comment.. please retry!');
      } catch (err) {
        throw err;
      }
    },

    async editComment(_: any, args: { _id: number; index: number; newComment: string; password?: string }) {
      try {
        if (!args.newComment.length) {
          throw new UserInputError('내용을 입력해 주세요.');
        }

        if (args.password) {
          if (args.password.length < 8 || args.password.length > 20) {
            throw new UserInputError('password: 8~20자 이내로 입력해주세요');
          }
        }

        const comments = await CommentModel.findById(args._id);

        if (comments) {
          if (args.password) {
            const hash = comments.comments[args.index].password;
            const isMatch = await comparePassword(args.password, hash || '');

            if (!isMatch) throw new AuthenticationError('비밀번호가 맞지 않습니다.');
          }

          comments.comments[args.index].comment = args.newComment;
          await comments.save();

          return { isSuccess: true };
        }

        return { isSuccess: false };
      } catch (err) {
        throw err;
      }
    },

    async deleteComment(_: any, args: { _id: number; index: number; password?: string }) {
      try {
        const comments = await CommentModel.findById(args._id);

        if (comments) {
          if (args.password) {
            if (args.password.length > 20 || args.password.length < 8) {
              throw new UserInputError('비밀번호 8~20자 이내로 입력해주세요.');
            }

            const hash = comments.comments[args.index].password;
            const isMatch = await comparePassword(args.password, hash || '');

            if (!isMatch) throw new AuthenticationError('비밀번호가 맞지 않습니다.');
          }

          const decreaseCount = comments.comments[args.index].replies.length + 1;
          comments.comments.splice(args.index, 1);
          comments.count -= decreaseCount;

          const post = await PostModel.findByIdAndUpdate(args._id, { commentCount: comments.count });

          if (post) {
            await comments.save();
          } else {
            return { isSuccess: false };
          }

          return { isSuccess: true };
        }

        return { isSuccess: false };
      } catch (err) {
        throw err;
      }
    },

    async writeReply(
      _: any,
      args: { _id: number; commentIndex: number; comment: string; createdAt: Date; isAdmin: boolean; username?: string; password?: string }
    ) {
      const passwordRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})');

      try {
        const comments = await CommentModel.findById(args._id);

        if (comments) {
          let newReply: Reply;

          if (args.isAdmin) {
            newReply = {
              comment: args.comment,
              createdAt: args.createdAt,
              isAdmin: args.isAdmin
            };
          } else {
            if (!args.username || !args.password) {
              throw new UserInputError('username: 2~10 자 이내, password: 8~20자 이내로 입력해주세요');
            }

            if (args.password.length < 8 || args.password.length > 20 || args.username.length < 2 || args.username.length > 10) {
              throw new UserInputError('username: 2~10 자 이내, password: 8~20자 이내로 입력해주세요');
            }

            if (args.password.match(passwordRegex) === null) {
              throw new UserInputError('비밀번호: 영문자, 숫자, 특수문자 조합');
            }

            newReply = {
              username: args.username,
              password: args.password,
              comment: args.comment,
              createdAt: args.createdAt,
              isAdmin: args.isAdmin
            };
          }

          // how can detect comment is deleted?...
          comments.comments[args.commentIndex].replies.push(newReply);
          comments.count += 1;

          const post = await PostModel.findByIdAndUpdate(args._id, { commentCount: comments.count });

          if (post) {
            await comments.save();
          } else {
            throw new ApolloError('Cannot write reply.. please retry!');
          }

          return newReply;
        }

        throw new ApolloError('Cannot write reply.. please retry!');
      } catch (err) {
        throw err;
      }
    },

    async editReply(_: any, args: { _id: number; commentIndex: number; replyIndex: number; newReply: string; password?: string }) {
      try {
        if (!args.newReply.length) {
          throw new UserInputError('내용을 입력해 주세요.');
        }

        if (args.password) {
          if (args.password.length < 8 || args.password.length > 20) {
            throw new UserInputError('password: 8~20자 이내로 입력해주세요');
          }
        }

        const comments = await CommentModel.findById(args._id);

        if (comments) {
          if (args.password) {
            const hash = comments.comments[args.commentIndex].password;
            const isMatch = await comparePassword(args.password, hash || '');

            if (!isMatch) throw new AuthenticationError('비밀번호가 맞지 않습니다.');
          }

          comments.comments[args.commentIndex].replies[args.replyIndex].comment = args.newReply;
          await comments.save();

          return { isSuccess: true };
        }

        return { isSuccess: false };
      } catch (err) {
        throw err;
      }
    },

    async deleteReply(_: any, args: { _id: number; commentIndex: number; replyIndex: number; password?: string }) {
      try {
        const comments = await CommentModel.findById(args._id);

        if (comments) {
          if (args.password) {
            const hash = comments.comments[args.commentIndex].replies[args.replyIndex].password;
            const isMatch = await comparePassword(args.password, hash || '');

            if (!isMatch) throw new AuthenticationError('비밀번호가 맞지 않습니다.');
          }

          comments.comments[args.commentIndex].replies.splice(args.replyIndex, 1);
          comments.count -= 1;

          const post = await PostModel.findByIdAndUpdate(args._id, { commentCount: comments.count });

          if (post) {
            await comments.save();
          } else {
            return { isSuccess: false };
          }

          return { isSuccess: true };
        }

        return { isSuccess: false };
      } catch (err) {
        throw err;
      }
    }
  }
};
