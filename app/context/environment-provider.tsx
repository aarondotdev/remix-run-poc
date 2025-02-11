import { createContext, useContext } from "react";

interface IEnv {
    API_BASE_URL: string,
    
}

interface ContextType extends IEnv {
    children: React.ReactNode
};

const Context = createContext<ContextType | undefined>(undefined);
const EnvironmentProvider = ({ children, data }: any) => {
    return (
        <Context.Provider
            value={{ ...data }}
        >
            {children}
        </Context.Provider>
    );
};

export const useEnvironmentProvider = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useStore must be used within StoreContext');
    }

    return context;
};

export default EnvironmentProvider;
