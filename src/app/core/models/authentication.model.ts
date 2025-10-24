export interface LoginPayloadModel {
  email: string;
  password: string;
}
export interface RegisterPayloadModel {
  username: string;
  email: string;
  password: string;
}

export interface UserReponseModel {
  user: UserModel;
}

export interface UserModel {
  email: string;
  token: string;
  username: string;
  bio: string;
  image?: any;
}
