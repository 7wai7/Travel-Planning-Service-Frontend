export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserStorage = {
  password: string;
} & User;
