"use client";
import { Navbar } from "flowbite-react";
import { Link, Navigate} from 'react-router-dom';


export default function NavbarComponent(){

    const auth = { token: true};

    return(
        <>
            {/* Conditionner l'affichage des trois liens si l'on n'est pas connecté */}
            {auth.token
            ?
                
            <div className="flex justify-center items-center space-x-80 mb-20">
                <Navbar fluid rounded>
                    <Navbar.Collapse>
                        <div className="flex justify-center items-center space-x-80">
                            <Link to="/" className="text-2xl">Accueil</Link>
                            <Link to="/blog" className="text-2xl">Blog</Link>
                            <Link to="/article" className="text-2xl">Article</Link>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            : <Navigate to="/" />
            }
        </>
    )
}