import React, { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../hooks/useUser";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
