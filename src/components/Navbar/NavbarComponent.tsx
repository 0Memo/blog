"use client";
import { Navbar } from "flowbite-react";
import { Link, Navigate} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import ReactCountryFlag from 'react-country-flag';

export default function NavbarComponent(){

    const auth = { token: true};
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return(
        <>
            {/* Conditionner l'affichage des trois liens si l'on n'est pas connecté */}
            {auth.token
            ?
                
            <div className="flex flex-col items-center mt-4 mb-40 sm:mb-20 font-navbar">
                <Navbar fluid rounded className="bg-transparent mb-5 relative h-12 sm:h-auto w-12 sm:w-auto">
                    <Navbar.Toggle className="absolute active:bg-transparent focus:bg-transparent focus:outline-none focus:ring-0 active:ring-0 border-none shadow-none left-0 top-0 h-16 sm:h-auto w-16 sm:w-auto" />                    
                    <Navbar.Collapse>
                        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-80 mt-36 sm:mt-0">
                            <Link to="/" className="text-lg sm:text-4xl mb-2 sm:mb-0 active">{t("navbar.homepage")}</Link>
                            <Link to="/blog" className="text-lg sm:text-4xl mb-2 sm:mb-0">{t("navbar.blog")}</Link>
                            <Link to="/article" className="text-lg sm:text-4xl mb-2 sm:mb-0">{t("navbar.article")}</Link>
                        </div>
                    </Navbar.Collapse>
                    
                </Navbar>
                
                <div className="flex flex-wrap justify-center items-center space-x-8 space-y-4 sm:space-y-0 sm:flex-nowrap sm:space-x-4 -mt-4 sm:mt-8">
                    <div className="w-1/6 sm:w-auto ml-8 sm:ml-0">
                        <ReactCountryFlag
                            countryCode="US"
                            svg
                            style={{
                                width: "3.75em",
                                height: "1.5em",
                            }}
                            title="English"
                            onClick={() => changeLanguage("en")}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="w-1/6 sm:w-auto ml-8 sm:ml-0">
                        <ReactCountryFlag
                            countryCode="ES"
                            svg
                            style={{
                                width: "3.75em",
                                height: "1.5em",
                            }}
                            title="Español"
                            onClick={() => changeLanguage("es")}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="w-1/6 sm:w-auto ml-8 sm:ml-0">
                        <ReactCountryFlag
                            countryCode="FR"
                            svg
                            style={{
                                width: "3.75em",
                                height: "1.5em",
                            }}
                            title="Français"
                            onClick={() => changeLanguage("fr")}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="w-1/6 sm:w-auto ml-8 sm:ml-0">
                        <ReactCountryFlag
                            countryCode="BR"
                            svg
                            style={{
                                width: "3.75em",
                                height: "1.5em",
                            }}
                            title="Português"
                            onClick={() => changeLanguage("pt")}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="w-1/6 sm:w-auto ml-8 sm:ml-0">
                        <ReactCountryFlag
                            countryCode="IT"
                            svg
                            style={{
                                width: "3.75em",
                                height: "1.5em",
                            }}
                            title="Italiano"
                            onClick={() => changeLanguage("it")}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="w-1/6 sm:w-auto ml-8 sm:ml-0">
                        <ReactCountryFlag
                            countryCode="AM"
                            svg
                            style={{
                                width: "3.75em",
                                height: "1.5em",
                            }}
                            title="Հայերեն"
                            onClick={() => changeLanguage("hy")}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="w-1/6 sm:w-auto ml-8 sm:ml-0">
                        <ReactCountryFlag
                            countryCode="SE"
                            svg
                            style={{
                                width: "3.75em",
                                height: "1.5em",
                            }}
                            title="Svenska"
                            onClick={() => changeLanguage("se")}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="w-1/6 sm:w-auto ml-8 sm:ml-0">
                        <ReactCountryFlag
                            countryCode="RO"
                            svg
                            style={{
                                width: "3.75em",
                                height: "1.5em",
                            }}
                            title="Română"
                            onClick={() => changeLanguage("ro")}
                            className="cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            : <Navigate to="/" />
            }
        </>
    )
}