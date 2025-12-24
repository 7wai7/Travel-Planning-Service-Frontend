export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
} & LoginRequest;

export type User = {
  id: string;
  username: string;
  email: string;
};