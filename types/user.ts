export interface SearchUser {
  _id: string;
  userId: string;
  name: string;
  profilePhoto: string;
  createdAt: string;
}

export interface SearchUsersResponse {
  users: SearchUser[];
}

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

export interface NotificationData {
  message: string;
  userId: string;
  user_id: string;
  userProfilePhoto?: string;
  post_id?: string;
  notificationType: string;
  readStatus: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationUserDetails {
  _id: string;
  userId: string;
  name: string;
  profilePhoto?: string;
}

export interface UserNotification {
  _id: string;
  userId: string;
  notifications: NotificationData;
  userDetails: NotificationUserDetails;
}

export interface GetNotificationsResponse {
  msg: string;
  notifications: UserNotification[];
}
