import { gql } from 'apollo-server';
import { Comment } from '../model/comment';

export const commentTypeDef = gql`
  type Reply {
    username: String!
    password: String!
    createdAt: DateTime
  }

  type Comment {
    postId: Int!
    username: String!
    password: String!
    createdAt: DateTime
    comment: String!
    replies: [Reply]
  }
`;

export const commentResolver = {
  Query: {
    async comments() {
      try {
        const commentList = await Comment.find();
        return commentList;
      } catch (err) {
        throw err;
      }
    }
  }
};
