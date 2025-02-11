import { createContext, useContext } from "react";

interface ContextType {
  locale: string;
}

const Context = createContext<ContextType | undefined>(undefined);
const RemixIntlProvider = ({ children, locale }: any) => {
  return <Context.Provider value={{ locale }}>{children}</Context.Provider>;
};

export const useIntlProvider = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useStore must be used within StoreContext");
  }

  return context;
};

export default RemixIntlProvider;
