import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    isAuth: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuth }) => {
    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;