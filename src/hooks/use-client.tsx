import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
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
  const [user, setUser] = useState<User>({ session: null });

  const setExternalJwt = (jwt: string) => {
    setUser({
      session: {
        access_token: jwt,
      },
    });
  };

  // Check for JWT in localStorage on mount
  useEffect(() => {
    const savedJwt = localStorage.getItem("magemetrics_jwt");
    if (savedJwt) {
      setExternalJwt(savedJwt);
    }
  }, []);

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
