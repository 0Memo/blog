import { useState } from "react";
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

    const [contactForms, setContactForms] = useState<ContactFormInterface[]>([]);

    
    function handleSubmitContactForm(contactForm:ContactFormInterface):void{
        setContactForms([ ...contactForms,  contactForm]);
    }

    return(
        <>
            <h1 className="text-2xl text-center mb-8">Page d'accueil</h1>

            {/* <p>{m}</p> */}

            <div className="flex justify-center items-center space-x-20">
                <Inbox contactForms={contactForms} />
                <ContactForm handleSubmitContactForm={handleSubmitContactForm} />
            </div>
            
            {
                newestArticle
                ?
                    <div>
                        <div>
                            <h3 className="text-center mt-8 mb-5">Le dernier article</h3>
                        </div>
                        <div className="flex justify-center items-center">
                            <Card
                                className="max-w-sm mb-5 ojbect-none object-center bg-gray-50"
                                imgAlt="Placeholder"
                                imgSrc="https://craftypixels.com/placeholder-image/150x150/2e1065/fff&text=Placeholder"
                                horizontal
                            >
                                
                                <div className="articleText">
                                    <h3><span>Nom de l'auteur :</span> {newestArticle.authorName}</h3>
                                    <h3><span>Titre :</span> {newestArticle.title}</h3>
                                    <h3><span>Description :</span> {newestArticle.description}</h3>
                                    <p>{newestArticle.date}</p>
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