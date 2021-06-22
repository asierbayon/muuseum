export type UserLogin = {
  email: string;
  password: string;
  remember?: boolean; // TODO
  onSubmit?: string;
};

export type UserRegister = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

export type UserSettings = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  website: string | null;
  ethAddress: string | null;
  bio: string | null;
  avatar: File | null;
}

export type UserChangePassword = {
  password: string;
  passwordMatch: string;
}

export type FetchedUser = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  website: string | null;
  ethAddress: string | null;
  bio: string | null;
  avatar: string;
  coverImage: string;
  followersCount: number;
  followingCount: number;
  id: string;
}

export type FetchedFollower = {
  amIFollowing: boolean | undefined;
  user: ListedUser;
}

export type ListedUser = {
  fullName: string;
  username: string;
  avatar: string;
  id: string;
  amIFollowing?: boolean;
}