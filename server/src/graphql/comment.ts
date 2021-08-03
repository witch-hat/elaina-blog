import { ApolloError, AuthenticationError, gql, UserInputError } from 'apollo-server';

import { CommentModel, CommentConatiner, Comment, Reply } from '../model/comment';
import { PostModel, Post } from '../model/post';
import { ContextType } from '../types/context';
import { comparePassword } from '../util/auth';

export const commentTypeDef = gql`
  type Reply {
    _id: ID!
    createdAt: DateTime!
    comment: String!
    isAdmin: Boolean!
    username: String
    password: String
    isEdited: Boolean
  }

  type Comment {
    _id: ID!
    createdAt: DateTime!
    comment: String!
    isAdmin: Boolean!
    replies: [Reply]!
    username: String
    password: String
    isEdited: Boolean
  }

  type CommentContainer {
    _id: Int
    count: Int!
    comments: [Comment]
  }

  extend type Query {
    comments(pid: Int!): CommentContainer
  }

  extend type Mutation {
    writeComment(pid: Int!, comment: String!, createdAt: DateTime!, isAdmin: Boolean!, username: String, password: String): CommentContainer
    editComment(pid: Int!, commentId: String!, newComment: String!, password: String): MutationResponse
    deleteComment(pid: Int!, commentId: String!, password: String): MutationResponse
    writeReply(
      pid: Int!
      commentId: String!
      comment: String!
      createdAt: DateTime!
      isAdmin: Boolean!
      username: String
      password: String
    ): Comment
    editReply(pid: Int!, commentId: String!, replyId: String!, newReply: String!, password: String): MutationResponse
    deleteReply(pid: Int!, commentId: String!, replyId: String!, password: String): MutationResponse
  }
`;

