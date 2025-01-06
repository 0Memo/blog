import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../public/locales/en/translation.json";
import translationES from "../public/locales/es/translation.json";
import translationFR from "../public/locales/fr/translation.json";
import translationPT from "../public/locales/pt/translation.json";
import translationIT from "../public/locales/it/translation.json";

const resources = {
    en: { translation: translationEN },
    es: { translation: translationES },
    fr: { translation: translationFR },
    pt: { translation: translationPT },
    it: { translation: translationIT },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "fr",
    fallbackLng: "fr",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;