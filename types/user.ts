export interface User {
  _id: string;
  userId: string;
  email: string;
  name: string;
  profilePhoto?: string;
  userType: string;
  bookmarks: any[];
  notifications: any[];
}

export interface GetCurrentUserResponse {
  statusCode: number;
  message: string;
  data: User;
  success: boolean;
}

export interface GetUserDetailsResponse {
  statusCode: number;
  message: string;
  data: User & {
    provider?: string;
    following?: any[];
    followers?: any[];
    subscribers?: any[];
    posts?: string[];
    interests?: any[];
    role?: string;
    profilePhotoPublic_id?: string;
  };
  success: boolean;
}
