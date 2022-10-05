import { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

interface AuthGateProps {
    children: ReactNode;
    required?: boolean;
}

const AuthGate = ({
    children,
    required
}: AuthGateProps) => {
    const auth = useContext(AuthContext);
    const location = useLocation();

    if (!auth && required) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    } else if (auth && !required) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>
};

export default AuthGate;
