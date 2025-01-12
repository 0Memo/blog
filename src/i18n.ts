import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationES from "./locales/es/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationPT from "./locales/pt/translation.json";
import translationIT from "./locales/it/translation.json";
import translationHY from "./locales/hy/translation.json";
import translationSE from "./locales/se/translation.json";
import translationRO from "./locales/ro/translation.json";

const resources = {
    en: { translation: translationEN },
    es: { translation: translationES },
    fr: { translation: translationFR },
    pt: { translation: translationPT },
    it: { translation: translationIT },
    hy: { translation: translationHY },
    se: { translation: translationSE },
    ro: { translation: translationRO },
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