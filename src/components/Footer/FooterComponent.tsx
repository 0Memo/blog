"use client";
import { Footer } from "flowbite-react";
import ReactCountryFlag from 'react-country-flag';
import './Footer.css';

export default function FooterComponent() {
    return (
        <>
            <footer className="fixed bottom-0 w-full bg-violet-900 sm:flex sm:items-center sm:justify-between">
                <Footer>
                    <div className="w-full bg-violet-900 py-4 sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright
                            by="| Guillermo — Tous droits réservés"
                            year={2025}
                            className="ml-auto mr-1 text-lg text-white font-footer"
                        />
                        <ReactCountryFlag
                            countryCode="CO"
                            svg
                            style={{
                                width: "3.75em",
                                height: "1.5em",
                            }}
                            title="Colombia"
                            className="mr-auto shiny-flag"
                        />
                    </div>
                </Footer>
            </footer>
        </>
    );
}