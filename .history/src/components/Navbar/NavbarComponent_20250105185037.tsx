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
                
            <div className="flex justify-center items-center space-x-80 mt-4 mb-40 sm:mb-20 font-navbar">
                <Navbar fluid rounded className="bg-violet-900 mb-5 relative h-12 sm:h-auto w-12 sm:w-auto">
                    <Navbar.Toggle className="absolute left-0 top-0 h-16 sm:h-auto w-16 sm:w-auto" />
                    <Navbar.Collapse>
                        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-80 mt-14 sm:mt-0">
                            <Link to="/" className="text-lg sm:text-4xl mb-2 sm:mb-0 active">Accueil</Link>
                            <Link to="/blog" className="text-lg sm:text-4xl mb-2 sm:mb-0">Blog</Link>
                            <Link to="/article" className="text-lg sm:text-4xl mb-2 sm:mb-0">Article</Link>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            : <Navigate to="/" />
            }
        </>
    )
}