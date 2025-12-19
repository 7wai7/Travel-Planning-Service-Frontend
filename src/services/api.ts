import type { AuthData } from "../types/AuthData";
import type { UserStorage } from "../types/User";
import { delay } from "../utils/delay";
import { FieldError } from "../utils/FieldError";
import { read, write } from "../utils/storage";

const LS = {
  USERS: "demo_users",
};

export const register = async (authData: AuthData) => {
  await delay();
  const users: UserStorage[] = read(LS.USERS, []);

  const ex = users.find((u) => u.email === authData.email.toLowerCase());
  if (ex)
    throw new FieldError([{ field: "email", message: "Email already exists" }]);

  const user: UserStorage = {
    id: crypto.randomUUID(),
    ...authData,
  };

  write(LS.USERS, [...users, user]);
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};

export const login = async (authData: AuthData) => {
  await delay();
  const users: UserStorage[] = read(LS.USERS, []);

  const user = users.find((u) => u.email === authData.email.toLowerCase());
  if (!user) throw new FieldError([{ field: "email", message: "The user does not exists" }]);

  if (user.password !== authData.password) throw new FieldError([{ field: "password", message: "Invalid password" }]);

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};
