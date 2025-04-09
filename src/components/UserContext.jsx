import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [uuid, setUuid] = useState(() => localStorage.getItem("uuid") || "");
  const [displayName, setDisplayName] = useState(
    () => localStorage.getItem("displayName") || ""
  );

  useEffect(() => {
    localStorage.setItem("uuid", uuid);
  }, [uuid]);

  useEffect(() => {
    localStorage.setItem("displayName", displayName);
  }, [displayName]);

  return (
    <UserContext.Provider
      value={{ uuid, setUuid, displayName, setDisplayName }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
