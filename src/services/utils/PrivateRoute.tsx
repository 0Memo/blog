import { Outlet, Navigate} from 'react-router-dom';

export default function PrivateRoute(){
    const auth = { token: true};

    return auth.token? <Outlet /> : <Navigate to="/" /> //? <Outlet /> est un composant qui correspond à toutes les routes excepté la page d'accueil "/"
}