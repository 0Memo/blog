import { NavLink } from 'react-router-dom';
import { Navigate} from 'react-router-dom';
import './Navbar.css';

export default function Navbar(){

    const auth = { token: true};

    return(
        <>
            {/* Conditionner l'affichage des trois liens si l'on n'est pas connecté */}
            {auth.token
            ?
                <nav>
                    <NavLink
                        to="/"
                        className={ ({ isActive }) => (isActive ? "activeLink" : undefined) }>
                        Accueil
                    </NavLink>
                    <NavLink
                        to="/blog"
                        className={ ({ isActive }) => (isActive ? "activeLink" : undefined) }>
                        Blog
                    </NavLink>
                    <NavLink
                        to="/article"
                        className={ ({ isActive }) => (isActive ? "activeLink" : undefined) }>
                        Ajouter article
                    </NavLink>
                </nav>
            : <Navigate to="/" />
            }
        </>
    )
}