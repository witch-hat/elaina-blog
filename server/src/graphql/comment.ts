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
    async comment() {
      try {
        const comment = await Comment.find();
        return comment;
      } catch (err) {
        throw err;
      }
    }
  }
};
