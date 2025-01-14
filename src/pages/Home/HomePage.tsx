import { useEffect, useState } from "react";
import ContactForm from "../../components/Contact/ContactForm";
import Inbox from "../../components/Inbox/Inbox";
import { ContactFormInterface } from "../../services/interfaces/ContactForm";
import { ArticleInterface } from "../../services/interfaces/Article";
import { Card } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

/* import moment from "moment";
import 'moment/locale/fr'; */

interface HomePageProp {
    articles: ArticleInterface[];
}

export default function HomePage(props:HomePageProp){
    const { t } = useTranslation();
    /* const m= moment().locale('fr').format('Do MMMM YYYY, h:mm:ss');
    console.log(m); */

    const articles = props.articles;

    const reversedArticles = articles.slice().reverse();
    const newestArticle = reversedArticles[0];

    const [contactForms, setContactForms] = useState<ContactFormInterface[]>(() => {
        const storedValues = localStorage.getItem("contactFormItem"); 
        return storedValues ? JSON.parse(storedValues) : [];
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for skeleton demo
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1500); // Adjust the timeout as needed
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem("contactFormItem", JSON.stringify(contactForms));
        }, [contactForms])

        const storesContactForms = () => {
        const storedValues = localStorage.getItem("contactFormItem");
        if(!storedValues) { 
            setContactForms(contactForms)
            return articles; 
        }
        
            return JSON.parse(storedValues);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { storesContactForms()}, []);
    
    useEffect(() => {
        if(!contactForms) return;
        storesContactForms();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactForms]);

    useEffect(() => {
        // Check for hash in the URL
        const hash = window.location.hash;
        if (hash === "#articleTitle") {
            const element = document.getElementById("articleTitle");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);
    
    function handleSubmitContactForm(contactForm:ContactFormInterface):void{
        setContactForms([ ...contactForms,  contactForm]);
    }

    return(
        <>
            <h1 className="text-4xl text-center mb-24 sm:mb-8 font-h1">{t("main.title")}</h1>

            {/* <p>{m}</p> */}

            <div className="flex flex-col sm:flex-row justify-evenly m-0">
                    <Inbox contactForms={contactForms} />
                    <ContactForm handleSubmitContactForm={handleSubmitContactForm} />
            </div>
            
            {loading ? (
                // Skeleton Loader
                <div className="flex justify-center items-center mt-20 mb-24">
                    <div className="max-w-sm bg-gray-50 shadow-lg p-4">
                        <Skeleton height={150} width={300} className="mb-4" />
                        <Skeleton count={3} />
                    </div>
                </div>
            ) : newestArticle ? (
                    <div>
                        <div>
                            <h3 className="text-2xl text-center mt-10 mb-5 font-h3">{t("main.lastArticle.title")}</h3>
                        </div>
                        <div className="flex justify-center items-center mb-24">
                            <Card
                                className="max-w-sm mb-5 ojbect-none object-center bg-gray-50 shadow-lg"
                                imgAlt="Placeholder"
                                imgSrc="https://craftypixels.com/placeholder-image/150x150/2e1065/fff&text=Placeholder"
                                horizontal
                            >                                
                                <div className="articleText text-slate-900" id="articleTitle">
                                    <h3 className="text-lg">{t("main.lastArticle.authorName")} <strong  className="font-h3 text-violet-900 ">{newestArticle.authorName}</strong> </h3>
                                    <h3><span>{t("main.lastArticle.articleTitle")}</span> {newestArticle.title}</h3>
                                    <h3><span>{t("main.lastArticle.articleDescription")}</span> {newestArticle.description}</h3>
                                    <p className="mt-2"><i>{newestArticle.date}</i></p>
                                </div>
                                <br />
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-48">
                        <p className="text-gray-200 text-lg italic font-light underline decoration-2 decoration-violet-500 underline-offset-4">{t("main.noArticles")}</p>
                    </div>
                )
            }
        </>
    )
}