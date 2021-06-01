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
