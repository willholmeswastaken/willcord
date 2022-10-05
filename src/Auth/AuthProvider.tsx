import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import supabaseClient from "../supabaseClient";

export const AuthContext = createContext<User | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState(() => supabaseClient.auth.user());

    useEffect(() => {
        const authStateChangeSubscription = supabaseClient.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            authStateChangeSubscription.data?.unsubscribe();
        }
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default AuthProvider;