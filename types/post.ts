
export interface AuthorDetails {
  _id: string;
  userId: string;
  name: string;
  profilePhoto: string;
}

export interface Post {
  _id: string;
  title: string;
  coverImage: string;
  reads: number;
  createdAt: string;
  authorDetails: AuthorDetails;
  likesCount: number;
  commentsCount: number;
  isBookmarked?: boolean;
}

export interface GetUserPostsResponse {
  msg: string;
  posts: Post[];
}

export interface GetPostsResponse {
  msg: string;
  posts: Post[];
}
