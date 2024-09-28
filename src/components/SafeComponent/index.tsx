import { ReactNode } from 'react';
import {Navigate} from "react-router-dom";
import {useGetCurrentUserQuery} from "../../store/apiSlice/apiSlice";


interface ISafeComponentProps {
    children: ReactNode;
}

const SafeComponent = ({ children }: ISafeComponentProps) => {

    const token = localStorage.getItem("token");

    useGetCurrentUserQuery(undefined, {
        skip: !!token,
    });

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default SafeComponent;
