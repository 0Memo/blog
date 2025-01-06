"use client";
import { Footer } from "flowbite-react";
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from "react-i18next";
import './Footer.css';

export default function FooterComponent() {
    const { t } = useTranslation();

    return (
        <>
            <footer className="fixed bottom-0 w-full bg-violet-900 flex items-center justify-between">
                <Footer>
                    <div className="w-full bg-violet-900 py-4 flex items-center justify-between">
                        <Footer.Copyright
                            by={t("footer.text")}
                            year={2025}
                            className="ml-auto mr-1 text-sm sm:text-lg text-white font-footer"
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