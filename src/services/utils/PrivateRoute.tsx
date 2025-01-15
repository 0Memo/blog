import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuth }: { isAuth: boolean }) => {
    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;