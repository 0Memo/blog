import { useEffect, useState } from "react";
import ContactForm from "../../components/Contact/ContactFormCopy";
import Inbox from "../../components/Inbox/Inbox";
import { ContactFormInterface } from "../../services/interfaces/ContactForm";
import { ArticleInterface } from "../../services/interfaces/Article";
import { Card } from "flowbite-react";

/* import moment from "moment";
import 'moment/locale/fr'; */

interface HomePageProp {
    articles: ArticleInterface[];
}

export default function HomePage(props:HomePageProp){
    /* const m= moment().locale('fr').format('Do MMMM YYYY, h:mm:ss');
    console.log(m); */

    const articles = props.articles;

    const reversedArticles = articles.slice().reverse();
    const newestArticle = reversedArticles[0];

    const [contactForms, setContactForms] = useState<ContactFormInterface[]>(() => {
        const storedValues = localStorage.getItem("contactFormItem"); 
        return storedValues ? JSON.parse(storedValues) : [];
    });

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


    
    function handleSubmitContactForm(contactForm:ContactFormInterface):void{
        setContactForms([ ...contactForms,  contactForm]);
    }

    return(
        <>
            <h1 className="text-4xl text-center mb-8 font-h1">Page d'accueil</h1>

            {/* <p>{m}</p> */}

            <div className="flex flex-col sm:flex-row justify-evenly m-0">
                    <Inbox contactForms={contactForms} />
                    <ContactForm handleSubmitContactForm={handleSubmitContactForm} />
            </div>
            
            {
                newestArticle
                ?
                    <div>
                        <div>
                            <h3 className="text-2xl text-center mt-10 mb-5 font-h3">Le dernier article</h3>
                        </div>
                        <div className="flex justify-center items-center mb-24">
                            <Card
                                className="max-w-sm mb-5 ojbect-none object-center bg-gray-50 shadow-lg"
                                imgAlt="Placeholder"
                                imgSrc="https://craftypixels.com/placeholder-image/150x150/2e1065/fff&text=Placeholder"
                                horizontal
                            >
                                
                                <div className="articleText text-slate-900">
                                    <h3 className="text-lg">Nom de l'auteur : <strong  className="font-h3 text-violet-900 ">{newestArticle.authorName}</strong> </h3>
                                    <h3><span>Titre :</span> {newestArticle.title}</h3>
                                    <h3><span>Description :</span> {newestArticle.description}</h3>
                                    <p className="mt-2"><i>{newestArticle.date}</i></p>
                                </div>
                                <br />
                            </Card>
                        </div>
                    </div>
                : ""
            }
        </>
    )
}