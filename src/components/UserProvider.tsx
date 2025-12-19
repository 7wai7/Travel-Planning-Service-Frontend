import { useState, type ReactNode } from "react";
import type { User } from "../types/User";
import { UserContext } from "../contexts/userContext";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
