import { useState } from "react";
import ContactForm from "../../components/Contact/ContactFormCopy";
import Inbox from "../../components/Inbox/Inbox";
import { ContactFormInterface } from "../../services/interfaces/ContactForm";
import './HomePage.css';
import { ArticleInterface } from "../../services/interfaces/Article";

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
            <h1>Page d'accueil</h1>

            {/* <p>{m}</p> */}

            <div className="messages">
                <Inbox contactForms={contactForms} />
                <ContactForm handleSubmitContactForm={handleSubmitContactForm} />
            </div>
            <div>
                <h3 className="latestArticle">Le dernier article</h3>
            </div>
            {
                newestArticle && (
                    <div className="articleStyle">
                        <div className="articleImage">
                            <img src="https://craftypixels.com/placeholder-image/150x150/c0bcc2/fff&text=Placeholder" alt="placeholder" />
                        </div>
                        
                        <div className="articleText">
                            <h3><span>Nom de l'auteur :</span> {newestArticle.authorName}</h3>
                            <h3><span>Titre :</span> {newestArticle.title}</h3>
                            <h3><span>Description :</span> {newestArticle.description}</h3>
                            <p>{newestArticle.date}</p>
                        </div>
                        <br />
                    </div>
            )}
        </>
    )
}