export const commentResolver = {
  Query: {
    async comments(_: any, args: { pid: number }) {
      try {
        const comment = await CommentModel.findById(args.pid);
        return comment;
      } catch (err) {
        throw err;
      }
    }
  },

  Mutation: {
    async writeComment(
      _: any,
      args: { pid: number; comment: string; createdAt: Date; isAdmin: boolean; username?: string; password?: string }
    ) {
      const passwordRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})');

      try {
        if (!args.comment) {
          throw new UserInputError('내용을 입력해 주세요.');
        }

        const comments = await CommentModel.findById(args.pid);

        if (comments) {
          let newComment: Comment;

          if (args.isAdmin) {
            newComment = {
              createdAt: args.createdAt,
              comment: args.comment,
              isAdmin: args.isAdmin,
              replies: [],
              isEdited: false
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
              password: args.password,
              isEdited: false
            };
          }

          comments.comments.push(newComment);
          comments.count += 1;

          const post = await PostModel.findByIdAndUpdate(args.pid, { commentCount: comments.count });

          if (post === null) {
            throw new ApolloError('Cannot write comment.. please retry!');
          }

          await comments.save();
          return comments;
        }

        throw new ApolloError('Cannot write comment.. please retry!');
      } catch (err) {
        throw err;
      }
    },

    async editComment(_: any, args: { pid: number; commentId: string; newComment: string; password?: string }) {
      try {
        if (!args.newComment.length) {
          throw new UserInputError('내용을 입력해 주세요.');
        }

        if (args.password) {
          if (args.password.length < 8 || args.password.length > 20) {
            throw new UserInputError('password: 8~20자 이내로 입력해주세요');
          }
        }

        const commentContainer = await CommentModel.findById(args.pid);

        if (commentContainer) {
          const findedComment = commentContainer.comments.find((comment) => comment._id?.toString() === args.commentId);

          if (findedComment === undefined) {
            throw new ApolloError('존재하지 않는 댓글입니다.');
          }

          if (args.password) {
            const hash = findedComment.password;
            const isMatch = await comparePassword(args.password, hash || '');

            if (!isMatch) throw new AuthenticationError('비밀번호가 맞지 않습니다.');
          }

          findedComment.comment = args.newComment;
          findedComment.isEdited = true;
          await commentContainer.save();

          return { isSuccess: true };
        }

        return { isSuccess: false };
      } catch (err) {
        throw err;
      }
    },

    async deleteComment(_: any, args: { pid: number; commentId: string; password?: string }) {
      try {
        const commentContainer = await CommentModel.findById(args.pid);

        if (commentContainer) {
          let findedCommentIndex: number = -1;
          const findedComment = commentContainer.comments.find((comment, index) => {
            if (comment._id?.toString() === args.commentId) {
              findedCommentIndex = index;
              return true;
            }
          });

          if (findedComment === undefined) {
            throw new ApolloError('존재하지 않는 댓글입니다.');
          }

          if (args.password) {
            if (args.password.length > 20 || args.password.length < 8) {
              throw new UserInputError('비밀번호 8~20자 이내로 입력해주세요.');
            }

            const hash = findedComment.password;
            const isMatch = await comparePassword(args.password, hash || '');

            if (!isMatch) throw new AuthenticationError('비밀번호가 맞지 않습니다.');
          }

          const decreaseCount = findedComment.replies.length + 1;
          commentContainer.comments.splice(findedCommentIndex, 1);
          commentContainer.count -= decreaseCount;

          const post = await PostModel.findByIdAndUpdate(args.pid, { commentCount: commentContainer.count });

          if (post) {
            await commentContainer.save();
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
      args: { pid: number; commentId: string; comment: string; createdAt: Date; isAdmin: boolean; username?: string; password?: string }
    ) {
      const passwordRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})');

      try {
        const commentContainer = await CommentModel.findById(args.pid);

        if (commentContainer) {
          const findedComment = commentContainer.comments.find((comment) => comment._id?.toString() === args.commentId);

          if (findedComment === undefined) {
            throw new ApolloError('존재하지 않는 댓글입니다.');
          }

          let newReply: Reply;

          if (args.isAdmin) {
            newReply = {
              comment: args.comment,
              createdAt: args.createdAt,
              isAdmin: args.isAdmin,
              isEdited: false
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
              isAdmin: args.isAdmin,
              isEdited: false
            };
          }

          // how can detect comment is deleted?...
          findedComment.replies.push(newReply);
          commentContainer.count += 1;

          const post = await PostModel.findByIdAndUpdate(args.pid, { commentCount: commentContainer.count });

          if (post) {
            await commentContainer.save();
          } else {
            throw new ApolloError('Cannot write reply.. please retry!');
          }

          return findedComment;
        }

        throw new ApolloError('Cannot write reply.. please retry!');
      } catch (err) {
        throw err;
      }
    },

    async editReply(_: any, args: { pid: number; commentId: string; replyId: string; newReply: string; password?: string }) {
      try {
        if (!args.newReply.length) {
          throw new UserInputError('내용을 입력해 주세요.');
        }

        if (args.password) {
          if (args.password.length < 8 || args.password.length > 20) {
            throw new UserInputError('password: 8~20자 이내로 입력해주세요');
          }
        }

        const commentContainer = await CommentModel.findById(args.pid);

        if (commentContainer) {
          const findedComment = commentContainer.comments.find((comment) => comment._id?.toString() === args.commentId);

          if (findedComment === undefined) {
            throw new ApolloError('존재하지 않는 댓글입니다.');
          }

          const findedReply = findedComment.replies.find((reply) => reply._id?.toString() === args.replyId);

          if (findedReply === undefined) {
            throw new ApolloError('존재하지 않는 대댓글입니다.');
          }

          if (args.password) {
            const hash = findedReply.password;
            const isMatch = await comparePassword(args.password, hash || '');

            if (!isMatch) throw new AuthenticationError('비밀번호가 맞지 않습니다.');
          }

          findedReply.comment = args.newReply;
          findedReply.isEdited = true;
          await commentContainer.save();

          return { isSuccess: true };
        }

        return { isSuccess: false };
      } catch (err) {
        throw err;
      }
    },

    async deleteReply(_: any, args: { pid: number; commentId: string; replyId: string; password?: string }) {
      try {
        const commentContainer = await CommentModel.findById(args.pid);

        if (commentContainer) {
          const findedComment = commentContainer.comments.find((comment) => comment._id?.toString() === args.commentId);

          if (findedComment === undefined) {
            throw new ApolloError('존재하지 않는 댓글입니다.');
          }

          let findedReplyIndex = -1;
          const findedReply = findedComment.replies.find((reply, index) => {
            if (reply._id?.toString() === args.replyId) {
              findedReplyIndex = index;
              return true;
            }
          });

          if (findedReply === undefined) {
            throw new ApolloError('존재하지 않는 대댓글입니다.');
          }

          if (args.password) {
            const hash = findedReply.password;
            const isMatch = await comparePassword(args.password, hash || '');

            if (!isMatch) throw new AuthenticationError('비밀번호가 맞지 않습니다.');
          }

          findedComment.replies.splice(findedReplyIndex, 1);
          commentContainer.count -= 1;

          const post = await PostModel.findByIdAndUpdate(args.pid, { commentCount: commentContainer.count });

          if (post) {
            await commentContainer.save();
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
