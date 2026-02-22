
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

export interface PostComment {
  content: string;
  createdBy: string;
  likes: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostDetailsContent {
  _id: string;
  author: string;
  title: string;
  discription: string; // Note: retaining 'discription' as it comes from API
  coverImage: string;
  coverImagePublicId?: string;
  tags?: string[];
  likes: string[];
  reads: number;
  comments: PostComment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetPostDetailsResponse {
  likesCount: number;
  author: AuthorDetails & { createdAt?: string };
  postContent: PostDetailsContent;
}

export interface DetailedCommentData {
  content: string;
  createdBy: string;
  likes: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  author_id: string;
  authorName: string;
  authorUserId: string;
  authorProfilePhoto: string;
}

export interface DetailedComment {
  _id: string;
  comments: DetailedCommentData;
}

export interface GetPostCommentsResponse {
  msg: string;
  comments: DetailedComment[];
}

export interface AddCommentResponse {
  msg: string;
  author: AuthorDetails;
  comment: PostComment;
}

export interface LikePostResponse {
  likesCount: number;
  msg: string;
}

export interface SearchPostsResponse {
  message: string;
  posts: Post[];
}

export interface BookmarkPostElement {
  _id: string;
  userId: string;
  name: string;
  profilePhoto: string;
  bookmarkPost: PostDetailsContent;
  likesCount: number;
  commentsCount: number;
}

export interface GetBookmarksResponse {
  statusCode: number;
  message: string;
  data: {
    bookmarkPosts: BookmarkPostElement[];
  };
  success: boolean;
}
