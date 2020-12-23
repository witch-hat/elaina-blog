export interface CommentData {
  name: string;
  time: string;
  comment: any;
  reply: Array<{ name: string; time: string; comment: any }>;
}

export interface PostData {
  url: string;
  title: string;
  author: string;
  time: string;
  article: any;
  comments: Array<CommentData>;
}

export interface CategoryData {
  url: string;
  name: string;
  description: string;
  previewImage: string;
  posts: Array<PostData>;
}

export interface Data {
  blogName: string;
  admin: {
    id: string;
    password: string;
  };
  profile: {
    image: string;
    name: string;
    introduce: string;
    link: string;
    company: string;
    location: string;
    email: string;
  };
  category: Array<CategoryData>;
}

const mockUpData: Data = require('./mockup.json');

export { mockUpData };
