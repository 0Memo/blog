/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Navbar } from "flowbite-react";
import { Link, /* Navigate */} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import ReactCountryFlag from 'react-country-flag';
import { useEffect, useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import {  auth } from '../../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

interface NavbarComponentProps {
    currentPath: string; // Define the prop type
}

export default function NavbarComponent({ currentPath }: NavbarComponentProps) {
    const [ isAuth, setIsAuth ] = useState(false);
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const languages = [
        { code: "US", label: "English", lng: "en" },
        { code: "ES", label: "Español", lng: "es" },
        { code: "FR", label: "Français", lng: "fr" },
        { code: "BR", label: "Português", lng: "pt" },
        { code: "IT", label: "Italiano", lng: "it" },
        { code: "AM", label: "Հայերեն", lng: "hy" },
        { code: "SE", label: "Svenska", lng: "se" },
        { code: "RO", label: "Română", lng: "ro" },
    ];

    const navigate = useNavigate();
     // Check if user is authenticated
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuth(!!user); // Update isAuth based on the user's authentication state
        });
    
        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            navigate('/login');
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    }



    return(
        <>
            <p className="hidden">{currentPath}</p>
            <div className="flex flex-col items-center mt-4 mb-40 sm:mb-20 font-navbar">
                <Navbar fluid rounded className="bg-transparent mb-5 relative h-12 sm:h-auto w-12 sm:w-auto">
                    <Navbar.Toggle className="absolute active:bg-transparent focus:bg-transparent focus:outline-none focus:ring-0 active:ring-0 border-none shadow-none left-0 top-0 h-16 sm:h-auto w-16 sm:w-auto" />                    
                    <Navbar.Collapse>
                        <div className="flex flex-row sm:flex-row justify-center gap-x-14 sm:gap-0 items-center sm:space-x-80 mt-36 sm:mt-0">
                            <Link to="/" className="text-lg sm:text-4xl mb-2 sm:mb-0 active">{t("navbar.homepage")}</Link>
                            <Link to="/blog" className="text-lg sm:text-4xl mb-2 sm:mb-0">{t("navbar.blog")}</Link>
                            <Link to="/article" className="text-lg sm:text-4xl mb-2 sm:mb-0">{t("navbar.article")}</Link>
                            { isAuth ? <button onClick={signUserOut}><RiLogoutCircleRLine size={30} /></button> : '' }
                        </div>
                    </Navbar.Collapse>
                    
                </Navbar>
                
                <div className="flex flex-wrap justify-center items-center space-x-8 space-y-4 sm:space-y-0 sm:flex-nowrap sm:space-x-4 -mt-4 sm:mt-8">
                    {languages.map(({ code, label, lng }) => (
                    <div key={code} className="w-1/6 sm:w-auto ml-8 sm:ml-0">
                        <ReactCountryFlag
                        countryCode={code}
                        svg
                        style={{
                            width: "3.75em",
                            height: "1.5em",
                        }}
                        title={label}
                        onClick={() => changeLanguage(lng)}
                        className="cursor-pointer"
                        />
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}