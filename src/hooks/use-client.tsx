import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface User {
  session: {
    access_token: string;
  } | null;
}

interface ClientContextType {
  user: User;
  setExternalJwt: (jwt: string) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    const savedJwt = localStorage.getItem("magemetrics_jwt");
    return { session: savedJwt ? { access_token: savedJwt } : null };
  });

  const setExternalJwt = (jwt: string) => {
    setUser({
      session: {
        access_token: jwt,
      },
    });
  };

  return (
    <ClientContext.Provider value={{ user, setExternalJwt }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};
