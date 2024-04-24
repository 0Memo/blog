import ReactCountryFlag from 'react-country-flag';
import './Footer.css';
//import ReactCountryFlag from "react-country-flag";

export default function Footer(){
    return(
        <>
            <footer className="footer">
                <h1> &copy; 2024 | Gu¡llermo
                    <ReactCountryFlag
                        countryCode="CO"
                        svg
                        style={{
                            width: "1.5em",
                            height: "0.75em",
                        }}
                        title="Colombia"
                    />
                    — Tous droits réservés
                </h1>
            </footer>
        </>
    )
}