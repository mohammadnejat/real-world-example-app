export interface LoginPayloadModel {
  user: LoginModel;
}

export interface LoginModel {
  email: string;
  password: string;
}
export interface RegisterPayloadModel {
  user: UserRegisterModel;
}

export interface UserRegisterModel {
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
