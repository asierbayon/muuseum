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
