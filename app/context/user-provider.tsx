import { createContext, useContext } from "react";
import { SessionData } from "~/services/session";

type UserWithPermissions = SessionData & {
    permissions: string[]
}

type ContextType = {
    children: React.ReactNode
    data: UserWithPermissions,
};

const Context = createContext<ContextType | undefined>(undefined);
const UserProvider = ({ children, data }: any) => {
    return (
        <Context.Provider
            value={data}
        >
            {children}
        </Context.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useStore must be used within StoreContext');
    }

    return context;
};

export default UserProvider;
